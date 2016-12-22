import {window, workspace, Position, Selection, TextEditor} from 'vscode';


const charsToPauseOn = [",", '.', '!'];
let paused = false;

export function pause() {
    if (paused && resumeCall) {
        resumeCall();
        resumeCall = undefined;
    }
    paused = !paused;
}

let resumeCall;


export function type(textToInsert:string, minSpeed:number, maxSpeed:number) {
    var editor = window.activeTextEditor;
    if (!editor) {
        return; // No open text editor
    };

    typeTextRecursive(textToInsert, editor, editor.selection.end, minSpeed, maxSpeed);
}

let getRandomArbitrary = (min:number, max:number) => {
    return Math.random() * (max - min) + min;
}

function typeTextRecursive(buffer:string, editor:TextEditor, pos:Position, minSpeed:number, maxSpeed:number) {

    let token = buffer.substring(0, 1);
    if (buffer.length == 0) {
        return;
    }
    buffer = buffer.slice(1, buffer.length)


    if (token == `\n` || token == `\r\n`) {
        pos = new Position(pos.line + 1, 0); //start of a new line
    }


    window.activeTextEditor.edit((editbuilder) => {
        editbuilder.insert(pos, token);

        // move the cursor
        var newSelection = new Selection(pos, pos);
        editor.selection = newSelection;
    }).then(() => {
        let timeout = getRandomArbitrary(minSpeed, maxSpeed);

        // after a pause char (like a coma), take a breath
        if (charsToPauseOn.indexOf(token) != -1) {
            timeout += maxSpeed * 1.5;
        }

        // increment the position
        pos = new Position(pos.line, pos.character + token.length);

        setTimeout(() => {
            if (!paused)
                typeTextRecursive(buffer, editor, pos, minSpeed, maxSpeed);
            else {
                resumeCall = function () {
                    typeTextRecursive(buffer, editor, pos, minSpeed, maxSpeed);
                }
            }
        }, timeout)
    });
}