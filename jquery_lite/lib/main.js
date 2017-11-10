const DOMNodeCollection = require("./dom_node_collection")

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