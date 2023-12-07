'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require('vscode');
const config_1 = require('./config');
const util_1 = require('./util');
// Activating Function
function activate(context) {
  // Register commands and disposables
  const disposables = [
    vscode.commands.registerTextEditorCommand(
      config_1.CommandIds.searchByGoogle,
      util_1.webSearchByGoogle
    ),
    vscode.commands.registerTextEditorCommand(
      config_1.CommandIds.searchByStackOverflow,
      util_1.webSearchByStackOverflow
    ),
    vscode.commands.registerTextEditorCommand(
      config_1.CommandIds.searchByGithub,
      util_1.webSearchByGithub
    ),
    vscode.commands.registerTextEditorCommand(
      config_1.CommandIds.searchByDuckDockGo,
      util_1.webSearchByDuckDuckGo
    )
  ];
  // Add the command disposables to the extension context's subscriptions
  disposables.forEach((disposable) => context.subscriptions.push(disposable));
}
exports.activate = activate;
// Deactivate Function (Empty in this case)
function deactivate() {}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
