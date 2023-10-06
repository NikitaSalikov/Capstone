// get container, messages, and input elements
const chatContainer = document.getElementById("chat-container");
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// create new div for each input
function displayMessage(message, sender = "Me") {
    const newMessage = document.createElement("div");
    newMessage.className = "message";
    newMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(newMessage);

    chatContainer.scrollTop = chatContainer.scrollHeight;
}


// add event listener for key input
userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && userInput.value.trim() !== "") {
        const userMessage = userInput.value;
        displayMessage(userMessage, "User");
        userInput.value = "";

        setTimeout(() => {
            const botMessage = "Reply";
            displayMessage(botMessage, "Chatbot");
        }, 200);
    }
    else if(e.key === "Enter"){
        alert("Nothing to submit");
    }
});

// same for click
sendButton.addEventListener("click", function (e) {
    if (userInput.value.trim() !== "") {
        const userMessage = userInput.value;
        displayMessage(userMessage, "User");
        userInput.value = "";

        setTimeout(() => {
            const botMessage = "Reply";
            displayMessage(botMessage, "Chatbot");
        }, 200);
    }
    else{
        alert("Nothing to submit");
    }
});