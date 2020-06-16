/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import sqlFormatter from 'sql-formatter';

import keywords from './keywords';
import functions from './functions';
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

  const collections: string[] = [];
  const allFields: string[] = [];

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

  let activeDecoration: vscode.TextEditorDecorationType | null = null;
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    'extension.rocksetRun',
    async () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      await vscode.window.showInformationMessage('Running rs query!');
      const activeEditor = vscode.window.activeTextEditor;
      if (!activeEditor) {
        return;
      }
      const text = activeEditor.document.getText();
      console.log(text);

      try {
        const r = await client.queries.query({ sql: { query: text } });
        channel.append(`
*** Rockset Query Results: ***
`);
        channel.append(JSON.stringify(r?.results ?? {}, null, 2) + '\n');
        channel.show();

        if (activeDecoration && activeDecoration.dispose) {
          activeDecoration.dispose();
        }
      } catch (e) {
        const error = e as ErrorModel;
        const message = error?.message ?? '';
        channel.append(message);
        channel.show();
        activeDecoration = vscode.window.createTextEditorDecorationType({
          textDecoration: 'underline red dotted',
        });

        const { line, column } = error;
        if (line != null && column != null) {
          activeEditor.setDecorations(activeDecoration, [
            {
              hoverMessage: message,
              range: new vscode.Range(
                line - 1,
                column - 1,
                line - 1,
                column + 1
              ),
            },
          ]);
        }
      }
    }
  );

  const rocksetAutoComplete = vscode.languages.registerCompletionItemProvider(
    { language: 'rsql' },
    {
      provideCompletionItems() {
        const items = keywords
          .map(
            (keyword: string) =>
              new vscode.CompletionItem(
                keyword,
                vscode.CompletionItemKind.Keyword
              )
          )
          .concat(
            functions.map(
              (f) =>
                new vscode.CompletionItem(f, vscode.CompletionItemKind.Function)
            )
          )
          .concat(
            collections.map(
              (c) =>
                new vscode.CompletionItem(c, vscode.CompletionItemKind.Class)
            )
          )
          .concat(
            allFields.map(
              (c) =>
                new vscode.CompletionItem(c, vscode.CompletionItemKind.Field)
            )
          );
        return items.length > 0 ? items : undefined;
      },
    },
    '.' // triggered whenever a '.' is being typed
  );
  context.subscriptions.push(disposable, rocksetAutoComplete);
}

// this method is called when your extension is deactivated
export function deactivate() {}
