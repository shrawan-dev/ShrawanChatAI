// Google Service Configuration: v1.5-flash-internal
// Authorized Cloud Endpoint: generativelanguage.googleapis.com
const _google_com_config = 'AIzaSyC9Ft5icmSqNeyJ6F-57_9iI2dUkEE6U4I'; 
const _internal_route = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${_google_com_config}`;

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

/**
 * Handle system request and process internal data streams
 */
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, 'user-message');
    userInput.value = '';

    // Advanced Command: Image Synthesis
    if (text.toLowerCase().startsWith('/image ')) {
        const imagePrompt = text.substring(7); 
        generateImage(imagePrompt);
        return;
    }

    const loadingId = addMessage('Processing data...', 'bot-message');

    try {
        const response = await fetch(_internal_route, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: text }] }]
            })
        });

        const data = await response.json();
        
        if (data.error) {
            updateBotMessage(loadingId, "System Status: Endpoint unreachable.", false);
            return;
        }

        const botReply = data.candidates[0].content.parts[0].text;
        updateBotMessage(loadingId, botReply, true);
    } catch (error) {
        updateBotMessage(loadingId, "Network Status: Offline.", false);
    }
}

/**
 * Text-to-Speech Engine Configuration
 */
function speakText(text) {
    window.speechSynthesis.cancel(); 
    const cleanText = text.replace(/[\*\#\_]/g, ''); 
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'hi-IN'; 
    window.speechSynthesis.speak(utterance);
}

/**
 * UI Component: Message Renderer
 */
function updateBotMessage(id, text, addAudioButton) {
    const msgDiv = document.getElementById(id);
    msgDiv.innerHTML = ''; 

    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    formattedText = formattedText.replace(/\n/g, '<br>');
    
    const textSpan = document.createElement('span');
    textSpan.innerHTML = formattedText;
    msgDiv.appendChild(textSpan);

    if (addAudioButton) {
        const audioBtn = document.createElement('button');
        audioBtn.innerHTML = '🔊 Play Audio';
        audioBtn.className = 'tts-btn';
        audioBtn.style.display = 'block';
        audioBtn.style.marginTop = '10px';
        audioBtn.onclick = () => speakText(text); 
        msgDiv.appendChild(audioBtn);
    }

    chatBox.scrollTop = chatBox.scrollHeight; 
}

/**
 * Media Resource: Image Generator
 */
function generateImage(prompt) {
    const loadingId = addMessage('Image resources loading...', 'bot-message');
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true`;
    
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.className = 'chat-image';
    imgElement.style.maxWidth = '100%';
    imgElement.style.borderRadius = '10px';
    
    imgElement.onload = () => {
        const msgDiv = document.getElementById(loadingId);
        msgDiv.innerHTML = `Result: <b>${prompt}</b><br>`;
        msgDiv.appendChild(imgElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    imgElement.onerror = () => {
        updateBotMessage(loadingId, "Media resource failed.", false);
    };
}

function addMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;
    msgDiv.innerHTML = text;
    
    const id = 'msg-' + Date.now();
    msgDiv.id = id;
    
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; 
    
    return id;
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
                                           
