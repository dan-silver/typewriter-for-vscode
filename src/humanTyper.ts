import * as vscode from 'vscode';

const JitterRange = [30, 120];
const charsToPauseOn = [",", '.', '!'];

export function type(textToInsert:string) {
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        return; // No open text editor
    };

    let pos = editor.selection.end.character;
    let line = editor.selection.end.line;
    let prevTimeout = 0;

    for (let i=0; i<textToInsert.length; i++) {
        let token = textToInsert[i];
        let timeout;

        if (token == `\n` || token == `\r\n`) {
            pos = 0;
            line++;
        }

        timeout = getRandomArbitrary(JitterRange[0], JitterRange[1]);

        (function(line, pos) {
            setTimeout(function() {
                vscode.window.activeTextEditor.edit((editbuilder) => {
                    let posToInsert = new vscode.Position(line, pos);
                    
                    editbuilder.insert(posToInsert, token);

                    // move the curson
                    var newSelection = new vscode.Selection(posToInsert, posToInsert);
                    editor.selection = newSelection;
                });
            }, prevTimeout + timeout)
        }(line, pos))


        // after a pause char (like a coma), take a breath
        if (charsToPauseOn.indexOf(token) != -1) {
            prevTimeout += JitterRange[1] * 2;
        }


        prevTimeout += timeout;
        pos += token.length;

    }

}

let getRandomArbitrary = (min:number, max:number) => {
    return Math.random() * (max - min) + min;
}