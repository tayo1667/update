// Function to convert currency (mock conversion rates)
const exchangeRates = {
    USD: { INR: 74.85, EUR: 0.85, GBP: 0.74, JPY: 111.25 },
    EUR: { USD: 1.18, INR: 88.14, GBP: 0.87, JPY: 130.62 },
    GBP: { USD: 1.35, EUR: 1.15, INR: 101.98, JPY: 150.00 },
    INR: { USD: 0.013, EUR: 0.011, GBP: 0.0098, JPY: 1.32 },
    JPY: { USD: 0.009, EUR: 0.0077, GBP: 0.0067, INR: 0.75 }
};

// Function to handle currency conversion
document.getElementById('convert-btn').addEventListener('click', () => {
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const amount = document.getElementById('amount').value;

    if (!amount) {
        alert("Please enter an amount.");
        return;
    }

    // Mock exchange rate logic
    const rate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);
    document.getElementById('converted-amount').textContent = `${convertedAmount} ${toCurrency}`;
});

// Toggle between light and dark mode
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
