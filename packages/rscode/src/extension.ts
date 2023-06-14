/* eslint-disable promise/always-return */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Diagnostic } from 'vscode';
const sqlFormatter = require('sql-formatter') as {
  format: (s: string, config?: unknown) => string;
};
import { helper } from '@rockset/core';

import keywords from './keywords';
import functionTexts from './functions';
import { functions } from './functions';

import rocksetConfigure, { MainApi } from '@rockset/client';
import { Collection, ErrorModel } from '@rockset/client/dist/codegen/api';
import yaml = require('js-yaml');
import assert = require('assert');
import { render, renderFile } from 'ejs';
import { join } from 'path';

class CollectionView {
  private static initialized: boolean;
  private static workspace: string;
  private static collection: string;
  private static client: MainApi;
  private static context: vscode.ExtensionContext;
  private static collectionView?: vscode.WebviewPanel;
  private static textChannel?: vscode.OutputChannel;

  private static async getFields() {
    const fieldsRes = (
      await CollectionView.client.queries.query({
        sql: {
          query: render(`
            DESCRIBE "${CollectionView.workspace}"."${CollectionView.collection}" 
          `),
        },
      })
    ).results;
    const fields: Set<string> = new Set<string>();
    if (!fieldsRes) {
      return fields;
    }

    fieldsRes.forEach((res: { field: string[] }) => {
      if (res.field.length === 1) {
        fields.add(res.field[0]);
      }
    });
    return fields;
  }

  static async create(
    workspace: string,
    collection: string,
    client: MainApi,
    context: vscode.ExtensionContext,
    textChannel: vscode.OutputChannel
  ) {
    CollectionView.initialized = true;
    CollectionView.workspace = workspace;
    CollectionView.collection = collection;
    CollectionView.client = client;
    CollectionView.context = context;
    CollectionView.textChannel = textChannel;
    CollectionView.collectionView = vscode.window.createWebviewPanel(
      `${CollectionView.workspace}.${CollectionView.collection}`,
      `${CollectionView.workspace}.${CollectionView.collection}`,
      vscode.ViewColumn.One,
      { enableFindWidget: true, enableScripts: true }
    );
    CollectionView.collectionView.webview.onDidReceiveMessage(
      async (message: {
        request?: string;
        params?: {
          sortBy: string;
          descending: boolean;
          limit?: number;
          objectContents?: string;
        };
      }) => {
        if (message.request === 'reload') {
          await this.reload(
            message.params?.sortBy || '_id',
            message.params?.descending,
            message.params?.limit
          );
        } else if (message.request === 'showObject') {
          CollectionView.textChannel?.clear();
          CollectionView.textChannel?.append(
            JSON.stringify(
              JSON.parse(message.params?.objectContents ?? ''),
              null,
              2
            )
          );
          CollectionView.textChannel?.show();
        }
      }
    );
    await CollectionView.reload();
  }

  static async reload(sortBy?: string, descending?: boolean, limit?: number) {
    if (!CollectionView.initialized || !CollectionView.collectionView) {
      await vscode.window.showErrorMessage('No collection open');
      return;
    }

    const fields = await this.getFields();

    const webviewContent = await renderFile(
      join(
        CollectionView.context.extensionPath,
        'webviews',
        'collectionView',
        'index.ejs'
      ),
      {
        collection: CollectionView.collection,
        workspace: CollectionView.workspace,
        documents:(
          await CollectionView.client.queries.query({
            sql: {
              query: `
                SELECT ${ (() => {
                  let fieldStr = "";
                  fields.forEach(field => {
                    fieldStr += `${field}, `
                  })
                  return fieldStr.substring(0, fieldStr.length - 1);
                })() } 
                FROM "${CollectionView.workspace}"."${CollectionView.collection}" 
                ORDER BY ${sortBy || '_id'} ${descending ? 'DESC' : 'ASC'}
                LIMIT ${limit ?? 500}
              `,
            },
          })
        ).results ?? [],
        limit: limit ?? 500,
        fields,
        sortBy: sortBy || '_id',
        descending: descending ?? false,
        stylesheet: CollectionView.collectionView.webview.asWebviewUri(
          vscode.Uri.file(
            join(
              CollectionView.context.extensionPath,
              'webviews',
              'collectionView',
              'styles.css'
            )
          )
        ),
        formatValue: function formatValue(
          value: string | number | object
        ): string {
          let span;
          if (value === null) {
            span = `<center><span class="value null">null</span></center>`;
          } else if (typeof value === 'string') {
            span = `<span class="value string">"<%= value %>"</span>`;
          } else if (typeof value === 'number') {
            span = `<span class="value number"><%= value %></span>`;
          } else if (typeof value === 'boolean') {
            span = `<span class="boolean"><%= value %></span>`;
          } else {
            span = `<span class="object" onclick="showObjectData(this)">
          ${
            Array.isArray(value)
              ? "[ <span class='green'>...</span> ]"
              : "{ <span class='green'>...</span> }"
          }
          <span class="object-contents" style="display: none">
              <%= value %>
            </span>
          </span>`;
            value = JSON.stringify(value);
          }
          return render(`<center><%- renderedSpan %></center>`, { 
            renderedSpan: render(span, { value }) 
          });
        },
      }
    );
    if (CollectionView.collectionView) {
      CollectionView.collectionView.webview.html = "";
      CollectionView.collectionView.webview.html = webviewContent;
    } else {
      await vscode.window.showErrorMessage('No collection open');
    }
  }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Your Rockset VSCode extension is now active.');

  // Init variables
  const channel = vscode.window.createOutputChannel('rockset');
  const configuration = vscode.workspace.getConfiguration('rockset');
  const apikey = configuration.get('apikey') as string;
  const apiserver = configuration.get('apiserver') as string;
  const client: MainApi = rocksetConfigure(apikey, apiserver);

  let collections: string[] = [];
  let parameters: string[] = [];
  let collectionNames: string[] = [];
  let collectionsMetadata: Collection[] = [];

  const functionTextsNoBrackets = functionTexts.map((func) =>
    func.slice(0, func.indexOf('('))
  ) as string[]; // get all functions texts without parentheses
  const functionLinks = functions.map((obj) => obj.link) as string[]; // get all function links
  const functionDescs = functions.map((obj) => obj.description) as string[]; // get all function descriptions

  // Grab all of the collections so we can later suggest them
  client.collections
    .listCollections()
    .then((c) => {
      collectionNames = c.data?.map(
        (c) => (c as { name: string }).name
      ) as string[];
      collectionsMetadata = c.data as Collection[];

      collections =
        c.data?.map((c) =>
          helper.escapePath(
            `${c.workspace}.${c.name}`,
            helper.EscapeOptions.ESCAPE_IF_NECCESSARY
          )
        ) ?? [];
      return collections;
    })
    .catch(() =>
      vscode.window.showWarningMessage(
        'Failed to fetch collections in your Rockset Account'
      )
    );

  const diagnosticsCollection: vscode.DiagnosticCollection =
    vscode.languages.createDiagnosticCollection('rsql');

  const setDiagnostic = (uri: vscode.Uri, error: ErrorModel | undefined) => {
    const { line, column, message } = error ?? {};

    if (line && column && message) {
      const diagnostics: Diagnostic[] = [
        new Diagnostic(
          new vscode.Range(line - 1, column - 1, line - 1, column + 1),
          error?.message ?? 'Unknown Error',
          vscode.DiagnosticSeverity.Error
        ),
      ];
      diagnosticsCollection.set(uri, diagnostics);
    } else {
      diagnosticsCollection.set(uri, []);
    }
  };

  /**
   * This enables validation and error highlighting
   */
  vscode.workspace.onDidChangeTextDocument(
    async (document: vscode.TextDocumentChangeEvent) => {
      if (document.document.languageId === 'rsql') {
        try {
          const result = await client.queries.validate(
            {
              sql: {
                query: document.document.getText(),
              },
            },
            true
          );
          parameters = result.parameters;

          diagnosticsCollection.set(document.document.uri, []);
        } catch (e) {
          const error: ErrorModel = e as ErrorModel;
          setDiagnostic(document.document.uri, error);
        }
      }
    }
  );

  /**
   * This enables formatting
   */
  vscode.languages.registerDocumentFormattingEditProvider(
    {
      language: 'rsql',
    },
    {
      provideDocumentFormattingEdits(
        document: vscode.TextDocument
      ): vscode.TextEdit[] {
        const firstLine = document.lineAt(0);
        const oldText = document.getText();
        const newText =
          sqlFormatter.format(oldText, {
            indent: '    ',
          }) + '\n';
        const lastLine = document.lineAt(document.lineCount - 1);
        const textRange = new vscode.Range(
          firstLine.range.start,
          lastLine.range.end
        );
        return [vscode.TextEdit.replace(textRange, newText)];
      },
    }
  );

  // VALIDATE QUERY COMMAND
  const validateQuery = vscode.commands.registerTextEditorCommand(
    'extension.rocksetValidate',
    async (activeEditor) => {
      const text = activeEditor.document.getText();

      try {
        await client.queries.validate({ sql: { query: text } }); // try validation
        // eslint-disable-next-line promise/catch-or-return
        vscode.window.showInformationMessage('Query valid').then(
          (msg) => {
            return msg;
          },
          (err) => {
            return vscode.window.showErrorMessage(err);
          }
        );
      } catch (e) {
        // if failed, log error
        const error = e as ErrorModel;
        await vscode.window.showErrorMessage(error.message ?? ''); // show vscode error
      }
    }
  );

  // EXECUTE QUERY COMMAND
  // The command has been defined in the package.json file
  // The commandId parameter must match the command field in package.json
  // This function is called when this command id is run
  const disposable = vscode.commands.registerTextEditorCommand(
    'extension.rocksetRun',
    async (activeEditor) => {
      const text = activeEditor.document.getText();
      channel.append(`
*** Rockset Query Text: ***
${text}

`);

      try {
        const r = await client.queries.query({ sql: { query: text } });
        channel.append(`
*** Rockset Query Results: ***
`);
        channel.append(JSON.stringify(r?.results ?? {}, null, 2) + '\n');
        channel.show();
      } catch (e) {
        const error = e as ErrorModel;
        const message = error?.message ?? '';
        channel.append(message);
        channel.show();

        setDiagnostic(activeEditor.document.uri, error);
        await vscode.window.showErrorMessage(message);
      }
    }
  );

  // VIEW COLLECTION COMMAND
  // The command has been defined in the package.json file
  // The commandId parameter must match the command field in package.json
  // This function is called when this command id is run
  const viewCollection = vscode.commands.registerTextEditorCommand(
    'extension.rocksetView',
    async () => {
      try {
        const rawWorkspaces = await client.workspaces.listWorkspaces();
        const workspaces = rawWorkspaces.data?.map((ws) => ws.name) as string[];

        const workspace = await vscode.window.showQuickPick(workspaces, {
          placeHolder: 'workspace',
        });
        if (!workspace) {
          return;
        }

        const rawCollections = await client.collections.workspaceCollections(
          workspace
        );
        const collections = rawCollections.data?.map(
          (col) => col.name
        ) as string[];
        const collection = await vscode.window.showQuickPick(collections, {
          placeHolder: 'collection',
        });
        if (!collection) {
          return;
        }
        await CollectionView.create(
          workspace,
          collection,
          client,
          context,
          channel
        );
      } catch (e) {
        console.log(e);
        await vscode.window.showErrorMessage((e as Error).message ?? '');
      }
    }
  );

  // Add Docs command
  const addDocs = vscode.commands.registerTextEditorCommand(
    'extension.rocksetAdd',
    async (activeEditor) => {
      // try to parse JSON
      let inpDocs: string | object | object[];
      try {
        // try to parse as JSON
        inpDocs = JSON.parse(activeEditor.document.getText()) as
          | string
          | object
          | object[];
        assert(typeof inpDocs === 'object');
      } catch {
        try {
          // if above doesn't work, parse as yaml and assert that it's an object
          inpDocs = yaml.load(activeEditor.document.getText()) as
            | string
            | object
            | object[];
          assert(typeof inpDocs === 'object'); // verify that it's an object
        } catch (err) {
          // if all fails,
          if (
            (err as Error).name === 'SyntaxError' ||
            'AssertionError' ||
            'YAMLException'
          ) {
            // JSON is invalid, show error
            await vscode.window.showErrorMessage(
              'Invalid document body. See https://docs.rockset.com/rest-api/#adddocuments.'
            );
          } else {
            // if error is not a bc of syntax, just display it
            await vscode.window.showErrorMessage((err as Error).message ?? '');
          }
        }
      }
      try {
        client.workspaces
          .listWorkspaces()
          .then((rawWorkspaces) => {
            // list workspaces

            const workspaces = rawWorkspaces.data?.map(
              (ws) => ws.name
            ) as string[]; // get list of workspace names

            return vscode.window
              .showQuickPick(workspaces, { placeHolder: 'workspace' })
              .then((workspace) => {
                // show dropdown menu of workspaces
                if (!workspace) {
                  return;
                } // if user exits, return

                return client.collections
                  .workspaceCollections(workspace)
                  .then((rawCollections) => {
                    // list collections in workspace
                    const collections = rawCollections.data?.map(
                      (col) => col.name
                    ) as string[];
                    return vscode.window
                      .showQuickPick(collections, {
                        placeHolder: 'collection',
                      })
                      .then((collection) => {
                        if (!collection) {
                          return;
                        }

                        client.documents
                          .addDocuments(workspace, collection, {
                            // add documents
                            data: Array.isArray(inpDocs) ? inpDocs : [inpDocs], // if it is a single document, wrap it in a list
                          })
                          .then(() => {
                            return vscode.window.showInformationMessage(
                              'Document added.'
                            ); // show info message
                          })
                          .catch(vscode.window.showErrorMessage);
                      });
                  });
              }, console.log);
          })
          .catch(vscode.window.showErrorMessage);
      } catch (e) {
        await vscode.window.showErrorMessage((e as Error).message ?? '');
      }
    }
  );

  // Hover
  const hovers = vscode.languages.registerHoverProvider('rsql', {
    provideHover(document, position) {
      const word = document.getText(document.getWordRangeAtPosition(position)); // get current word and convert it to upper case

      // SQL hovers
      if (functionTextsNoBrackets.includes(word.toUpperCase())) {
        // if the current word is in the functions without brackets
        const index = functionTextsNoBrackets.indexOf(word.toUpperCase()); // find where `word` occurs
        const text = functionTexts[index];
        const link = functionLinks[index];
        const desc = functionDescs[index];
        return new vscode.Hover(
          new vscode.MarkdownString(`    ${text}
***
${desc}
***
[${link.replace('https://', '')}](${link})`)
        ); // create hover
      }
      // Collection hovers
      if (collectionNames.includes(word)) {
        const index = collectionNames.indexOf(word);
        return new vscode.Hover(
          new vscode.MarkdownString(`**${
            collectionsMetadata[index].workspace
          }.${collectionsMetadata[index].name}** ${
            collectionsMetadata[index].description
              ? ` \\
${collectionsMetadata[index].description}`
              : ''
          }
***
\`\`\`json
${JSON.stringify(collectionsMetadata[index], null, 2)}
\`\`\``)
        );
      }
      return undefined; // force return
    },
  });

  const rocksetAutoComplete = vscode.languages.registerCompletionItemProvider(
    { language: 'rsql' },
    {
      provideCompletionItems() {
        const items = parameters
          .map((p) => {
            const item = new vscode.CompletionItem(
              ':' + p,
              vscode.CompletionItemKind.Variable
            );
            item.insertText = p;
            return item;
          })
          .concat(
            keywords.map(
              (keyword: string) =>
                new vscode.CompletionItem(
                  keyword,
                  vscode.CompletionItemKind.Keyword
                )
            )
          )
          .concat(
            collections.map(
              (c) =>
                new vscode.CompletionItem(c, vscode.CompletionItemKind.Class)
            )
          )
          .concat(
            functionTexts.map((f) => {
              const item = new vscode.CompletionItem(
                f,
                vscode.CompletionItemKind.Function
              );
              return item;
            })
          );
        return items.length > 0 ? items : undefined;
      },
    },
    '.', // triggered whenever a '.' is being typed
    ':'
  );
  context.subscriptions.push(
    disposable,
    rocksetAutoComplete,
    viewCollection,
    addDocs,
    validateQuery,
    hovers
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
