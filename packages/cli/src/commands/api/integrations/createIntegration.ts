/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `name: event-logs
description: AWS account with event data for the data science team.
s3:
  aws_access_key:
    aws_access_key_id: AKIAIOSFODNN7EXAMPLE
    aws_secret_access_key: wJal....
  aws_role:
    aws_role_arn: arn:aws:iam::2378964092:role/rockset-role
kinesis:
  aws_access_key:
    aws_access_key_id: AKIAIOSFODNN7EXAMPLE
    aws_secret_access_key: wJal....
  aws_role:
    aws_role_arn: arn:aws:iam::2378964092:role/rockset-role
dynamodb:
  aws_access_key:
    aws_access_key_id: AKIAIOSFODNN7EXAMPLE
    aws_secret_access_key: wJal....
  aws_role:
    aws_role_arn: arn:aws:iam::2378964092:role/rockset-role
  s3_export_bucket_name: null
redshift:
  aws_access_key:
    aws_access_key_id: AKIAIOSFODNN7EXAMPLE
    aws_secret_access_key: wJal....
  username: awsuser
  password: pswd....
  host: test.yuyugt.us-west-2.redshift.amazonaws.com
  port: 5439
  s3_bucket_path: s3://redshift-unload
gcs:
  gcp_service_account:
    ? service_account_key_file_json
segment:
  ? connection_string
kafka:
  kafka_topic_names:
    - null
  source_status_by_topic: topic-a:DORMANT
  kafka_data_format: json
  connection_string: null
  use_v3: null
  bootstrap_servers: null
  security_config:
    ? api_key
    ? secret
mongodb:
  connection_uri: mongodb+srv://<username>:<password>@server.example.com/
`;

class CreateIntegration extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    body: flags.string({
      required: true,
      description:
        'Path to a file whose contents will be passed as the POST body of this request. Format must be [json|yaml]. An example schema is shown below.',
    }),

    raw: flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
  };

  static args = [];

  static description = `create a new integration
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/integrations`,
  )}
${chalk.bold(`This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       `)}
The POST body request schema has been omitted because it is too long. Please view the documentation at ${chalk.underline(
    `https://docs.rockset.com/rest-api#createintegration`,
  )} to see the example.

Endpoint Reference
POST: /v1/orgs/self/integrations
Create Integration
Create a new integration.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#createintegration`)}`;

  static examples = [];

  async run() {
    const { args, flags } = this.parse(CreateIntegration);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = CreateIntegration.args;

    // apicall
    const apicall = client.integrations.createIntegration.bind(client.integrations);

    // endpoint
    const endpoint = '/v1/orgs/self/integrations';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default CreateIntegration;
