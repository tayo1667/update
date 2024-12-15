// Referral Code Generation Function
function generateReferralCode() {
    let referralCode = Math.floor(Math.random() * 9000000) + 1000000; // Generate a 7-digit code
    document.getElementById('referralCode').textContent = referralCode;
}

// Airdrop Value Logic
let value = 0; 
let defaultRate = 0.1;
let tapRate = 0.3; 


function updateAirdropValue() {
    value += defaultRate;
    document.getElementById('value').textContent = value.toFixed(1);  // Display with 1 decimal place
}


document.getElementById('airdropImage').addEventListener('click', () => {
    value += tapRate;  // Increase value by tapRate when image is clicked
    document.getElementById('value').textContent = value.toFixed(1);  // Update display immediately
});

document.getElementById('loginBtn').addEventListener('click', (e) => {
    e.preventDefault();  // Prevent form submission
    document.getElementById('authContainer').style.display = "none";  // Hide login form
    document.getElementById('airdropSection').style.display = "block"; // Show airdrop section
    generateReferralCode();  
});

document.getElementById('switchToSignup').addEventListener('click', () => {
    alert("Signup functionality is not implemented in this example.");
});

document.getElementById('airdropSection').style.display = "none";

setInterval(updateAirdropValue, 1000);
