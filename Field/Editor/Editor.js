import { Controller } from "stimulus"

import EditorJS from '@editorjs/editorjs';

import Header from '@editorjs/header';
import SimpleImage from '@editorjs/simple-image';
import Delimiter from '@editorjs/delimiter';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Quote from '@editorjs/quote';
import CodeTool from '@editorjs/code';
import Embed from '@editorjs/embed';
import Table from 'editorjs-table';
import LinkTool from '@editorjs/link';
import Warning from '@editorjs/warning';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import Color from 'editorjs-text-color-plugin';
import Alert from 'editorjs-alert';
import Paragraph from 'editorjs-paragraph-with-alignment';
import Underline from '@editorjs/underline';
import FontFamily from 'editorjs-inline-font-family-tool';
import FontSize from 'editorjs-inline-font-size-tool';
import SocialPost from 'editorjs-social-post-plugin';
import Carousel from '@vietlongn/editorjs-carousel';

export default class extends Controller {

  static get targets() {
    return [ "value", "editor" ]
  }

  initialize() {
    
    let field = this.element;
    let id = field.getAttribute("id");
    let data = linotype[id];
    
    this.editorTarget.innerHTML = '';

    var source = this.valueTarget.value;

    var value = this.JsonParseSafe( source );

    var editor = new EditorJS({
      
      readOnly: false,

      holder:  this.editorTarget,
      readOnly: false,
      autofocus: false,
      placeholder: 'Let`s write an awesome story!',

      // inlineToolbar: ['link', 'marker', 'bold', 'italic'],

      tools: {
        
        header: {
          class: Header,
          inlineToolbar: ['marker', 'link'],
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 2
          },
          shortcut: 'CMD+SHIFT+H'
        },

        image: {
          class: Carousel,
          config: {
            endpoints: {
              byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
            }
          }
        },

        socialPost: SocialPost,

        underline: Underline,
        fontFamily: FontFamily,
        fontSize: FontSize,

        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },


        alert: {
          class: Alert,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+A',
          config: {
            defaultType: 'primary',
            messagePlaceholder: 'Enter something',
          },
        },

        Color: {
          class: Color,
          config: {
             colorCollections: ['#FF1300','#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
             defaultColor: '#FF1300',
             type: 'text', 
          }     
        },
        Marker: {
          class: Color,
          config: {
             defaultColor: '#FFBF00',
             type: 'marker', 
          }       
        },

        // image: SimpleImage,

        list: {
          class: List,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+L'
        },

        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },

        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
          },
          shortcut: 'CMD+SHIFT+O'
        },

        warning: Warning,

        marker: {
          class:  Marker,
          shortcut: 'CMD+SHIFT+M'
        },

        code: {
          class:  CodeTool,
          shortcut: 'CMD+SHIFT+C'
        },

        delimiter: Delimiter,

        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+C'
        },

        linkTool: LinkTool,

        embed: Embed,

        table: {
          class: Table,
          shortcut: 'CMD+ALT+T',
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },

      },
      
      data: value,
      
      onReady: function(){ },

      onChange: function() {
        console.log('something changed');
        editor.save()
          .then((savedData) => {
            this.holder.parentNode.querySelector('.linotype-field-value').value = JSON.stringify( savedData );
            this.holder.parentNode.querySelector('.linotype-field-value').dispatchEvent(new Event('change'));
          });
      }
    });

  }

  JsonParseSafe(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return '';
    }
  }

}