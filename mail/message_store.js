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

