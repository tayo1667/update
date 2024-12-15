document.getElementById('training-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const inputText = document.getElementById('input-text').value;
    const responseText = document.getElementById('response-text').value;

    // Store the new knowledge in the botKnowledge object
    botKnowledge[inputText.toLowerCase()] = responseText;

    alert('Bot trained successfully!');

    // Clear the form
    document.getElementById('input-text').value = '';
    document.getElementById('response-text').value = '';
});
