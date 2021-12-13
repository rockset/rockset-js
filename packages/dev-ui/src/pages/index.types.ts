export interface Lambda {
  name: string;
  ws: string;
  path: {
    sqlPath: string;
    fullPath: string;
  };
  sql: string;
  default_parameters?:
    | {
        name: string;
        value: string;
        type: string;
      }[]
    | undefined;
}
export interface LambdaResponse {
  lambdas: Lambda[];
  apiserver: string;
}
