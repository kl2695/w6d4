const MessageStore = require('./message_store'); 


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