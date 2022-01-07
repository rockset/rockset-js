// Generated file, please do not edit directly
import { Flags } from '@oclif/core';
import { RockCommand } from '../base-command';
import { main } from '@rockset/core';
import * as _ from 'lodash';
import * as inquirer from 'inquirer';
import { cli } from 'cli-ux';
import { showTable } from '../helper/util';

class SQL extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    defaultLimit: Flags.integer({
      char: 'l',
      description:
        'set the default row limit property on the query. This will set a default limit on the query that can be overrided by a limit in the SQL text.',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
  };

  static args = [
    {
      name: 'sql',
      description: 'rockset SQL string to execute',
      required: false,
      hidden: false,
    },
  ];

  static examples = [`rockset sql "Select 'hello world'"`, `rockset sql`];

  static description = `execute a SQL expression`;

  async run() {
    const { args, flags } = await this.parse(SQL);

    const sql = args.sql as string;

    const execute = async (sql: string) => {
      const client = await main.createClient();
      if (sql && _.isString(sql)) {
        const data = await client.queries.query({
          sql: {
            query: sql,
            default_row_limit: flags.defaultLimit,
          },
        });
        const unwrapData = data?.results ?? [];
        showTable(unwrapData, flags);
      }
    };

    if (sql) {
      await execute(sql);
    } else {
      const type = 'editor';
      const sql = await inquirer.prompt([{ name: 'sql', type }]);
      await execute(sql.sql);
    }
  }
}

export default SQL;
