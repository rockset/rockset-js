import express from 'express';
import cors from 'cors';
import * as core from '@rockset/core';
import {
  getQualifiedName,
  getWsNamePair,
} from '@rockset/core/dist/filesystem/pathutil';
import open from 'open';
import path from 'path';
import morgan from 'morgan';

export async function serve(port = 3001) {
  const app = express();
  app.use(cors());
  app.use(morgan('tiny'));

  const client = await core.main.createClient();

  app.post(
    '/v1/orgs/self/ws/:workspace/lambdas/:queryLambda/versions/:version',
    async (req, res) => {
      const ws = req.params.workspace;
      const ql = req.params.queryLambda;
      const lambda = await core.fileutil.readLambdaFromQualifiedName(
        getQualifiedName(ws, ql)
      );
      try {
        const result = await client.queries.query({
          sql: {
            query: lambda.sql,
            parameters: lambda.config.default_parameters,
          },
        });
        res.send(result);
      } catch (e) {
        res.status(400);
        res.send(e);
      }
    }
  );

  app.get('/lambdas', async (req, res) => {
    const names = (await core.main.listEntityNames()).lambdas.map(([name]) => {
      return getWsNamePair(name);
    });
    res.send(names);
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
