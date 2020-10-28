import './styles.scss'
import './cm-show-invisibles'
import { App, Plugin, Modal, Notice, PluginSettingTab, Setting } from 'obsidian';

export default class CMShowWhitespacePlugin extends Plugin {

  async onInit() {
    this.app.on("codemirror", cm => {
      (cm as any).setOption("showInvisibles", true);
    })
  }

  async onload() {
    if ((this.app.workspace as any).layoutReady) {
      this.layoutReady();
    }
    else {
      this.app.workspace.on('layout-ready', this.layoutReady);
    }
  }

  onunload() {
  }

  layoutReady = () => {
    const leaves = this.app.workspace.getLeavesOfType("markdown");
    leaves.forEach((leaf: any) => {
      if (leaf.view.sourceMode) {
        leaf.view.sourceMode.cmEditor.setOption("showInvisibles", true);
      }
      else console.log(leaf);
    })
  }
}