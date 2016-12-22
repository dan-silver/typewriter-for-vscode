# Typewriter for VS Code - Human like typing for GIFs and live demos

![Demo gif of setting and playback](https://raw.githubusercontent.com/dan-silver/typewriter-for-vscode/master/assets/demo.gif)



## Extension Settings

* `typewriter.TypingMinSpeed`: Lower limit on how fast to type in ms - randomized between this and max
* `typewriter.TypingMaxSpeed`: Upper limit on how fast to type in ms - randomized between min and this

## Commands
You can set keyboard shortcuts for the following by editing your keybindings.json file.
* `typewriter.setTypewriter`: Set text from selection
* `typewriter.playback`: Play
* `typewriter.pause`: Pause/resume playback


## Release Notes
### 1.0.1

* Added pause and resume command `typewriter.pause`
* Fixed issue with the commands prefix. To set custom keyboard shortcuts, use `typewriter.[command]` such as `typewriter.pause`

### 1.0.0

Initial release of Typewriter!
* Set and playback text
* Control the typing rate

## Future ideas!
* Language awareness when typing - brackets and braces first, then fill in contents
* Set the text from other sources besides a selection including files and the clipboard
* Set custom breakpoints for pauses during playback