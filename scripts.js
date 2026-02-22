class RealChatEngine {
    constructor() {
        this.history = JSON.parse(localStorage.getItem('chat_history')) || [];
        this.init();
    }

    init() {
        // Toggle Sidebar
        document.getElementById('menu-toggle').onclick = () => {
            document.getElementById('sidebar').classList.toggle('active');
        };

        // Send logic
        document.getElementById('send-btn').onclick = () => this.handleSend();
        document.getElementById('user-input').onkeypress = (e) => {
            if(e.key === 'Enter') this.handleSend();
        };

        this.renderHistory();
    }

    handleSend() {
        const input = document.getElementById('user-input');
        const text = input.value.trim();
        if(!text) return;

        document.getElementById('welcome').style.display = 'none';
        this.appendMessage('user', text);
        this.saveToHistory(text);
        
        input.value = '';

        // Simulate AI Reply
        setTimeout(() => {
            const reply = "Main aapki kaise madad kar sakta hoon?";
            this.appendMessage('bot', reply);
        }, 8000); // Latency simulation
    }

    appendMessage(role, text) {
        const viewport = document.getElementById('chat-viewport');
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${role}-msg`;
        msgDiv.innerHTML = `<div class="content">${text}</div>`;
        viewport.appendChild(msgDiv);
        viewport.scrollTop = viewport.scrollHeight;
    }

    saveToHistory(text) {
        this.history.unshift(text);
        localStorage.setItem('chat_history', JSON.stringify(this.history.slice(0, 10)));
        this.renderHistory();
    }

    renderHistory() {
        const list = document.getElementById('chat-history');
        list.innerHTML = this.history.map(item => `
            <div class="history-item"><i class="material-icons">chat</i> ${item}</div>
        `).join('');
    }

    textToSpeech() {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance("Bolne ke liye taiyaar.");
        utterance.lang = 'hi-IN';
        synth.speak(utterance);
    }
}

const app = new RealChatEngine();

