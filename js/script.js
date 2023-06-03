'use strict';

import calculator from './modules/calculator';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {showModal} from './modules/modal';

//скрывать не нужные табы, показать нужный таб, обработчики событий на меню
window.addEventListener('DOMContentLoaded', () => {
    /*const calculator = require('./modules/calculator'),
          cards = require('./modules/cards'),
          forms = require('./modules/forms'),
          modal = require('./modules/modal'),
          slider = require('./modules/slider'),
          tabs = require('./modules/tabs'),
          timer = require('./modules/timer');

    calculator();
    cards();
    forms();
    modal();
    slider();
    tabs();
    timer();*/

    const timerID = setTimeout(() => showModal('.modal', timerID), 50000);

    calculator();
    cards();
    forms('form', timerID);
    modal('[data-modal]', '.modal', timerID);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '.offer__slider #current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2022-07-29T16:33:00');


});