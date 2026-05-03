// Typing Animation
const typingElement = document.getElementById('typing-text');
const words = ['utility and aesthetics', 'form and function', 'tech and human', 'design and code'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 100;
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 200;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projects.forEach(project => {
            const category = project.getAttribute('data-category');
            if (filter === 'all' || filter === category) {
                project.classList.remove('d-none');
                project.style.opacity = '0';
                setTimeout(() => {
                    project.style.opacity = '1';
                }, 10);
            } else {
                project.classList.add('d-none');
            }
        });
    });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
let isDark = true;

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    if (!isDark) {
        document.documentElement.classList.add('light-mode');
        // We'd need light mode CSS variables for this to be fully effective
        // For now, let's just toggle the icon as a placebo or implement minimal switch
        themeIcon.textContent = '☀️';
        document.body.style.backgroundColor = '#f3f4f6';
        document.body.style.color = '#111827';
    } else {
        document.documentElement.classList.remove('light-mode');
        themeIcon.textContent = '🌙';
        document.body.style.backgroundColor = '#030712';
        document.body.style.color = '#f3f4f6';
    }
});

// AI Assistant Toggle
const aiToggle = document.getElementById('ai-toggle');
const aiChat = document.getElementById('ai-chat');
const aiInput = document.getElementById('ai-input');
const chatMessages = document.getElementById('chat-messages');

aiToggle.addEventListener('click', () => {
    aiChat.classList.toggle('show');
});

aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && aiInput.value.trim() !== '') {
        const userMsg = aiInput.value;
        appendMessage('user', userMsg);
        aiInput.value = '';
        
        // Mock AI Response
        setTimeout(() => {
            const botMsg = getBotResponse(userMsg);
            appendMessage('bot', botMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 600);
    }
});

function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'user' 
        ? 'bg-blue-600/40 p-3 rounded-2xl rounded-br-none ml-8' 
        : 'bg-white/5 p-3 rounded-2xl rounded-bl-none mr-8';
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(input) {
    input = input.toLowerCase();
    if (input.includes('skills')) return "Soham is proficient in React, Next.js, and Tailwind CSS. He also has experience with backend technologies like Node.js.";
    if (input.includes('contact') || input.includes('email')) return "You can reach Soham at hello@soham.com or via the contact form on this page!";
    if (input.includes('experience')) return "Soham recently interned at TechCorp Software where he worked on building responsive React components.";
    if (input.includes('projects')) return "He has worked on banking interfaces, e-commerce designs, and task management tools. Check the Projects section for more!";
    return "That's interesting! Soham would love to discuss that further. Feel free to send him a message through the contact form!";
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        
        if (response.ok) {
            alert(result.message || 'Thank you! Your message has been sent successfully.');
            contactForm.reset();
        } else {
            alert(result.error || 'Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Network error. Please check your connection and try again.');
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
});

// Initialize Typing
document.addEventListener('DOMContentLoaded', () => {
    type();
});
