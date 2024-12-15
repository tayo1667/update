// Initialize bot memory from localStorage if available
let botKnowledge = JSON.parse(localStorage.getItem('botKnowledge')) || {
    "how i go fit transfer money": "You go open di app, choose 'Transfer,' put di person account details, and send di money.",
    "how long e go take for my transfer to land": "E fit take few minutes or hours, but e depend on di bank or platform wey you use.",
    "how much i go pay for transfer": "Di fee go depend on the amount wey you wan send and di bank or service provider.",
    "hello": "Hello, welcome to Orbytpay! I'm Tayo. How may I be of assistance?",
    "hi": "Hi there! Welcome to Orbytpay. How can I help you today?",
    "how are you": "I'm just a bot, but I'm here to help! How can I assist you?",
    
};

// Save updated bot knowledge to localStorage
function saveBotKnowledge() {
    localStorage.setItem('botKnowledge', JSON.stringify(botKnowledge));
}

// Export bot knowledge to a downloadable JSON file
function exportBotKnowledge() {
    const knowledgeBlob = new Blob([JSON.stringify(botKnowledge, null, 2)], { type: 'application/json' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(knowledgeBlob);
    downloadLink.download = 'botKnowledge.json';
    downloadLink.click();
}

const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-btn");

sendButton.onclick = function () {
    const userMessage = messageInput.value.trim().toLowerCase();

    if (userMessage) {
        const userMessageElement = document.createElement("div");
        userMessageElement.classList.add("user-message");
        userMessageElement.textContent = userMessage;
        chatBox.appendChild(userMessageElement);

        let botResponse = botKnowledge[userMessage];

        if (!botResponse) {
            botResponse = "Sorry, I don't understand that. Could you correct me?";

            const correctionMessageElement = document.createElement("div");
            correctionMessageElement.classList.add("bot-message");
            correctionMessageElement.textContent = botResponse;
            chatBox.appendChild(correctionMessageElement);

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
                    // Check if user is giving a valid response and update bot knowledge
                    botKnowledge[userMessage] = correctionText;
                    saveBotKnowledge(); // Save to localStorage

                    const confirmationMessageElement = document.createElement("div");
                    confirmationMessageElement.classList.add("bot-message");
                    confirmationMessageElement.textContent = "Thank you for the correction! I've updated my knowledge.";
                    chatBox.appendChild(confirmationMessageElement);

                    // Provide an option to export the updated knowledge
                    const exportButton = document.createElement("button");
                    exportButton.textContent = "Export Updated Knowledge";
                    exportButton.onclick = exportBotKnowledge;
                    chatBox.appendChild(exportButton);

                    // Remove the input field and button after submission
                    correctionInput.remove();
                    submitCorrectionButton.remove();
                }
            };
        } else {
            // If bot knows the answer, show it
            const botMessageElement = document.createElement("div");
            botMessageElement.classList.add("bot-message");
            botMessageElement.textContent = botResponse;
            chatBox.appendChild(botMessageElement);
        }

        // Clear the input field after sending
        messageInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
    }
};

// Function to handle multi-turn conversations with the user
function handleMultiTurnConversation(userMessage) {
    let conversationHistory = JSON.parse(localStorage.getItem('conversationHistory')) || [];

    // Store user input to the conversation history
    conversationHistory.push({ role: "user", message: userMessage });
    localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));

    // Bot response logic (can be extended with more complex AI models)
    let botResponse = botKnowledge[userMessage];
    if (!botResponse) {
        botResponse = "Sorry, I didn't understand that. Could you clarify or provide a better response?";
    }

    // Store bot response to the conversation history
    conversationHistory.push({ role: "bot", message: botResponse });
    localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));

    return botResponse;
}

function getBotResponse(userMessage) {
    const botResponse = handleMultiTurnConversation(userMessage);

    const botMessageElement = document.createElement("div");
    botMessageElement.classList.add("bot-message");
    botMessageElement.textContent = botResponse;
    chatBox.appendChild(botMessageElement);
}