let messages = {
  sent: [
      { to: "friend@mail.com", subject: "Check this out", body: "It's so cool" },
      { to: "person@mail.com", subject: "zzz", body: "so booring" }
    ],
    inbox: [
      { from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body: "grandmas cookies" },
    ]
}; 


const MessageStore = {
  getInboxMessages: function(){
    return messages.inbox; 
  },
  getSentMessages: function(){
    return messages.sent; 
  }
};


module.exports = MessageStore; 

