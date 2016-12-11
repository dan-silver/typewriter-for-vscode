'use strict';

import * as vscode from 'vscode';
import {type} from './humanTyper';

let typewriterBuffer:string;

export function activate(context: vscode.ExtensionContext) {

    let playTypewriterCmd = vscode.commands.registerCommand('extension.playback', () => {


        let minSpeed = vscode.workspace.getConfiguration('typewriter').get<number>('TypingMinSpeed') | 30;
        let maxSpeed = vscode.workspace.getConfiguration('typewriter').get<number>('TypingMaxSpeed') | 120;
        type(typewriterBuffer, minSpeed, maxSpeed);
    });

    let setTypewriterCmd = vscode.commands.registerCommand('extension.setTypewriter', () => {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        var selection = editor.selection;
        typewriterBuffer = editor.document.getText(selection);
    })

    context.subscriptions.push(playTypewriterCmd);
    context.subscriptions.push(setTypewriterCmd);
}

// this method is called when your extension is deactivated
export function deactivate() {
}