let totalContributions = 0;
let contributors = [];
let currentContributorIndex = 0;

// Function to update the displayed total contributions
function updateTotalContributions() {
    document.getElementById('total-contributions').textContent = `$${totalContributions.toFixed(2)}`;
}

// Function to update the displayed next contributor
function updateNextContributor() {
    if (contributors.length > 0) {
        const nextContributor = contributors[currentContributorIndex];
        document.getElementById('next-contributor').textContent = nextContributor.name;
    }
}

// Add Contribution functionality
document.getElementById('add-contribution').addEventListener('click', () => {
    const userName = document.getElementById('user-name').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);

    if (!userName || isNaN(amount) || amount <= 0) {
        alert("Please enter valid details.");
        return;
    }

    // Add new contributor to the list
    contributors.push({ name: userName, amount: amount });
    totalContributions += amount;

    // Update the UI
    updateTotalContributions();

    // Move to the next contributor for weekly distribution
    currentContributorIndex = (currentContributorIndex + 1) % contributors.length;
    updateNextContributor();

    // Clear the inputs
    document.getElementById('user-name').value = '';
    document.getElementById('amount').value = '';
});
