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