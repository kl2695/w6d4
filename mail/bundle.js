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

const Router = __webpack_require__(1); 
const Inbox = __webpack_require__(5);
const Sent = __webpack_require__(4);
const Compose = __webpack_require__(6); 

document.addEventListener("DOMContentLoaded", function(event) {
  
  document.querySelector(".sidebar-nav")
    .addEventListener("click", function(event) {
      event.preventDefault();
      const location = event.target.innerText.toLowerCase();
      window.location.hash = location;
    });
    
    const node = document.querySelector(".content"); 
    const routes = {
      inbox: Inbox, 
      sent: Sent, 
      compose: Compose    
    };

    const router = new Router(node, routes);
    
    
  
}); 




/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Router {
  constructor (node, routes) {
    this.node = node;
    this.routes = routes; 
    this.start(); 
  }
  
  start() {
    this.render();
    window.addEventListener('hashchange', this.render.bind(this));
  }
  
  render(event) {
    this.node.innerHTML = '';
    const component = this.activeRoute();
    if(component){
      
      this.node.appendChild(component.render()); 
    }
  }
  
  activeRoute() {
    return this.routes[window.location.hash.slice(1)];
  }
}

module.exports = Router; 

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

let messages = {
  sent: [
      { to: "friend@mail.com", subject: "Check this out", body: "It's so cool" },
      { to: "person@mail.com", subject: "zzz", body: "so booring" }
    ],
    inbox: [
      { from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body: "grandmas cookies" },
    ]
}; 


class Message{
  constructor(from, to, subject, body){
    this.from = from;
    this.to = to; 
    this.subject = subject; 
    this.body = body; 
  }
  
}


const MessageStore = {
  getInboxMessages: function(){
    return messages.inbox; 
  },
  
  getSentMessages: function(){
    return messages.sent; 
  }, 
  
  messageDraft: new Message("", "", "", ""), 
  
  getMessageDraft: function(){
    return this.messageDraft; 
  },
  
  updateDraftField: function(field, value){
    this.messageDraft[field] = value; 
  },
  
  sendDraft: function(){
    messages.sent.push(this.messageDraft); 
    this.messageDraft = new Message("", "", "", ""); 
  }
  
};


module.exports = MessageStore; 



/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const MessageStore = __webpack_require__(3);

const messages = MessageStore.getSentMessages(); 

const Sent = {
  
  render: function(){
    
    let ul = document.createElement("UL"); 
    ul.className = "messages";
        
    messages.forEach((message) => {
      let node = this.renderMessage(message); 
      ul.appendChild(node);
    });
    
    
    return ul; 
  },
  
  
  renderMessage: function(message){
    let li = document.createElement("LI"); 
    li.className = "message";
    li.innerHTML = `<span class="to">${message.to}</span>
    <span class="subject">${message.subject}</span>
    <span class="body">${message.body}</span>`;
    
    return li;
  }
};

module.exports = Sent; 

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const MessageStore = __webpack_require__(3);

const messages = MessageStore.getInboxMessages(); 

const Inbox = {
  
  render: function(){
    
    let ul = document.createElement("UL"); 
    ul.className = "messages";
        
    messages.forEach((message) => {
      let node = this.renderMessage(message); 
      ul.appendChild(node);
    });
    
    
    return ul; 
  },
  
  
  renderMessage: function(message){
    let li = document.createElement("LI"); 
    li.className = "message";
    li.innerHTML = `<span class="from">${message.from}</span>
    <span class="subject">${message.subject}</span>
    <span class="body">${message.body}</span>`;
    
    return li;
  }
};

module.exports = Inbox; 

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const MessageStore = __webpack_require__(3); 


const Compose = {
  
  render: function(){
    let div = document.createElement("DIV"); 
    div.className = "new-message"; 
    
    div.addEventListener("change", (event) => {
      const name = event.target.name;
      const value = event.target.value;
      MessageStore.updateDraftField(name, value)
    });
    
    div.addEventListener("submit", (event) => {
      event.preventDefault();
      MessageStore.sendDraft()
      window.location.hash = "inbox"
    });
    
    div.innerHTML = this.renderForm(); 
    return div;
  }, 
  
  renderForm: function(){
    let messageDraft = MessageStore.getMessageDraft(); 
    
    messageDraft.innerHTML = `<p class="compose-form">
    <form class = "compose-form">
      <input placeholder="Recipient" name="to" type="text" value="${messageDraft.to}">
      <input placeholder="Subject" name="subject" type="text" value="${messageDraft.subject}">
      <textarea name="body" rows="20">${messageDraft.body}</textarea>
      <button type="submit" class="btn btn-primary submit-message">Send</button>
    </form>
    </p>`;
    
    return messageDraft.innerHTML; 
    
    
    
  }
}

module.exports = Compose;

/***/ })
/******/ ]);