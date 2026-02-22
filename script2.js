const menuBtn = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

// Sidebar ko kholne aur band karne ke liye logic
menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Jab "New Chat" par click ho toh sidebar band ho jaye (Optional)
document.querySelector('.new-chat-btn').addEventListener('click', () => {
    // Naya chat reset karne ka logic yaha aayega
    sidebar.classList.remove('active');
    document.getElementById('chat-messages').innerHTML = ""; 
});

// Screen par kahi aur click karne par sidebar band ho jaye
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
        sidebar.classList.remove('active');
    }
});

