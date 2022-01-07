/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `name: global-transactions
description: transactions from stores worldwide
sources:
  - integration_name: aws-integration
    s3:
      access_key: AKIAIOSFODNN7EXAMPLE
      secret_access: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
      prefix: prefix/to/keys
      pattern: prefix/to/**/keys/*.format
      region: us-west-2
      bucket: s3://customer-account-info
      prefixes:
        - /transactions
        - /stores
      format: none
      mappings:
        - input_path:
            - null
          mask:
            name: null
            args: {}
      object_count_downloaded: null
      object_count_total: null
      object_bytes_total: null
    kinesis:
      aws_region: us-east-2
      stream_name: click_stream
      dms_primary_key:
        - null
    gcs:
      bucket: server-logs
      prefix: prefix/to/keys
      object_count_downloaded: null
      object_count_total: null
      object_bytes_total: null
    redshift:
      database: dev
      schema: common
      table_name: redshift_table_name
      incremental_field: updated_at
    dynamodb:
      aws_region: us-east-2
      table_name: dynamodb_table_name
      current_status:
        initial_dump_completion_percentage: 0.73
        state: PROCESSING_STREAM
        stream_last_processed_at: 2019-01-15T21:48:23Z
      rcu: 1000
      status:
        scan_start_time: 2001-08-28T00:23:41Z
        scan_end_time: 2001-08-28T00:23:41Z
        scan_records_processed: 1000
        scan_total_records: 2000
        state: SCANNING_TABLE
        stream_last_processed_at: 2019-01-15T21:48:23Z
      use_scan_api: null
    file_upload:
      file_name: file1.json
      file_size: 12345
      file_upload_time: 2019-01-15T21:48:23Z
    kafka:
      kafka_topic_name: example-topic
      status:
        state: ACTIVE
        last_consumed_time: 2001-08-28T00:23:41Z
        num_documents_processed: 1337
        kafka_partitions:
          - partition_number: 123
            partition_offset: 100
      use_v3: null
      offset_reset_policy: null
    mongodb:
      database_name: my_database
      collection_name: my_collection
      status:
        scan_start_time: 2001-08-28T00:23:41Z
        scan_end_time: 2001-08-28T00:23:41Z
        scan_records_processed: 1000
        scan_total_records: 2000
        state: SCANNING_TABLE
        stream_last_insert_processed_at: 2019-01-15T21:48:23Z
        stream_last_update_processed_at: 2019-01-15T21:48:23Z
        stream_last_delete_processed_at: 2019-01-15T21:48:23Z
        stream_records_inserted: 10000
        stream_records_updated: 1000
        stream_records_deleted: 100
    status:
      state: INITIALIZING
      message: error 403 forbidden
      last_processed_at: 2019-01-15T21:48:23Z
      last_processed_item: /path/to/some/object
      total_processed_items: 32849023
    format_params:
      json: true
      csv:
        firstLineAsColumnNames: true
        separator: ","
        encoding: UTF-8
        columnNames:
          - c1
          - c2
          - c3
        columnTypes:
          - BOOLEAN
          - INTEGER
          - FLOAT
          - STRING
        quoteChar: '"'
        escapeChar: \
      xml:
        root_tag: root
        encoding: UTF-8
        doc_tag: row
        value_tag: value
        attribute_prefix: _attr
      mysql_dms: null
      postgres_dms: null
retention_secs: 1000000
time_partition_resolution_secs: null
insert_only: null
event_time_info:
  field: timestamp
  format: seconds_since_epoch
  time_zone: UTC
field_mappings:
  - name: myTestMapping
    is_drop_all_fields: true
    input_fields:
      - field_name: address.city.zipcode
        if_missing: "['SKIP', 'PASS']"
        is_drop: true
        param: zip
    output_field:
      field_name: zip_hash
      value: SHA256(:zip)
      on_error: "['SKIP', 'FAIL']"
field_mapping_query:
  sql: sql
clustering_key:
  - field_name: address.city.zipcode
    type: AUTO
    keys: Values of a record to partition on. This is not needed if the partition
      type is AUTO
field_schemas:
  - field_name: address.city.zipcode
    field_options: Options to specify whether to build an inverted index  a type
      index, a range index and a column index on this field
inverted_index_group_encoding_options:
  ? format_version
  ? group_size
  ? restart_length
  ? event_time_codec
  ? doc_id_codec
`;

class CreateCollection extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    body: Flags.string({
      required: true,
      description:
        'Path to a file whose contents will be passed as the POST body of this request. Format must be [json|yaml]. An example schema is shown below.',
    }),
    raw: Flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
  };

  static args = [
    {
      name: 'workspace',
      description: 'name of the workspace',
      required: true,
      hidden: false,
    },
  ];

  static description = `create new collection in a workspace
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/ws/{workspace}/collections`,
  )}
${chalk.bold(`This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       `)}
The POST body request schema has been omitted because it is too long. Please view the documentation at ${chalk.underline(
    `https://docs.rockset.com/rest-api#createcollection`,
  )} to see the example.

Endpoint Reference
POST: /v1/orgs/self/ws/{workspace}/collections
Create Collection
Create new collection in a workspace.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#createcollection`)}`;

  static examples = [];

  async run() {
    const { args, flags } = await this.parse(CreateCollection);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = CreateCollection.args;

    // apicall
    const apicall = client.collections.createCollection.bind(client.collections);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/collections';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default CreateCollection;
