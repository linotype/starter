import { Controller } from "stimulus"

import hljs from 'highlight.js';
window.hljs = hljs;
import Quill from 'quill';

import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import 'highlight.js/styles/monokai-sublime.css';

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

    let toolbar = [];
    if ( typeof String( data.toolbar ) === 'string' ) {
      toolbar = data.toolbar_presets[ data.toolbar ];
    } else if ( data.toolbar.isArray ) {
      toolbar = data.toolbar;
    }

    this.options = {
      placeholder: data.placeholder,
      theme: data.theme,
      p: data.p,
      modules: {
        syntax: data.syntax,
        toolbar: toolbar
      }
    }
   
    const Syntax = Quill.import('modules/syntax');
      Syntax.DEFAULTS = {
      highlight: function (text) {
        const result = hljs.highlightAuto(text);
        return result.value;
      },
      interval: 0 
    };
    hljs.configure({
      languages: ['javascript', 'css']
    });

    if ( ! this.options.p ) {
      var Block = Quill.import('blots/block');
      Block.tagName = 'LINE';
      Quill.register(Block, true);
    }

    const Clipboard = Quill.import('modules/clipboard')
    const Delta = Quill.import('delta')

    class PlainClipboard extends Clipboard {
      onPaste (e) {
          e.preventDefault()
          const range = this.quill.getSelection()
          const text = e.clipboardData.getData('text/plain')
          const delta = new Delta()
          .retain(range.index)
          .delete(range.length)
          .insert(text)
          const index = text.length + range.index
          const length = 0
          this.quill.updateContents(delta, 'silent')
          this.quill.setSelection(index, length, 'silent')
          this.quill.scrollIntoView()
          update()
      }
    }

    Quill.register('modules/clipboard', PlainClipboard, true)
    
    this.quill = new Quill( this.editorTarget, this.options );
    this.quill.on('text-change', () => {
      this.update();
    });
    this.element.style.visibility = "visible";
    
  }

  update() 
  {
    if ( this.quill.getLength() > 1 ) {
      this.contents = this.quill.root.innerHTML
    } else {
      this.contents = ''
    } 

    if ( ! this.options.p ) {
      this.contents = this.contents.replace(/<\/line>$/, "");
      this.contents = this.contents.replace(/<line>/g, "");
      this.contents = this.contents.replace(/<\/line>/g, "<br/>");
      this.contents = this.contents.replace(/<br>/, "");
    }

    this.valueTarget.value = this.contents;
  }

  disconnect() 
  { 
    this.editor_containerTarget.querySelector('.ql-toolbar').remove()
    this.quill.destroy()
    this.quill = undefined
    
  }

}