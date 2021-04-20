import { Controller } from "stimulus"

import { JSONEditor } from '@json-editor/json-editor'

// import 'highlight.js/styles/monokai-sublime.css';

export default class extends Controller {

  static get targets() 
  {
    return [ "editor", "value" ]
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
    // let field = this.element;
    // let id = field.getAttribute("id");
    // let data = linotype[id];

    this.editor = new JSONEditor(this.editorTarget, {
      theme: 'spectre',
      disable_properties: true,
      disable_edit_json: true,
      schema: {
        type: "object",
        options: {
          collapsed: true
        },
        title: "Item",
        properties: {
          make: {
            type: "string",
            enum: [
              "Toyota",
              "BMW",
              "Honda",
              "Ford",
              "Chevy",
              "VW"
            ]
          },
          model: {
            type: "string"
          },
          year: {
            type: "integer",
            enum: [
              1995,1996,1997,1998,1999,
              2000,2001,2002,2003,2004,
              2005,2006,2007,2008,2009,
              2010,2011,2012,2013,2014
            ],
            default: 2008
          },
          safety: {
            type: "integer",
            format: "rating",
            maximum: "5",
            exclusiveMaximum: false,
            readonly: false
          }
        }
      }
    });

      // Initialize the editor with a JSON schema
      // var editor = new JSONEditor(document.getElementById('editor_holder'),{
        
      // });

      // // Hook up the submit button to log to the console
      // document.getElementById('submit').addEventListener('click',function() {
      //   // Get the value from the editor
      //   console.log(editor.getValue());
      // });


    // let toolbar = [];
    // if ( typeof String( data.toolbar ) === 'string' ) {
    //   toolbar = data.toolbar_presets[ data.toolbar ];
    // } else if ( data.toolbar.isArray ) {
    //   toolbar = data.toolbar;
    // }

    // this.options = {
    //   placeholder: data.placeholder,
    //   theme: data.theme,
    //   p: data.p,
    //   modules: {
    //     syntax: data.syntax,
    //     toolbar: toolbar
    //   }
    // }
   
    // const Syntax = Quill.import('modules/syntax');
    //   Syntax.DEFAULTS = {
    //   highlight: function (text) {
    //     const result = hljs.highlightAuto(text);
    //     return result.value;
    //   },
    //   interval: 0 
    // };
    // hljs.configure({
    //   languages: ['javascript', 'css']
    // });

    // if ( ! this.options.p ) {
    //   var Block = Quill.import('blots/block');
    //   Block.tagName = 'LINE';
    //   Quill.register(Block, true);
    // }

    // const Clipboard = Quill.import('modules/clipboard')
    // const Delta = Quill.import('delta')

    // class PlainClipboard extends Clipboard {
    //   onPaste (e) {
    //       e.preventDefault()
    //       const range = this.quill.getSelection()
    //       const text = e.clipboardData.getData('text/plain')
    //       const delta = new Delta()
    //       .retain(range.index)
    //       .delete(range.length)
    //       .insert(text)
    //       const index = text.length + range.index
    //       const length = 0
    //       this.quill.updateContents(delta, 'silent')
    //       this.quill.setSelection(index, length, 'silent')
    //       this.quill.scrollIntoView()
    //       update()
    //   }
    // }

    // Quill.register('modules/clipboard', PlainClipboard, true)
    
    // this.quill = new Quill( this.editorTarget, this.options );
    // this.quill.on('text-change', () => {
    //   this.update();
    // });
    // this.element.style.visibility = "visible";
  }

  update() 
  {
    // if ( this.quill.getLength() > 1 ) {
    //   this.contents = this.quill.root.innerHTML
    // } else {
    //   this.contents = ''
    // } 

    // if ( ! this.options.p ) {
    //   this.contents = this.contents.replace(/<\/line>$/, "");
    //   this.contents = this.contents.replace(/<line>/g, "");
    //   this.contents = this.contents.replace(/<\/line>/g, "<br/>");
    //   this.contents = this.contents.replace(/<br>/, "");
    // }

    // this.valueTarget.value = this.contents;
  }

  disconnect() 
  {  
    this.editor.destroy();
  }

}