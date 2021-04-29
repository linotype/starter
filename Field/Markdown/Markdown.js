import { Controller } from "stimulus"

import 'simplemde/dist/simplemde.min.css';
import SimpleMDE from 'simplemde';

export default class extends Controller {

  static get targets() 
  {
    return [ "editor", "editor_container", "value" ]
  }

  static get values() 
  {
    return { 
      contents: String,
      options: Array
    }
  }

  connect() 
  {  
    let field = this.element;
    let id = field.getAttribute("id");
    let data = linotype[id];

    this.simplemde = new SimpleMDE( this.defaultOptions );
    
    this.simplemde.codemirror.on('change', () => {
      this.update();
    })

    this.simplemde.value(this.valueTarget.value);
 
    this.element.style.visibility = "visible";
    
  }

  update() 
  {
    this.valueTarget.value = this.simplemde.value();
  }

  disconnect() 
  { 
    this.simplemde.destroy()
    this.simplemde = undefined
  }

  get defaultOptions() {

    return { 
      element: this.editorTarget,
      autofocus: false,
      // autosave: {
      //   enabled: true,
      //   uniqueId: "MyUniqueID",
      //   delay: 1000,
      // },
      // blockStyles: {
      //   bold: "__",
      //   italic: "_"
      // },
      forceSync: true,
      // hideIcons: ["guide", "heading"],
      // indentWithTabs: false,
      initialValue: this.valueTarget.value,
      // insertTexts: {
      //   horizontalRule: ["", "\n\n-----\n\n"],
      //   image: ["![](http://", ")"],
      //   link: ["[", "](http://)"],
      //   table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
      // },
      // lineWrapping: false,
      // parsingConfig: {
      //   allowAtxHeaderWithoutSpace: true,
      //   strikethrough: false,
      //   underscoresBreakWords: true,
      // },
      placeholder: "Type here...",
      // previewRender: function(plainText) {
      //   return customMarkdownParser(plainText); // Returns HTML from a custom parser
      // },
      // previewRender: function(plainText, preview) { // Async method
      //   setTimeout(function(){
      //     preview.innerHTML = customMarkdownParser(plainText);
      //   }, 250);

      //   return "Loading...";
      // },
      // promptURLs: true,
      // renderingConfig: {
      //   singleLineBreaks: false,
      //   codeSyntaxHighlighting: true,
      // },
      // shortcuts: {
      //   drawTable: "Cmd-Alt-T"
      // },
      // showIcons: ["code", "table"],
      spellChecker: false,
      // status: true,
      // status: ["autosave", "lines", "words", "cursor"], // Optional usage
      // status: ["autosave", "lines", "words", "cursor", {
      //   className: "keystrokes",
      //   defaultValue: function(el) {
      //     this.keystrokes = 0;
      //     el.innerHTML = "0 Keystrokes";
      //   },
      //   onUpdate: function(el) {
      //     el.innerHTML = ++this.keystrokes + " Keystrokes";
      //   }
      // }], // Another optional usage, with a custom status bar item that counts keystrokes
      // styleSelectedText: false,
      // tabSize: 4,
      // toolbar: true,
      // toolbarTips: true,
    }

  }

}