import './styles.scss'
import './cm-show-invisibles'
import { Plugin, MarkdownView } from 'obsidian';

export default class CMShowWhitespacePlugin extends Plugin {

  async onInit() {
    this.app.on("codemirror", cm => {
      this.showInvisibles(cm);
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
    leaves.forEach((leaf) => {
      if (leaf.view instanceof MarkdownView) {
        this.showInvisibles(leaf.view.sourceMode.cmEditor);
      }
    })
  }

  showInvisibles = (cm: CodeMirror.Editor) => {
    // @ts-ignore
    cm.setOption("showInvisibles", true);
  }
}