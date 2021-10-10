//import { io } from "../../socket.io-client"; //warum bisher nur über script tag?

////////////////////////////////////////////////
////////////// VARIABLES ///////////////////////
////////////////////////////////////////////////

const PORT = 3334;
const URL = 'ws://localhost:' + PORT;

let socketClient = {}; 
let messageObj = {};
const username = prompt('enter a username');

////////////////////////////////////////////////
//////////////// DOM SETUP /////////////////////
////////////////////////////////////////////////

const messageBox = document.querySelector('#messageBox');
const messageForm = document.querySelector('#messageForm');
  
// Event handler when the client enters a message
messageForm.onsubmit = function(e) {
  e.preventDefault();
  // Get the message from the messageBox
  const message = messageBox.value;
  // Render the sent message on the client as your own and reset the messageBox
  showMessageSent(message);
  messageBox.value = '';
  
  sendMessageToServer(message);
}

const init = () => {
  socketClient = io(URL); //! Anpassung domain

  socketClient.on("connect", () => {
      //console.log("socket client connected")
      messageObj = {
        type: "NEW_USER",
        payload: { text: "A new User appeared", username}
      }
      socketClient.emit("newUser",  messageObj);
    });
}

await init();


socketClient.on("message", (data) => {
  const { event, payload } = data;
  console.log(payload)
  switch(event) {
    case "NEW_USER":
      showMessageReceived('<em>A wild ' + payload.username + ' appeared!</em>')
      break;
    case "NEW_MESSAGE":
      showMessageReceived(`<strong>[${payload.username}]</strong> ${payload.text}`);
      break;
    default: 
      break;
  }
});


function sendMessageToServer(message) {
  // Make sure the client is connected to the ws server
  if (!socketClient) {
    showMessageReceived('No WebSocket connection :(');
    return;
  }
  const time = new Date();
  // TODO: 
  // Exercise 6: Send the message from the messageBox to the server
  // Exercise 9: Send the message in a custom message object with .type and .payload properties
  messageObj = {
    payload: { text: message, username, time }
  }
  socketClient.emit("newMessage",  messageObj);
}

////////////////////////////////////////////////
    //////////// DOM HELPER FUNCTIONS //////////////
    ////////////////////////////////////////////////

    const messages = document.querySelector('.chat');
    
    // These functions are just aliases of the showNewMessage function
    function showMessageSent(message) { 
      showNewMessage(message, 'sending'); 
    }
    function showMessageReceived(message) {
      showNewMessage(message, 'receiving'); 
    }
    
    // This function displays a message in the messages container node. 
    // className may either be 'mine' or 'yours' (see styles.css for the distinction)
    function showNewMessage(message, className) {
      // Create a text node element for the message
      const textNode = document.createElement('div');
      textNode.innerHTML = message;
      textNode.className = 'message';
      
      // Wrap the text node in a message element
      const messageNode = document.createElement('div');
      messageNode.className = 'messages ' + className;
      messageNode.appendChild(textNode);
      
      // Append the messageNode to the messages container element
      messages.appendChild(messageNode);
      messages.scrollTop = messages.scrollHeight;
    }

