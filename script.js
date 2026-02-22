// AIzaSyC9Ft5icmSqNeyJ6F-57_9iI2dUkEE6U4I
const API_KEY = 'YOUR_API_KEY_HERE'; 

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // User ka message screen par dikhayein
    addMessage(text, 'user-message');
    userInput.value = '';

    // "Typing..." jaisa effect dikhane ke liye
    const loadingId = addMessage('...', 'bot-message');

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: text }] }]
            })
        });

        const data = await response.json();
        
        if (data.error) {
            document.getElementById(loadingId).innerText = "Error: Invalid API Key. Kripya code mein check karein.";
            return;
        }

        const botReply = data.candidates[0].content.parts[0].text;
        
        // Loading text ko actual reply se badal dein
        document.getElementById(loadingId).innerText = botReply;
    } catch (error) {
        document.getElementById(loadingId).innerText = "System Error: Message nahi ja saka.";
    }
}

function addMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;
    msgDiv.innerText = text;
    
    // Unique ID assign karna taaki baad mein text change kar sakein
    const id = 'msg-' + Date.now();
    msgDiv.id = id;
    
    chatBox.appendChild(msgDiv);
    // Hamesha naye message par scroll karein
    chatBox.scrollTop = chatBox.scrollHeight; 
    
    return id;
}

// Button click par ya Enter dabane par message send karein
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
