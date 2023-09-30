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
            botMessage = ChatbotOutput(userMessage);
            if (botMessage) displayMessage(botMessage, "Chatbot");
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
            botMessage = ChatbotOutput(userMessage);
            if (botMessage) displayMessage(botMessage, "Chatbot");
        }, 200);
    }
    else{
        alert("Nothing to submit");
    }
});

function ChatbotOutput(input) {
    let product;
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
    
    text = text.replace(/ a /g, " ")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "");

    if (compare(utterances, answers, text)) {
        product = compare(utterances, answers, text);
    }
    else {
        product = alternatives[Math.floor(Math.random() * alternatives.length)];
    }
    return product;
}

function compare(utterancesArray, answersArray, string) {
    let item;
    for (let x = 0; x < utterancesArray.length; x++) {
        for (let y = 0; y < utterancesArray[x].length; y++) {
            if (utterancesArray[x][y] == string) {
                items = answersArray[x];
                item = items[Math.floor(Math.random() * items.length)];
            }
        }
    }
    return item;
}

const utterances = [
    ["how are you", "how is life", "how are things"],
    ["hi", "hey", "hello", "good morning", "good evening", "good day"],
    ["when do you open", "when is opening time", "are you open"],
    ["when do you close", "when is closing time", "are you closed"]
];

const answers = [
    ["I'm fine, how are you?", "Pretty well, how about you?", "Fantastic, how are you?"],
    ["Hello!", "Hi!", "Hey!", "Howdy!"],
    ["We open at 9am today."],
    ["We close at 10pm today."]
];

const alternatives = [
    "Sorry, I don't understand.",
    "Try again",
    ""
];