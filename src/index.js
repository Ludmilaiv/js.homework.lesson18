"use strict";

import "@babel/polyfill";
import "nodelist-foreach-polyfill";
import elementClosest from "element-closest";
elementClosest(window);
import "formdata-polyfill";
import "es6-promise";
import "fetch-polyfill";
import 'mdn-polyfills/Node.prototype.append';
import 'mdn-polyfills/Node.prototype.remove';


import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopUp from "./modules/togglePopUp";
import scrolling from "./modules/scrolling";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import ourCommand from "./modules/ourCommand";
import calculatVerification from "./modules/calculatVerification";
import calc from "./modules/calc";
import sendForm from "./modules/sendForm";

// Timer
countTimer("30 july 2020");
//меню
toggleMenu();
//popup
togglePopUp();
//плавная прокрутка
scrolling();
//табы
tabs();
//слайдер
slider();
//наша команда
ourCommand();
//калькулятор
calculatVerification();
calc(100);
//send-ajax-form
sendForm();
