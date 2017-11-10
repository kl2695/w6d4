const MessageStore = require('./message_store');

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