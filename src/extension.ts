'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let JitterRange = [15, 150];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "typewriter" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        type();
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}


function type() {
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        return; // No open text editor
    };


    
    let textToInsert = "hello world, welcome to Typewriter. Highly configurable, human-like typing for VS Code. It's great for demos and GIFs";

    const charsToPauseOn = [",", '.', '!']

    let pos = editor.selection.end.character;
    let prevTimeout = 0;
    for (let i=0; i<textToInsert.length; i++) {
        let token = textToInsert[i];
        let timeout;

        timeout = getRandomArbitrary(JitterRange[0], JitterRange[1]);

        (function(pos) {
            setTimeout(function() {
                vscode.window.activeTextEditor.edit((editbuilder) => {
                    let posToInsert = new vscode.Position(editor.selection.end.line, pos);
                    editbuilder.insert(posToInsert, token);
                });
            }, prevTimeout + timeout)
        }(pos))


        // after a pause char (like a coma), take a breath
        if (charsToPauseOn.indexOf(token) != -1) {
            prevTimeout += JitterRange[1] * 2;
        }


        prevTimeout += timeout;
        pos += token.length;

    }

}


function getRandomArbitrary(min:number, max:number):number {
    return Math.random() * (max - min) + min;
}