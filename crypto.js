document.getElementById('generate-wallet-btn').addEventListener('click', generateWallet);
document.getElementById('deposit-btn').addEventListener('click', depositCrypto);
document.getElementById('convert-btn').addEventListener('click', convertToFiat);
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Simulating a simple crypto-to-fiat conversion rate (BTC to USD)
const conversionRates = {
    BTC: {
        USD: 30000,
        EUR: 28000,
        GBP: 24000
    }
};

let userBalance = 0;  // Simulated crypto balance

function generateWallet() {
    // Simulating the generation of a wallet address (this would typically be done via a backend)
    const walletAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'; // Example Bitcoin address
    document.getElementById('wallet-address').textContent = `Your Wallet Address: ${walletAddress}`;
}

function depositCrypto() {
    const depositAmount = parseFloat(document.getElementById('deposit-amount').value);
    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert("Please enter a valid deposit amount.");
        return;
    }

    userBalance += depositAmount;
    document.getElementById('deposit-amount').value = '';  // Clear input field
    alert(`Deposited ${depositAmount} BTC. Current Balance: ${userBalance} BTC`);
}

function convertToFiat() {
    const fiatCurrency = document.getElementById('fiat-currency').value;
    const conversionRate = conversionRates.BTC[fiatCurrency];

    if (!conversionRate) {
        alert("Conversion rate not available.");
        return;
    }

    const convertedAmount = userBalance * conversionRate;
    document.getElementById('converted-amount').textContent = `Converted Amount: ${convertedAmount} ${fiatCurrency}`;
}

function toggleTheme() {
    // Toggle dark mode by adding/removing the 'dark-mode' class
    document.body.classList.toggle('dark-mode');
}
