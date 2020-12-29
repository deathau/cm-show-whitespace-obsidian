# Show Whitespace Obsidian Plugin
A plugin for [Obsidian](https://obsidian.md) which shows whitespace in the editor.

![Screenshot](https://github.com/deathau/cm-show-whitespace-obsidian/raw/main/screenshot.png)

Utilizes code from [cm-show-invisibles](https://github.com/coderaiser/cm-show-invisibles)
by [coderaiser](https://github.com/coderaiser)

### Compatibility

Custom plugins are only available for Obsidian v0.9.7+.

The current API of this repo targets Obsidian **v0.10.0**. 

### Notes
This is all very expermental at the moment, so parts might not work, etc.  
There are certain css classes, etc that can interfere with it and make the whitespace characters stand out more.  
Check out the styles.css in the release to see what styles are added to be customized.

You can override the following CSS variables in your custom CSS to use different characters if you wish.
  - `--spaceChar`
  - `--trailingSpaceChar`
  - `--singleSpaceChar`
  - `--tabChar`
  - `--newlineChar`
  - `--strictLineBreakChar`

## Installation

### From within Obsidian
From Obsidian v0.9.8, you can activate this plugin within Obsidian by doing the following:
- Open Settings > Third-party plugin
- Make sure Safe mode is **off**
- Click Browse community plugins
- Search for "Show Whitespace"
- Click Install
- Once installed, close the community plugins window and activate the newly installed plugin
#### Updates
You can follow the same procedure to update the plugin

### From GitHub
- Download the [Latest release](https://github.com/deathau/cm-show-whitespace-obsidian/releases/latest)
- Extract the `cm-show-whitespace-obsidian` folder from the zip to your vault's plugins folder: `<vault>/.obsidian/plugins/`  
Note: On some machines the `.obsidian` folder may be hidden. On MacOS you should be able to press `Command+Shift+Dot` to show the folder in Finder.
- Reload Obsidian
- If prompted about Safe Mode, you can disable safe mode and enable the plugin.
Otherwise head to Settings, third-party plugins, make sure safe mode is off and
enable the plugin from there.

## Development

This project uses Typescript to provide type checking and documentation.  
The repo depends on the latest [plugin API](https://github.com/obsidianmd/obsidian-api) in Typescript Definition format, which contains TSDoc comments describing what it does.

**Note:** The Obsidian API is still in early alpha and is subject to change at any time!

If you want to contribute to development and/or just customize it with your own
tweaks, you can do the following:
- Clone this repo.
- `npm i` or `yarn` to install dependencies
- `npm run build` to compile.
- Copy `manifest.json`, `main.js` and `styles.css` to a subfolder of your plugins
folder (e.g, `<vault>/.obsidian/plugins/cm-show-whitespace-obsidian/`)
- Reload obsidian to see changes

Alternately, you can clone the repo directly into your plugins folder and once
dependencies are installed use `npm run dev` to start compilation in watch mode.  
You may have to reload obsidian (`ctrl+R`) to see changes.

## Pricing
Huh? This is an open-source plugin I made *for fun*. It's completely free.
However, if you absolutely *have* to send me money because you like it that
much, feel free to throw some coins in my hat via
[PayPal](https://paypal.me/deathau) or sponsor me via
[GitHub Sponsors](https://github.com/sponsors/deathau)

# Version History
## 0.3.1
- Fix to prevent throwing an error when toggling off

## 0.3.0
- Fixed the issue of being unable to toggle the plugin
- Added a bunch of new settings (thanks to jjspace for providing these!)
  - Show/hide space characters
  - Show/hide single space characters
  - Show/hide trailing space characters
  - Show/hide newline characters
  - Show/hide tab characters
- Also added a setting for show/hide "strict" line break characters (two spaces followed by a newline)

## v0.2.0
- Added ability to toggle the setting via a command
You can bind your own hotkey to this if you wish.

## 0.1.0
- Added a global body class so that styling is not applied when the plugin is off
- More minor fixes to make space dots in the middle
- Overridable CSS variables for `--spaceChar`, `--tab-char` and `--newlineChar`

## v0.0.3
- Fixed end of line spaces to be on the same level as others
- Added a screenshot to the readme

This is my first real release utilizing automation 🤞

## v0.0.2
styling fixes to center space dots and adjust colours

## v0.0.1
Initial Release!  
No fancy settings or anything, just turn it on or off through the third party plugin settings
