`rockset sql`
=============

execute a SQL expression

* [`rockset sql [SQL]`](#rockset-sql-sql)

## `rockset sql [SQL]`

execute a SQL expression

```
USAGE
  $ rockset sql [SQL] [-h] [-l <value>] [--columns <value> | ] [--output csv|json|yaml |  | ]

ARGUMENTS
  SQL  rockset SQL string to execute

FLAGS
  -h, --help                  Show CLI help.
  -l, --defaultLimit=<value>  set the default row limit property on the query. This will set a default limit on the
                              query that can be overrided by a limit in the SQL text.
  --columns=<value>           only show provided columns (comma-separated)
  --output=<option>           output in a more machine friendly format
                              <options: csv|json|yaml>

DESCRIPTION
  execute a SQL expression

EXAMPLES
  $ rockset sql "Select 'hello world'"

  $ rockset sql
```

_See code: [src/commands/sql.ts](../src/commands/sql.ts)_
