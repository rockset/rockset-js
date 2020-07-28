`rockset sql`
=============

execute a SQL expression

* [`rockset sql [SQL]`](#rockset-sql-sql)

## `rockset sql [SQL]`

execute a SQL expression

```
USAGE
  $ rockset sql [SQL]

ARGUMENTS
  SQL  rockset SQL string to execute

OPTIONS
  -h, --help                       show CLI help

  -l, --defaultLimit=defaultLimit  set the default row limit property on the query. This will set a default limit on the
                                   query that can be overrided by a limit in the SQL text.

  --columns=columns                only show provided columns (comma-separated)

  --output=csv|json|yaml           output in a more machine friendly format

EXAMPLES
  rockset sql "Select 'hello world'"
  rockset sql
```

_See code: [src/commands/sql.ts](../src/commands/sql.ts)_
