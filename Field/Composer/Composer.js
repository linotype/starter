import { Controller } from "stimulus"

import dragula from 'dragula';

export default class extends Controller {

  static get targets() {
    return [ "value", "items", "templates", "add" ]
  }

  connect() 
  {  
    let field = this.element;
    let id = field.getAttribute("id");
    let data = linotype[id];

    var $dropZone = document.querySelectorAll(`[rel="drop-zone"]`);

    let drake = dragula( [].slice.apply( $dropZone ), {
      isContainer: function (el) {
        return false; // only elements in drake.containers will be taken into account
      },
      moves: function (el, source, handle, sibling) {
        return handle.className === 'composer-item-drag-img';
      },
      accepts: function (el, target, source, sibling) {
        return true; // elements can be dropped in any of the `containers` by default
      },
      invalid: function (el, handle) {
        return false; // don't prevent any drags from initiating by default
      },
      direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
      copy: false,                       // elements are moved by default, not copied
      copySortSource: false,             // elements in copy-source containers can be reordered
      revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
      removeOnSpill: false,              // spilling will `.remove` the element, if this is true
      mirrorContainer: document.body,    // set the element that gets mirror elements appended
      ignoreInputTextSelection: true,     // allows users to select input text, see details below
      slideFactorX: 0,               // allows users to select the amount of movement on the X axis before it is considered a drag instead of a click
      slideFactorY: 0,               // allows users to select the amount of movement on the Y axis before it is considered a drag instead of a click
    } );
    drake.on('drop', function(el, target, source, sibling){
      source.dispatchEvent(new Event('change'));
    });
    
    this.addTarget.querySelectorAll('.composer-item-add').forEach(item => {
      item.addEventListener('click', event => {
        this.add( event.target.getAttribute('data-type') );
        this.init();
        this.update();
      });
    })

    this.init();
  }

  init(){
    this.itemsTarget.addEventListener('change', event => {
      this.update();
    });
    this.itemsTarget.querySelectorAll('.linotype-field-value').forEach(item => {
      item.addEventListener('change', event => {
        this.update();
      });
      item.addEventListener('keyup', event => {
        this.update();
      });
    });
    this.itemsTarget.querySelectorAll('.composer-item-delete').forEach(item => {
      item.addEventListener('click', event => {
        this.delete( event.target.parentNode.parentNode );
        this.update();
      });
    })
  }

  update(){

    let field = this.element;
    let id = field.getAttribute("id");
    let data = linotype[id];

    let key = 0;
    let items = {};
    this.itemsTarget.querySelectorAll('.composer-item').forEach(item => {
      let context = {};
      item.querySelectorAll('.linotype-field').forEach(field => {
        context[ field.getAttribute('data-key') ] = {
          type: field.getAttribute('data-type'),
          value: this.parseOnJson( field.querySelectorAll('.linotype-field-value')[0].value ) 
        };
      });
      items[key] = {
        block: item.getAttribute('data-type'),
        context: context
      };
      key++;
    });

    this.valueTarget.value = JSON.stringify( items );
    console.log('Composer update', items );
 }

 add( type ) {
  var template = this.templatesTarget.querySelector('#composer-item-clone--' + type ).innerHTML;
  var clone = document.createElement('section');
  clone.innerHTML = template;
  clone.classList.add("composer-item");
  clone.dataset.type = type;
  let uid = this.itemsTarget.querySelectorAll('.composer-item').length + 1;
  clone.querySelector('.composer-item-edit').children.forEach(item => {
    item.id = 'field-composer-item-' + uid + '-' + item.getAttribute('data-key').toLowerCase();
  });
  this.itemsTarget.appendChild(clone);
 }

 delete( target ) {
  target.remove();
   console.log('delete',target);
 }

 parseOnJson(str) {
  try {
      return JSON.parse(str);
  } catch (e) {
      return str;
  }
}

}