const Router = require('./router'); 
const Inbox = require('./inbox');
const Sent = require('./sent');

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
      sent: Sent    
    };

    const router = new Router(node, routes);
    
    
  
}); 


