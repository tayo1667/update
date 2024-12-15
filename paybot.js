// Initialize bot knowledge
let botKnowledge = {
    "i want to do a transfer": "Oya nau send aza",
    "can you help me send money": "Sure! To send money, open the app, select 'Transfer,' and input the recipient's account details.",
    "send money for me to this account": "Please provide the account details, and I'll guide you through the transfer process.",
    "hello": "Hello, welcome to Orbytpay! I'm Tayo. How may I assist you?",
    "hi": "Hi there! Welcome to Orbytpay. How can I help you today?",
    "how are you": "I'm just a bot, but I'm here to help! How can I assist you?",
    "i want to make a transfer": "Of course! Please provide the account number, and I'll guide you through the process.",
    "help me with a transfer": "Sure! Just let me know the recipient's account details and I'll help you make the transfer.",
    "i need to send money": "Got it! Please provide the account number of the recipient, and I’ll help you with the transfer.",
    "can you help me with a transfer": "Yes, I can help! Please provide the account details and I'll assist you with the transfer.",
    "how do i transfer money": "To do that simply type 'I want to make a transfer' and provide the recipient's details.",
    "what do i need for a transfer": "You’ll need the recipient's account number, bank name, and your own account details.",
    "how do i send money": "To send money, open the app, select 'Transfer,' input the recipient's account information, and confirm.",
    "can you transfer money for me": "I can guide you through the process, but you will need to input the recipient's details for me to assist you further.",
    "where can i transfer money": "You can transfer money to any Nigerian bank account or international accounts through our app.",
    "how long does a transfer take": "Transfers within Nigeria are usually instant, while international transfers may take up to 6 seconds .",
    "is there a fee for transfers": "Yes, depending on the amount and destination, there may be a fee for transfers. Check the app for specific rates.",
    "how do i know if my transfer was successful": "You will receive a confirmation notification within the app once your transfer is successfully completed.",
    "can i transfer to another country": "Yes, you can transfer money to other countries. Make sure to check for international transfer fees and limits.",
    "can i cancel a transfer": "If the transfer has not been processed yet, you can cancel it. Contact support for assistance if needed.",
    "how much can i transfer in a day": "The maximum amount you can transfer depends on your account type. Check your account limits in the app.",
    "can i save account details for future transfers": "Yes, you can save the recipient’s account details for easy future transfers.",
    "how do i save account details": "When making a transfer, you’ll have an option to save the recipient’s account details for future use.",
    "what is the minimum amount I can transfer": "The minimum amount you can transfer varies depending on the transfer type. Check the app for details.",
    "can I make a transfer without internet": "No, you need an internet connection to make a transfer. Ensure your network is stable before initiating a transfer.",
    "why was my transfer rejected": "Your transfer may have been rejected due to insufficient funds, incorrect details, or a system issue. Please check and try again.",
    "can I transfer to an international bank account": "Yes, international transfers are possible. Please make sure you have the correct international bank details.",
    "how do I get a transfer receipt": "After a successful transfer, you can download or email the receipt directly from the app.",
    "is my transfer secure": "Yes, all transfers are securely processed using encryption and the latest security protocols.",
    "can I schedule a transfer for later": "Yes, you can schedule your transfer for a specific date and time using the app.",
    "how do I transfer money from my wallet": "To transfer money from your wallet, open the app, select 'Wallet,' and choose 'Transfer' to enter the recipient’s details.",
    "can I send money to someone with a different bank": "Yes, you can send money to any bank in Nigeria or abroad, as long as you have the correct account details.",
};

// Function to get the bot response
function getTransferResponse(userMessage) {
    userMessage = userMessage.toLowerCase();

    // Check if the message contains any known transfer-related questions
    for (let question in botKnowledge) {
        if (userMessage.includes(question)) {
            return botKnowledge[question];
        }
    }

    // If not related to transfer, show the popup
    showPopup();
    return null; // No response
}

// Function to show the popup
function showPopup() {
    document.getElementById('popup').style.display = 'flex';
}

// Function to close the popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Function to display transfer input fields
function showTransferFields() {
    document.getElementById('transfer-inputs').style.display = 'block';
    document.getElementById('account-number').style.display = 'block';
}

// Function to handle account number input
function handleAccountNumberInput() {
    const accountNumber = document.getElementById('account-number-input').value.trim();

    if (accountNumber) {
        // Simulating an API response that fetches the bank name and account holder name based on the account number
        const bankName = "Access Bank";  // Example bank name
        const accountName = "Tayo Oyelere";  // Example account name, replace with actual API response

        // Show the bank name and account holder's name
        document.getElementById('bank-name').textContent = `Bank: ${bankName}`;
        document.getElementById('account-name').textContent = `Account Holder: ${accountName}`;

        // Show confirm button after the details
        document.getElementById('account-details').style.display = 'block';
        document.getElementById('confirm-btn').style.display = 'inline-block';
    }
}

// Main function to handle message sending
document.getElementById('send-btn').onclick = function () {
    const userMessage = document.getElementById('user-input').value.trim().toLowerCase();

    if (userMessage) {
        const userMessageElement = document.createElement("div");
        userMessageElement.classList.add("user-message");
        userMessageElement.textContent = userMessage;
        document.getElementById('chat-box').appendChild(userMessageElement);

        let botResponse = getTransferResponse(userMessage);

        if (botResponse) {
            const botMessageElement = document.createElement("div");
            botMessageElement.classList.add("bot-message");
            botMessageElement.textContent = botResponse;
            document.getElementById('chat-box').appendChild(botMessageElement);

            // If the bot response asks for an account number, show input field
            if (botResponse === "Oya nau send aza") {
                showTransferFields();
            }
        }

        // Clear the input field after sending
        document.getElementById('user-input').value = "";
        document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight; // Scroll to the latest message
    }
};

// Handle account number input
document.getElementById('account-number-input').addEventListener('input', handleAccountNumberInput);

// Handle confirmation button
document.getElementById('confirm-btn').onclick = function () {
    // After confirmation, redirect to a new page
    window.location.href = "transfer-confirmation.html";  // Replace with the actual confirmation page URL
};
