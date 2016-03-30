'use strict'
const neo4jPromise = require('../neo4j/neo4jQueryPromiseReturn.js');
const messageFormatter = require('./formatChatMessageForDB.js');

module.exports = {
  addChatMessageToDB: (messageBody, chatID, username) => {
    console.log("message body", messageBody);

    //  let formattedMessageObject = messageFormatter.formatChatMessageWithProps(messageBody);
    //  console.log("formatted chat object ", formattedMessageObject);

    const addChatMessageQuery = `MATCH (root)
    WHERE root.chatID="${chatID}"
    OPTIONAL MATCH (root)-[r:CURRENT]-(secondlatestmessage)
    DELETE r
    CREATE (root)-[:CURRENT]->(latest_message :Message{text:"${messageBody}", username:"${username}"})
    WITH latest_message, collect(secondlatestmessage) AS seconds
    FOREACH (x IN seconds | CREATE (latest_message)-[:NEXT]->(x))
    RETURN latest_message`;

    return neo4jPromise.databaseQueryPromise(addChatMessageQuery)
    .then(latestMessage => {
      return new Promise((resolve, reject) => {
        if(latestMessage.length > 0) {
          resolve(latestMessage);
        } else {
          reject({"error": "could not add message to db"});
        }
      })
    }).catch(error => console.error(error));
  },

  retrieveChatMessages: chatID => {
    const retrieveChatQuery =
    `MATCH (chat:Chatroom{chatID:"${chatID}"})
    WITH chat
    MATCH (chat)-[:CURRENT]-(latestmessage)-[:NEXT*0..28]-(oldermessages)
    RETURN oldermessages ORDER BY oldermessages.datetime`;

    return neo4jPromise.databaseQueryPromise(retrieveChatQuery)
    .then(chatMessageArray => {
      return new Promise((resolve, reject) => {
        if(chatMessageArray.length > 0) {
          resolve(chatMessageArray);
        } else {
          reject({"error": "could not retrieve chat messages"});
        }
      })
    }).catch(error => console.error(error));
  }
}
