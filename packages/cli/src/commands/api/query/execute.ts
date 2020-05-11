import { Command, flags } from '@oclif/command';
import rocksetConfigure from '@rockset/client';

const client = rocksetConfigure(
  '1LTIk1DMVeryu6wBhcvWxW0xa2RGxMga7D0LANJyY9zmOfSBh3HlLvxmaFNawdMI',
  'https://master-api.dev.rockset.com',
);

export default class ExecuteQuery extends Command {
  static description = 'describe the command here';

  static examples = [
    `$ rock api:query "Select 5"
    {
      "collections": [],
      "column_fields": [
        {
          "name": "?field0",
          "type": ""
        }
      ],
      "results": [
        {
          "?field0": 5
        }
      ],
      "query_id": "9c3c6d86-7ffe-4ffa-b2d2-faba583e08dc:yWRDi4y:0",
      "stats": {
        "elapsed_time_ms": 4
      }
    }
`,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    file: flags.string({ char: 'f', description: 'The config file to execute this command from' }),
  };

  static args = [{ name: 'query', hidden: false }];

  async run() {
    const { args, flags } = this.parse(ExecuteQuery);

    try {
      const data = await client.queries.query({
        sql: {
          query: args.query,
        },
      });
      this.log(JSON.stringify(data?.results ?? data, null, 2));
    } catch (e) {
      this.error(JSON.stringify(e, null, 2));
    }
  }
}
