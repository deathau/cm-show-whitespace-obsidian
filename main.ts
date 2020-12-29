import './styles.scss'
import './cm-show-invisibles'
import { Plugin, MarkdownView, PluginSettingTab, App, Setting } from 'obsidian';

interface CMShowWhitespacePluginSettings {
  enabled: boolean;
  showNewline: boolean;
  showTab: boolean;
  showSpace: boolean;
  showSingleSpace: boolean;
  showTrailingSpace: boolean;
}

const DEFAULT_SETTINGS: CMShowWhitespacePluginSettings = {
  enabled: true,
  showNewline: true,
  showTab: true,
  showSpace: true,
  showSingleSpace: true,
  showTrailingSpace: true,
};
    
export default class CMShowWhitespacePlugin extends Plugin {

  settings: CMShowWhitespacePluginSettings;
  async onInit() {
    
  }

  async onload() {
    await this.loadSettings();
    this.updateHiddenChars();

    if (this.settings.enabled) {
      (this.app.workspace as any).layoutReady ? this.enable() : this.app.workspace.on('layout-ready', this.enable);
    }

    // add the toggle on/off command
    this.addCommand({
      id: 'toggle-show-whitespace',
      name: 'Toggle On/Off',
      callback: () => {
        // disable or enable as necessary
        this.settings.enabled ? this.disable() : this.enable();
      }
    });

    this.addSettingTab(new CMShowWhitespacePluginSettingTab(this.app, this));
  }

  onunload() {
    this.disable();
  }
  
  disable = () => {
    document.body.classList.remove('plugin-cm-show-whitespace');

    // this.app.workspace.getLeavesOfType("markdown").forEach((leaf) => {
    //   if (leaf.view instanceof MarkdownView) {
    //     this.showInvisibles(leaf.view.sourceMode.cmEditor, false);
    //   }
    // })

    this.app.workspace.off("codemirror", this.showInvisibles);

    this.settings.enabled = false;
    this.saveData(this.settings);
  }

  enable = () => {
    document.body.classList.add('plugin-cm-show-whitespace');

    this.app.workspace.on("codemirror", this.showInvisibles);

    this.app.workspace.getLeavesOfType("markdown").forEach((leaf) => {
      if (leaf.view instanceof MarkdownView) {
        this.showInvisibles(leaf.view.sourceMode.cmEditor);
      }
    })

    this.settings.enabled = true;
    this.saveData(this.settings);
  }

  showInvisibles = (cm: CodeMirror.Editor, enable: boolean = true) => {
    // @ts-ignore
    cm.setOption("showInvisibles", enable);
  }

  updateHiddenChars = () => {
    const { showNewline, showSingleSpace, showSpace, showTab, showTrailingSpace } = this.settings;
    const body = document.body;

    if (showNewline) {
      body.classList.remove('plugin-cm-show-whitespace-hide-newline');
    } else {
      body.classList.add('plugin-cm-show-whitespace-hide-newline');
    }
    if (showTab) {
      body.classList.remove('plugin-cm-show-whitespace-hide-tab');
    } else {
      body.classList.add('plugin-cm-show-whitespace-hide-tab');
    }
    if (showSpace) {
      body.classList.remove('plugin-cm-show-whitespace-hide-space');
    } else {
      body.classList.add('plugin-cm-show-whitespace-hide-space');
    }
    if (showSingleSpace) {
      body.classList.remove('plugin-cm-show-whitespace-hide-single-space');
    } else {
      body.classList.add('plugin-cm-show-whitespace-hide-single-space');
    }
    if (showTrailingSpace) {
      body.classList.remove('plugin-cm-show-whitespace-hide-trailing-space');
    } else {
      body.classList.add('plugin-cm-show-whitespace-hide-trailing-space');
    }
  }

  async loadSettings() {
    this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.updateHiddenChars();
  }
}

class CMShowWhitespacePluginSettingTab extends PluginSettingTab {
  plugin: CMShowWhitespacePlugin;

  constructor(app: App, plugin: CMShowWhitespacePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let {
      containerEl,
      plugin: { settings },
    } = this;

    containerEl.empty();
    containerEl.classList.add('plugin-cm-show-whitespace-settings');

    new Setting(containerEl).setHeading().setName('Spaces');
    new Setting(containerEl)
      .setName('Show space characters')
      .setDesc(
        'Show or hide the space character. Note: This will also hide single space characters.'
      )
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.showSpace).onChange(async (value) => {
          this.plugin.settings.showSpace = value;
          this.plugin.settings.showSingleSpace = value;
          await this.plugin.saveSettings();
          this.display();
        })
      );
    const singleSpaceSetting = new Setting(containerEl)
      .setName('Show single space characters')
      .setDesc('Show or hide single space characters')
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.showSingleSpace).onChange(async (value) => {
          this.plugin.settings.showSingleSpace = value;
          await this.plugin.saveSettings();
        });
      });
    if (!settings.showSpace) {
      // if general spaces are off it doesn't make sense to change the setting
      // to show or hide single spaces between words
      singleSpaceSetting.setClass('plugin-cm-show-whitespace-disabled');
    }
    new Setting(containerEl)
      .setName('Show trailing space characters')
      .setDesc('Show or hide trailing space characters')
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.showTrailingSpace).onChange(async (value) => {
          this.plugin.settings.showTrailingSpace = value;
          await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl).setHeading().setName('Other whitespace characters');
    new Setting(containerEl)
      .setName('Show newline characters')
      .setDesc('Show or hide the newline character')
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.showNewline).onChange(async (value) => {
          this.plugin.settings.showNewline = value;
          await this.plugin.saveSettings();
        })
      );
    new Setting(containerEl)
      .setName('Show tab characters')
      .setDesc('Show or hide the tab character')
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.showTab).onChange(async (value) => {
          this.plugin.settings.showTab = value;
          await this.plugin.saveSettings();
        })
      );
  }
}
