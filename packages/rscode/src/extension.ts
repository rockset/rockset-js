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

import rocksetConfigure from '@rockset/client';
import { ErrorModel } from '@rockset/client/dist/codegen/api';

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
  const client = rocksetConfigure(apikey, apiserver);

  let collections: string[] = [];
  let parameters: string[] = [];

  // Grab all of the collections so we can later suggest them
  client.collections
    .listCollections()
    .then((c) => {
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

  const diagnosticsCollection = vscode.languages.createDiagnosticCollection(
    'rsql'
  );

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
  vscode.workspace.onDidChangeTextDocument(async (document) => {
    if (document.document.languageId === 'rsql') {
      try {
        const result = await client.queries.validate(
          {
            sql: {
              query: document.document.getText(),
              profiling_enabled: true,
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
  });

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

      channel.append(`
*** Rockset Query Text: ***
${text}\n\n`);

      channel.append(`
*** Rockset Query Validation: ***`)

      try {
        await client.queries.validate({ sql: { query: text } }) // try validation
        channel.append("\nSUCCESS")
        channel.show();
      } catch (e) { // if failed, log error
        channel.append(`\nFAIL: ${e.message}`); // log error
        channel.show();
        await vscode.window.showErrorMessage(e.message); // show vscode error
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

  // Add Docs command
  const addDocs = vscode.commands.registerTextEditorCommand(
    'extension.rocksetAdd',
    async (activeEditor) => {
      try { // try to parse JSON
        const docs = JSON.parse(activeEditor.document.getText());
        try {
          client.workspaces.listWorkspaces().then(function (rawWorkspaces) { // list workspaces
            let workspaces: string[] = []

            rawWorkspaces.data?.forEach(item => { // for each workspace, add it's name to `workspaces`
              if (typeof (item.name) === "string") { workspaces.push(item.name) }
            });
            vscode.window.showQuickPick(workspaces, { placeHolder: "workspace" }).then(workspace => { // show dropdown menu of workspaces
              if (!workspace) { return } // if user exits, return

              client.collections.workspaceCollections(workspace).then(function (rawCollections) { // list collections in workspace
                let collections: string[] = []
                rawCollections.data?.forEach(item => {
                  if (typeof (item.name) === "string") { collections.push(item.name) }
                });
                vscode.window.showQuickPick(collections, { placeHolder: "collection" }).then(collection => {
                  if (!collection) { return }

                  client.documents.addDocuments(workspace, collection, { // add documents
                    data: Array.isArray(docs) ? docs : [docs] // if it is a single document, wrap it in a list
                  }).then(
                    function () { vscode.window.showInformationMessage("Document added.") } // show info message
                  ).catch(vscode.window.showErrorMessage)
                })
              })
            });
          }).catch(vscode.window.showErrorMessage)
        } catch (err) { await vscode.window.showErrorMessage(err.message) }
      }
      catch (err) {
        if (err.name === "SyntaxError") {
          // JSON is invalid, show error
          await vscode.window.showErrorMessage("Invalid JSON  document body. See https://docs.rockset.com/rest-api/#adddocuments.");
        }
        else {
          // if error is not a SyntaxError, just display it
          await vscode.window.showErrorMessage(err.message)
        }
      }
    }
  );

  // Hover
  let hovers = vscode.languages.registerHoverProvider("rsql", {
    provideHover(document, position, _token) {

      const word = document.getText(document.getWordRangeAtPosition(position)).toUpperCase(); // get current word and convert it to upper case

      var functionTextsNoBrackets = functionTexts.map((func) => func.slice(0, func.indexOf("("))) as string[] // get all functions texts without parentheses
      var functionLinks = functions.map((obj) => obj.link) as string[]; // get all function links
      var functionDescs = functions.map((obj) => obj.description) as string[]; // get all function descriptions

      if (functionTextsNoBrackets.includes(word)) { // if the current word is in the functions without brackets
        var index = functionTextsNoBrackets.indexOf(word) // find where `word` occurs
        var text = functionTexts[index]
        var link = functionLinks[index]
        var desc = functionDescs[index]
        return new vscode.Hover(new vscode.MarkdownString(`    ${text}
***
${desc}
***
[${link.replace("https://", "")}](${link})`)
        ); // create hover
      }
      return undefined; // force return
    }
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
  context.subscriptions.push(disposable, rocksetAutoComplete, addDocs, validateQuery, hovers);
}

// this method is called when your extension is deactivated
export function deactivate() { }
