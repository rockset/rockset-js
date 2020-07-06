import express from 'express';
import cors from 'cors';
import * as core from '@rockset/core';
import { getQualifiedName } from '@rockset/core/dist/filesystem/pathutil';
import open from 'open';
import path from 'path';
import morgan from 'morgan';
import { QueryParameter } from '@rockset/core/dist/types';

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export async function serve(port = 3001) {
  const app = express();
  app.use(cors());
  app.use(morgan('tiny'));
  app.use(express.json());

  app.post(
    '/v1/orgs/self/ws/:workspace/lambdas/:queryLambda/versions/:version',
    async (req, res) => {
      const ws = req.params.workspace;
      const ql = req.params.queryLambda;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const params = req.body?.parameters as QueryParameter[];
      const [client, lambda] = await Promise.all([
        core.main.createClient(),
        core.fileutil.readLambdaFromQualifiedName(getQualifiedName(ws, ql)),
      ]);
      try {
        const result = await client.queries.query({
          sql: {
            query: lambda.sql,
            parameters: [
              ...(lambda.config.default_parameters ?? []),
              ...params,
            ],
          },
        });
        res.send(result);
      } catch (e) {
        console.error('Error during execution: ', e);
        res.status(400);
        res.send(e);
      }
    }
  );

  app.post('/validate', async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const param = req.body?.param as QueryParameter;
    console.log(req.body);
    const client = await core.main.createClient();
    try {
      // TODO(tchordia): Don't actually execute this query, just validate it in the future
      await client.queries.query({
        sql: {
          query: `Select :"${param.name}"`,
          parameters: [param],
        },
      });
      res.send({ success: true });
    } catch (e) {
      console.error(e);
      res.status(400);
      res.send(e);
    }
  });

  app.get('/lambdas', async (req, res) => {
    try {
      const [
        entityNames,
        { api_server: apiserver },
        srcPath,
      ] = await Promise.all([
        core.main.listEntityNames(),
        core.auth.getAuthProfile(),
        core.fileutil.getSrcPath(),
      ]);

      const lambdaEntities = (
        await Promise.all(
          entityNames.lambdas.map(async ([name]) => {
            console.log(name);
            try {
              return await core.fileutil.readLambdaFromQualifiedName(name);
            } catch (e) {
              return null;
            }
          })
        )
      ).filter(notEmpty);

      const lambdas = lambdaEntities.map((entity) => ({
        path: core.pathutil.getLambdaPathsFromEntity(srcPath, entity),
        name: entity.name,
        ws: entity.ws,
      }));
      res.send({ lambdas, apiserver });
    } catch (e) {
      console.log(e);
      res.status(500);
      res.send(e);
    }
  });

  app.use(express.static(path.join(__dirname, 'ui')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
  });

  app.listen(port, () =>
    console.error(`QL dev server listening at http://localhost:${port}`)
  );
  await open(`http://localhost:${port}`);
}
