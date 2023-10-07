// get container, messages, and input elements
const chatContainer = document.getElementById("chat-container");
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

let useChatbot = true;

const buttonQuestions = [
    "Hello!",
    "How are you?",
    "Are you open?",
    "Are you closed?",
    "Can I talk to a real person?"
];

const utterances = [
    ["how are you", "how is life", "how are things"],
    ["hello", "hi", "hey", "good morning", "good evening", "good day"],
    ["are you open", "when do you open", "when is opening time"],
    ["are you closed", "when do you close", "when is closing time"],
    ["can i talk to real person"]
];

const answers = [
    ["I'm fine, how are you?", "Pretty well, how about you?", "Fantastic, how are you?"],
    ["Hello!", "Hi!", "Hey!", "Howdy!"],
    ["We open at 9am today."],
    ["We close at 10pm today."],
    ["Connecting to business..."]
];

const alternatives = [
    "Sorry, I don't understand.",
    "Try again",
    ""
];

let buttons = [];
createButtons();

function createButton(index, final) {
    let button = document.createElement("button");
    button.className = "button"
    button.innerHTML = buttonQuestions[index];


    if (final) button.addEventListener("click", function(e) {
        userInput.value = button.innerHTML;
        useChatbot = false;
        messageHandler();
    });

    else button.addEventListener("click", function(e) {
        userInput.value = button.innerHTML;
        messageHandler();
    });

    chatMessages.appendChild(button);
    return button;
}

function createButtons() {
    let i = 0;
    for (i; i < buttonQuestions.length -1; i++) {
        let button = createButton(i, false);
        buttons[i] = button;
    }

    let button = createButton(i, true);
    buttons[i] = button;
}

function recreateButtons()
{
    for (let i = 0; i < buttons.length; i++) {
        chatMessages.appendChild(buttons[i]);
    }
}

function destroyButtons() {
    for (let i = 0; i < buttons.length; i++) {
        chatMessages.removeChild(buttons[i]);
    }
}

// create new div for each input
function displayMessage(message, sender = "Me") {
    const newMessage = document.createElement("div");
    newMessage.className = "message";
    newMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(newMessage);

    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function messageHandler() {
    const userMessage = userInput.value;
    displayMessage(userMessage, "User");
    userInput.value = "";
    destroyButtons();

    setTimeout(() => {
        botMessage = ChatbotOutput(userMessage);
        if (botMessage)
        {
            displayMessage(botMessage, "Chatbot");
            if (useChatbot) recreateButtons();
        }
    }, 200);
}

// add event listener for key input
userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && userInput.value.trim() !== "") {
        messageHandler();
    }
    else if(e.key === "Enter"){
        alert("Nothing to submit");
    }
});

// same for click
sendButton.addEventListener("click", function (e) {
    if (userInput.value.trim() !== "") {
        messageHandler();
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