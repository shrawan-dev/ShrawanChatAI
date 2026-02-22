// 1. Input field mein suggestion text set karna
function setInput(text) {
    document.getElementById('user-input').value = text;
}

// 2. Message send karne ka function
function sendMessage() {
    const inputField = document.getElementById('user-input');
    const chatContainer = document.getElementById('chat-messages');
    const welcomeScreen = document.getElementById('welcome-screen');
    const message = inputField.value.trim();

    if (message === "") return;

    // Welcome screen ko hide karna pehle message par
    if (welcomeScreen) welcomeScreen.style.display = 'none';

    // User ka message screen par dikhana
    const userDiv = document.createElement('div');
    userDiv.className = 'user-msg-style'; // Iski styling CSS mein add karein
    userDiv.innerHTML = `<b>You:</b> ${message}`;
    chatContainer.appendChild(userDiv);

    inputField.value = ""; // Input saaf karna

    // Gemini jaisa auto-reply (Dummy Response)
    // Real reply ke liye yaha API call karni hogi
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'bot-msg-style';
        const botResponse = "Main ek AI hoon. Aapki help kaise kar sakta hoon?";
        botDiv.innerHTML = `<b>Gemini:</b> ${botResponse}`;
        chatContainer.appendChild(botDiv);
        
        // Auto scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 1000);
}

// 3. Text to Speech (Hindi Support)
function speakText() {
    const chatContainer = document.getElementById('chat-messages');
    // Sabse aakhri bot message ko read karna
    const messages = chatContainer.getElementsByTagName('div');
    if (messages.length > 0) {
        const lastMsg = messages[messages.length - 1].innerText;
        const utterance = new SpeechSynthesisUtterance(lastMsg);
        utterance.lang = 'hi-IN'; // Hindi voice ke liye
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Bolne ke liye koi message nahi hai!");
    }
}

// 4. Enter key se message send karna
document.getElementById('user-input')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

