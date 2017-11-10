/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1)

function $l(arg) {
  // debugger
  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg])
  }else if(typeof arg === 'function'){
    
    document.addEventListener("DOMContentLoaded", arg);
    
  } else if (typeof arg === 'string') {
    return new DOMNodeCollection(Array.from(document.querySelectorAll(arg)));
  }

}


$l.extend = function(target, ...objs) {
  objs.forEach((obj) => {
    Object.getOwnPropertyNames(obj).forEach((prop) => {  
      target[prop] = obj[prop];
    });
  });
  return target;
};


window.$l = $l;

$l(() => {

  function test() {
    console.log("yo");
  }

  function test2() {
    $l('li').remove();
  }
  test();
  test2()



});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }
  
  html(string){
    
    if(string){
      this.nodes.forEach(function(node){
        return node.innerHTML = string; 
      });
    }else{
      return this.nodes[0].innerHTML;
    }
  }
  
  empty(){
    this.html("");
  }
  
  append(arg){
    if(arg instanceof String){
      this.nodes.forEach(function(node){
        node.innerHTML += arg; 
      });
    }else if(arg instanceof HTMLElement){
      this.nodes.forEach(function(node){
        node.innerHTML += arg.outerHTML; 
      });
    }else if(arg instanceof DOMNodeCollection){
      this.nodes.forEach(function(node1){
        arg.nodes.forEach(function(node2){
          node1.innerHTML += node2.outerHTML; 
        });
      });
    }else{
      console.log('fuk off mate');
    }
    
  }
  
  attr(attribute, value){
    if(value){
      return this.nodes[0].setAttribute(attribute,value)
    }else{
      return this.nodes[0].getAttribute(attribute);
    }
  }
  
  addClass(className){
    this.nodes.forEach(function(node){
      node.classList.add(className);
    });
  }
  
  removeClass(className){
    this.nodes.forEach(function(node){
      node.classList.remove(className);
    });
  }
  
  children(){
    let result = []; 
    this.nodes.forEach(function(node){
      result.push(node.children);
    });
    
    return new DOMNodeCollection(result);
  }
  parent(){
    let result = []; 
    this.nodes.forEach(function(node){
      result.push(node.parentElement);
    });
    
    return new DOMNodeCollection(result);
  }
  
  find(selector){
    let args = []; 
    this.nodes.forEach(function(node){
      args = args.concat(Array.from(node.querySelectorAll(selector)));
    });
    
    return new DOMNodeCollection(args);
  }
  
  remove() {
    this.nodes.forEach((node) => {
      node.remove();
    });
    
    this.nodes = [];
  }
  
  on(eventType, callback) {
    this.nodes.forEach((node) => {
      node.cb = callback;
      node.addEventListener(eventType, callback);
    });
  }
  
  off(eventType) {
    this.nodes.forEach((node) => {
      node.removeEventListener(eventType, node.cb);
    });
  }
  
  
  
}



module.exports = DOMNodeCollection;

/***/ })
/******/ ]);