//Strings

const vscode = require("vscode");
const { CommandIds } = require("./config");
const { webSearchByGoogle, webSearchByStackOverflow, webSearchByGithub } = require("./util");
//Activating Function
function activate(context) {
  // Register the 'searchByGoogle' command
  const disposableGoogle = vscode.commands.registerTextEditorCommand(
    CommandIds.searchByGoogle,
    webSearchByGoogle
  );
    // Register the 'searchByStackOverflow' command
  const disposableStackoverflow = vscode.commands.registerTextEditorCommand(
    CommandIds.searchByStackOverflow,
    webSearchByStackOverflow
  );

    // Register the 'searchByGithub' command
  const disposableGithub= vscode.commands.registerTextEditorCommand(
    CommandIds.searchByGithub,
    webSearchByGithub
  );
    // Add the command disposables to the extension context's subscriptions
  context.subscriptions.push(disposableGoogle);
  context.subscriptions.push(disposableStackoverflow);
  context.subscriptions.push(disposableGithub);
}
exports.activate = activate

//Empty Deactivate Function
function deactivate() {}
exports.deactivate = deactivate;
