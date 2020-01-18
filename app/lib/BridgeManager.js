import ComponentManager from 'sn-components-api';

export default class BridgeManager {

  /* Singleton */
  static instance = null;
  static get() {
    if (this.instance == null) { this.instance = new BridgeManager(); }
    return this.instance;
  }

  constructor() {
    this.updateObservers = [];
    this.initiateBridge();
  }

  addUpdateObserver(callback) {
    let observer = {callback: callback};
    this.updateObservers.push(observer);
    return observer;
  }

  notifyObserversOfUpdate() {
    for(var observer of this.updateObservers) {
      observer.callback();
    }
  }

  getNote() {
    return this.note;
  }

  getTodos() {
    if (!this.note) {
        return [];
    }

    const lines = this.note.content.text.split("\n")

    const todos = [];

    const depthTree = [todos];

    let lastLevel = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      const level = Math.max(0, line.match(/^\s+/) ? line.match(/^\s+/)[0].length : 0)
      const text = line.trimStart()

      if (i === 0) {
        lastLevel = level;
      }

      if (text.length === 0) {
        continue;
      }

      let done = false;

      if (text.match(/^- \[(x|X|\*)\]/)) {
        done = true;
      }

      const newTask = {
        title: text.replace(/^- \[(x| )\]/, "").trimStart(),
        done: done,
        subtasks: [],
      };

      if (level > lastLevel && i > 0) {
        // One level deeper
        lastLevel = level;
        const thisDepth = depthTree[depthTree.length - 1];
        depthTree.push(thisDepth[thisDepth.length - 1].subtasks);
      } else if (level < lastLevel && depthTree.length > 1) {
        lastLevel = level;
        depthTree.pop();
      }
      depthTree[depthTree.length - 1].push(newTask);
    }

    return todos;
  }

  initiateBridge() {
    var permissions = [
      {
        name: "stream-context-item"
        // name: "stream-items"
      }
    ]

    this.componentManager = new ComponentManager(permissions, function(){
      // on ready
    });

    this.componentManager.streamContextItem((item) => {
      this.note = item;
      this.notifyObserversOfUpdate();
  	})

    // this.componentManager.streamItems(["SN|Component", "SN|Theme", "SF|Extension"], (items) => {
    //   this.items = items.filter((item) => {return !item.isMetadataUpdate});
    // });
  }


}
