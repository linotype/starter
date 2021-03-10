import { Controller } from "stimulus"

import '@simonwep/pickr/dist/themes/classic.min.css';
import Pickr from '@simonwep/pickr/dist/pickr.es5.min';

export default class extends Controller {

  connect() 
  {  
    let field = this.element;
    let id = field.getAttribute("id");
    let data = linotype[id];

    let input = document.getElementById('color-picker-value--' + id);
    
    const pickr = Pickr.create({

      el: '.color-picker--' + id,
      theme: 'classic', 

      default: null,
  
      swatches: [
          'rgba(244, 67, 54, 1)',
          'rgba(233, 30, 99, 0.95)',
          'rgba(156, 39, 176, 0.9)',
          'rgba(103, 58, 183, 0.85)',
          'rgba(63, 81, 181, 0.8)',
          'rgba(33, 150, 243, 0.75)',
          'rgba(3, 169, 244, 0.7)',
          'rgba(0, 188, 212, 0.7)',
          'rgba(0, 150, 136, 0.75)',
          'rgba(76, 175, 80, 0.8)',
          'rgba(139, 195, 74, 0.85)',
          'rgba(205, 220, 57, 0.9)',
          'rgba(255, 235, 59, 0.95)',
          'rgba(255, 193, 7, 1)'
      ],
  
      components: {
  
          preview: true,
          opacity: true,
          hue: true,

          interaction: {
              hex: true,
              rgba: true,
              hsla: false,
              hsva: false,
              cmyk: false,
              input: true,
              clear: true,
              save: true
          }
      }
  
    });

    pickr.on('init', (color, instance) => {
      if ( input ) pickr.setColor( input.value );
    });

    pickr.on('clear', (color, instance) => {
      if ( input ) input.value = '';
    });

    pickr.on('save', (color, instance) => {
      if( input && color ) input.value = color.toHEXA().toString();
    });
  
  }

}