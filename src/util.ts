import * as vscode from 'vscode';
import { CFG_QUERY, ConfigSections } from './config';

/**
 * Perform a web search using the provided configuration section.
 *
 * @param configSection - The configuration section to use.
 */
function webSearch(configSection: string) {
  // Get the currently selected text
  const selectedText = getSelectedText();

  // If no text is selected, return early
  if (!selectedText) {
    return;
  }

  // Encode the selected text for use in the search query
  const uriText = encodeURI(selectedText);

  // Get the search buddy configuration
  const searchBuddyCfg = vscode.workspace.getConfiguration(configSection);

  // Get the query template from the configuration
  const queryTemplate = searchBuddyCfg.get(CFG_QUERY);

  // If the query template is not a string, return early
  if (typeof queryTemplate !== 'string') {
    return;
  }

  // Replace the "%SELECTION%" placeholder in the query template with the encoded text
  const query = queryTemplate.replace('%SELECTION%', uriText);

  // Open the search query in the default web browser
  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}

/**
 * Retrieves the currently selected text in the active text editor.
 * Returns an empty string if there is no active text editor, no document text,
 * or no selection.
 * Leading and trailing whitespace in the selected text is trimmed,
 * and multiple consecutive whitespaces are replaced with a single space.
 *
 * @returns The selected text.
 */
function getSelectedText(): string {
  // Get the active text editor
  const { activeTextEditor } = vscode.window;

  // If there is no active text editor, return an empty string
  if (!activeTextEditor) {
    return '';
  }

  // Get the document text
  const documentText = activeTextEditor.document.getText();

  // If there is no document text, return an empty string
  if (!documentText) {
    return '';
  }

  // Get the active selection
  const activeSelection = activeTextEditor.selection;

  // If there is no active selection or the selection is empty, return an empty string
  if (activeSelection === undefined || activeSelection.isEmpty) {
    return '';
  }

  // Get the start and end indices of the selection
  const selectionStartIndex = activeTextEditor.document.offsetAt(
    activeSelection.start
  );
  const selectionEndIndex = activeTextEditor.document.offsetAt(
    activeSelection.end
  );

  // Extract the selected text from the document text and trim leading/trailing whitespace
  let selectedText = documentText
    .slice(selectionStartIndex, selectionEndIndex)
    .trim();

  // Replace multiple consecutive whitespaces with a single space
  selectedText = selectedText.replace(/\s\s+/g, ' ');

  // Return the selected text
  return selectedText;
}

/**
 * Launches the Search URL using Google in the default browser.
 * Uses the webSearch function to perform the search.
 */
export function webSearchByGoogle() {
  webSearch(ConfigSections.searchByGoogle);
}

export function webSearchByDuckDuckGo() {
  webSearch(ConfigSections.searchByDuckDuckGo);
}

/**
 * Launches the Search URL using StackOverflow in the default browser.
 * Uses the webSearch function to perform the search.
 */
export function webSearchByStackOverflow() {
  webSearch(ConfigSections.searchByStackOverflow);
}

/**
 * Launches the Search URL using Github in the default browser.
 * Uses the webSearch function to perform the search.
 */
export function webSearchByGithub() {
  webSearch(ConfigSections.searchByGithub);
}
