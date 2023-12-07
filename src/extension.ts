import * as vscode from 'vscode';
import { CommandIds } from './config';
import {
  webSearchByGoogle,
  webSearchByStackOverflow,
  webSearchByGithub,
  webSearchByDuckDuckGo
} from './util';

// Activating Function
export function activate(context) {
  // Register commands and disposables
  const disposables: vscode.Disposable[] = [
    vscode.commands.registerTextEditorCommand(
      CommandIds.searchByGoogle,
      webSearchByGoogle
    ),
    vscode.commands.registerTextEditorCommand(
      CommandIds.searchByStackOverflow,
      webSearchByStackOverflow
    ),
    vscode.commands.registerTextEditorCommand(
      CommandIds.searchByGithub,
      webSearchByGithub
    ),
    vscode.commands.registerTextEditorCommand(
      CommandIds.searchByDuckDockGo,
      webSearchByDuckDuckGo
    )
  ];

  // Add the command disposables to the extension context's subscriptions
  disposables.forEach((disposable) => context.subscriptions.push(disposable));
}

// Deactivate Function (Empty in this case)
export function deactivate() {}
