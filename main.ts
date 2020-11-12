import './styles.scss'
import './cm-show-invisibles'
import { Plugin, MarkdownView } from 'obsidian';

export default class CMShowWhitespacePlugin extends Plugin {

  settings: any;
  async onInit() {
    
  }

  async onload() {
    this.settings = await this.loadData() || { enabled: true } as any;
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

    this.app.off("codemirror", this.showInvisibles);

    this.settings.enabled = false;
    this.saveData(this.settings);
  }

  enable = () => {
    document.body.classList.add('plugin-cm-show-whitespace');

    this.app.on("codemirror", this.showInvisibles);

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
}