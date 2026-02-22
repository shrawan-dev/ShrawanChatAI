class RealChatUniversal {
    constructor() {
        // Aapki API Key (Ise secret rakhein)
        this.apiKey = "YOUR_ELEVENLABS_API_KEY"; 
        this.voiceId = "0e83b0a9ef9f49528bfbf7add14f8b0c"; // Example: Adam voice
        this.history = JSON.parse(localStorage.getItem('chat_history')) || [];
        this.init();
    }

    init() {
        // Sidebar toggle logic based on your screenshot
        document.getElementById('menu-toggle').onclick = () => {
            document.getElementById('sidebar').classList.toggle('active');
        };

        document.getElementById('send-btn').onclick = () => this.handleSend();
        this.renderHistory();
    }

    async handleSend() {
        const input = document.getElementById('user-input');
        const text = input.value.trim();
        if(!text) return;

        // UI Update
        document.getElementById('welcome').style.display = 'none';
        this.appendMessage('user', text);
        input.value = '';

        // AI Response simulation
        const aiResponse = "Namaste Shrawan! Main ElevenLabs ki awaaz mein baat kar raha hoon.";
        this.appendMessage('bot', aiResponse);
        
        // Auto-play high quality audio
        this.generateElevenLabsAudio(aiResponse);
    }

    // Universal Audio Function (ElevenLabs)
    async generateElevenLabsAudio(message) {
        const url = `https://api.elevenlabs.io/v1/text-to-speech/${this.voiceId}`;
        
        const headers = {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": this.apiKey
        };

        const data = {
            "text": message,
            "model_id": "eleven_multilingual_v2",
            "voice_settings": {
                "stability": 0.5,
                "similarity_boost": 0.75
            }
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error("Audio generation failed");

            const blob = await response.blob();
            const audioUrl = URL.createObjectURL(blob);
            const audio = new Audio(audioUrl);
            audio.play();
        } catch (error) {
            console.error("ElevenLabs Error:", error);
            // Fallback to basic speech if API fails
            const synth = window.speechSynthesis;
            synth.speak(new SpeechSynthesisUtterance(message));
        }
    }

    appendMessage(role, text) {
        const viewport = document.getElementById('chat-viewport');
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${role}-msg`;
        msgDiv.innerHTML = `<div class="content">${text}</div>`;
        viewport.appendChild(msgDiv);
        viewport.scrollTop = viewport.scrollHeight;
    }

    renderHistory() {
        const list = document.getElementById('chat-history');
        list.innerHTML = this.history.map(item => `
            <div class="history-item"><i class="material-icons">history</i> ${item}</div>
        `).join('');
    }
}

const app = new RealChatUniversal();
