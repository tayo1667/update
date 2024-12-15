// Initialize bot memory from localStorage if available
let botKnowledge = JSON.parse(localStorage.getItem('botKnowledge')) || {
    "how i go fit transfer money": "You go open di app, choose 'Transfer,' put di person account details, and send di money.",
    "how long e go take for my transfer to land": "E fit take few minutes or hours, but e depend on di bank or platform wey you use.",
    "how much i go pay for transfer": "Di fee go depend on the amount wey you wan send and di bank or service provider.",
    "hello": "Hello, welcome to Orbytpay! I'm Tayo. How may I be of assistance?",
    "hi": "Hi there! Welcome to Orbytpay. How can I help you today?",
    "how are you": "I'm just a bot, but I'm here to help! How can I assist you?",
    "how you doing": "I'm good and you",
    "i'm good man": "hmm okok",
    "how do i open an account with obytpay?": "To open an account, just visit our website, fill in your details, and follow the easy steps. You go need your BVN and some personal info, no wahala.",
    "what is ajo, and how does it work?": "Ajo na group savings system wey you fit join. You and your people go contribute small small every month, and each person go take turn collect the full pot when e reach your turn",
    "can i track my cross-border payments?": "Yes! Once you make payment, you go fit track am on your dashboard. You go also get alerts for any updates.",
    "what is the exchange rate for sending money abroad?": "We dey use market-driven rates. The exchange rate go show you before you confirm any transfer, no worries!",
    "how long does it take for international payments to reflect?": "2 seconds",
    "how secure is my money with obytpay?": "Omo I'm sure e secure pass your relationship she",
    "is this safe": "safer than your relationship",
    "who is the eco of orbytpay": "Tayo Oyelere",
    "who is the ceo": "Tayo Oyelere",
    "who is the ceo of orbytpay": "Tayo Oyelere",
    "who owns orbytpay": "Tayo Oyelere",
    "when did orbytpay start": "Early 2023",
    "can i send money to someone without an account?": "Yes, you fit send money to anybody even if dem no get ObytPay account. We go send the person a message with the details to collect am.",
    "how much is the fee for cross-border payments?": "only 1 percent",
    "can i make payments from abroad?": "yes you can",
    "how do i join an ajo group?": "Just sign up on our website, browse available Ajo groups, and join the one wey suit you.",
    "is there a limit to how much i can send?": "No limit",
    "how do i add money to my obytpay account?": "You fit add money through bank transfer, card payment, or even from your mobile money wallet.",
    "do you charge for receiving money?": "No we don't",
    "how do i send money internationally": "To send money internationally, you need to create an account on our platform, link your payment method (bank account, credit card, etc.), enter the recipient’s details (including their country and payment method), and confirm the transfer",
    "what countries can i send money to": "Our platform supports payments to a wide range of countries. You can check the list of supported countries in the \"Send Money\" section of our website or app.",
    "what are the fees for sending money abroad?": "Only 1 percent",
    "how long will it take for my payment to reach the recipient?": "2 seconds",
    "is there a limit to how much money i can send?": "no limit",
    "is the money transfer secure?": "yes it is"
};

// Function to save bot knowledge to localStorage
function saveBotKnowledge() {
    localStorage.setItem('botKnowledge', JSON.stringify(botKnowledge));
}

// Function to export bot knowledge as a JSON file
function exportBotKnowledge() {
    const knowledgeBlob = new Blob([JSON.stringify(botKnowledge, null, 2)], { type: 'application/json' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(knowledgeBlob);
    downloadLink.download = 'botKnowledge.json';
    downloadLink.click();
}

// DOM elements
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-btn");

// Send button click event handler
sendButton.onclick = function () {
    const userMessage = messageInput.value.trim().toLowerCase();
    if (userMessage) {
        displayMessage(userMessage, "user-message");
        let botResponse = botKnowledge[userMessage];

        if (!botResponse) {
            botResponse = "Sorry, I don't understand that. Could you correct me?";
            displayMessage(botResponse, "bot-message");
            showCorrectionInterface(userMessage);
        } else {
            displayMessage(botResponse, "bot-message");
        }

        messageInput.value = "";
        scrollToBottom(chatBox);
    }
};

// Function to display message
function displayMessage(message, className) {
    const messageElement = document.createElement("div");
    messageElement.classList.add(className);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
}

// Function to show correction interface for unknown messages
function showCorrectionInterface(userMessage) {
    const correctionInput = document.createElement("input");
    correctionInput.type = "text";
    correctionInput.placeholder = "Please provide the correct response.";
    chatBox.appendChild(correctionInput);

    const submitCorrectionButton = document.createElement("button");
    submitCorrectionButton.textContent = "Submit Correction";
    chatBox.appendChild(submitCorrectionButton);

    submitCorrectionButton.onclick = function () {
        const correctionText = correctionInput.value.trim();
        if (correctionText) {
            botKnowledge[userMessage] = correctionText;
            saveBotKnowledge();
            displayMessage("Thank you for the correction! I've updated my knowledge.", "bot-message");

            const exportButton = document.createElement("button");
            exportButton.textContent = "Export Updated Knowledge";
            exportButton.onclick = exportBotKnowledge;
            chatBox.appendChild(exportButton);

            correctionInput.remove();
            submitCorrectionButton.remove();
        }
    };
}

// Function to handle multi-turn conversation (if needed in the future)
function handleMultiTurnConversation(userMessage) {
    let conversationHistory = JSON.parse(localStorage.getItem('conversationHistory')) || [];
    conversationHistory.push({ role: "user", message: userMessage });
    localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));

    let botResponse = botKnowledge[userMessage] || "Sorry, I didn't understand that. Could you clarify or provide a better response?";
    conversationHistory.push({ role: "bot", message: botResponse });
    localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));

    return botResponse;
}

// Utility function to scroll chat box to the latest message
function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}
