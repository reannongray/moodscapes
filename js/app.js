class MoodscapesApp {
    constructor() {
        this.moodCategories = {
            Energetic: {
                emoji: '⚡',
                subMoods: [
                    { name: 'Pumped', emoji: '💪' },
                    { name: 'Dancing', emoji: '💃' },
                    { name: 'Motivated', emoji: '🎯' },
                    { name: 'Powerful', emoji: '🦁' }
                ]
            },
            Calm: {
                emoji: '😌',
                subMoods: [
                    { name: 'Peaceful', emoji: '🌅' },
                    { name: 'Meditative', emoji: '🧘' },
                    { name: 'Serene', emoji: '🌊' },
                    { name: 'Tranquil', emoji: '🍃' }
                ]
            },
            Happy: {
                emoji: '😊',
                subMoods: [
                    { name: 'Joyful', emoji: '🌟' },
                    { name: 'Playful', emoji: '🎈' },
                    { name: 'Excited', emoji: '✨' },
                    { name: 'Upbeat', emoji: '🎵' }
                ]
            },
            Focus: {
                emoji: '🎯',
                subMoods: [
                    { name: 'Study', emoji: '📚' },
                    { name: 'Work', emoji: '💻' },
                    { name: 'Creative', emoji: '🎨' },
                    { name: 'Flow', emoji: '🌊' }
                ]
            },
            Mystical: {
                emoji: '🌌',
                subMoods: [
                    { name: 'Cosmic', emoji: '🪐' },
                    { name: 'Magical', emoji: '✨' },
                    { name: 'Dreamy', emoji: '💫' },
                    { name: 'Ethereal', emoji: '🌙' }
                ]
            }
        };
        
        this.selectedMoods = new Set();
        this.currentMode = 'music';
        this.isEmojiMode = false;
        this.isPlaying = false;
        this.currentProgress = 0;
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.createStarField();
        this.setupVisualizer();
        this.renderMoodCategories();
        this.setupProgressBar();
        
        // Start creating shooting stars periodically
        setInterval(() => this.createShootingStar(), 2000);
    }

    createStarField() {
        const starField = document.querySelector('.stars');
        if (!starField) return;
        
        const colors = ['#4F8FF7', '#9D50FF', '#FF50D6', '#FFFFFF'];
        
        // Clear existing stars
        starField.innerHTML = '';
        
        // Create new stars
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 3;
            
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.background = colors[Math.floor(Math.random() * colors.length)];
            star.style.boxShadow = `0 0 ${size * 2}px ${star.style.background}`;
            star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
            
            starField.appendChild(star);
        }
    }

    createShootingStar() {
    const starField = document.querySelector('.stars');
    if (!starField) return;
    
    // Create multiple shooting stars
    const numberOfStars = Math.floor(Math.random() * 3) + 1; // 1-3 stars at a time
    
    for (let i = 0; i < numberOfStars; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        // Random angle between -60 and -30 degrees (diagonal paths)
        const angle = Math.random() * -30 - 30;
        
        // Random direction (left-to-right or right-to-left)
        const direction = Math.random() > 0.5 ? 1 : -1;
        
        // Position and transform
        shootingStar.style.left = direction === 1 ? '0%' : '100%';
        shootingStar.style.top = `${Math.random() * 50}%`;
        shootingStar.style.transform = `rotate(${angle * direction}deg)`;
        
        // Random speed
        const duration = Math.random() * 1000 + 500; // 500-1500ms
        shootingStar.style.animation = `shoot ${duration}ms linear forwards`;
        
        starField.appendChild(shootingStar);
        
        setTimeout(() => shootingStar.remove(), duration);
    }
}

    setupVisualizer() {
        const visualizer = document.getElementById('audioVisualizer');
        if (!visualizer) return;

        const canvas = document.createElement('canvas');
        visualizer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = visualizer.offsetWidth;
        canvas.height = visualizer.offsetHeight;
        
        this.visualizerContext = ctx;
        this.visualizerCanvas = canvas;
        this.startVisualizer();

        window.addEventListener('resize', () => {
            canvas.width = visualizer.offsetWidth;
            canvas.height = visualizer.offsetHeight;
        });
    }

    startVisualizer() {
        if (!this.animationFrame) {
            const animate = () => {
                this.drawVisualizerBars();
                this.animationFrame = requestAnimationFrame(animate);
            };
            animate();
        }
    }

    stopVisualizer() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }

    drawVisualizerBars() {
        const ctx = this.visualizerContext;
        const canvas = this.visualizerCanvas;
        
        ctx.fillStyle = 'rgba(11, 11, 31, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        if (this.isPlaying) {
            const barCount = 60;
            const barWidth = canvas.width / barCount;
            
            for (let i = 0; i < barCount; i++) {
                const height = Math.random() * canvas.height * 0.8;
                const hue = (i / barCount) * 360;
                
                ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.8)`;
                ctx.fillRect(
                    i * barWidth,
                    canvas.height - height,
                    barWidth - 2,
                    height
                );
            }
        }
    }

    setupProgressBar() {
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar) return;

        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            this.setProgress(percent);
        });
    }

    setProgress(percent) {
        this.currentProgress = percent;
        const progressElement = document.querySelector('.progress');
        if (progressElement) {
            progressElement.style.width = `${percent * 100}%`;
        }
    }

    setupEventListeners() {
        // Mode toggle buttons
        document.querySelectorAll('[data-mode]').forEach(btn => {
            btn.addEventListener('click', () => this.toggleMode(btn.dataset.mode));
        });

        // Display toggle buttons
        document.querySelectorAll('[data-display]').forEach(btn => {
            btn.addEventListener('click', () => this.toggleDisplay(btn.dataset.display));
        });

        // Player controls
        const playBtn = document.getElementById('playBtn');
        if (playBtn) {
            playBtn.addEventListener('click', () => this.togglePlay());
        }

        // Volume control
        const volumeSlider = document.getElementById('volumeSlider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
            });
        }
    }

    toggleMode(mode) {
        this.currentMode = mode;
        document.querySelectorAll('[data-mode]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
    }

    toggleDisplay(display) {
        this.isEmojiMode = display === 'emoji';
        document.querySelectorAll('[data-display]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.display === display);
        });
        this.renderMoodCategories();
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        const playBtn = document.getElementById('playBtn');
        if (playBtn) {
            const icon = playBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-play');
                icon.classList.toggle('fa-pause');
            }
        }
        
        if (this.isPlaying) {
            this.startVisualizer();
        } else {
            this.stopVisualizer();
        }
    }

    setVolume(value) {
        console.log('Volume set to:', value);
    }

    renderMoodCategories() {
        const container = document.querySelector('.mood-categories');
        if (!container) return;

        container.innerHTML = '';

        Object.entries(this.moodCategories).forEach(([category, data]) => {
            const card = document.createElement('div');
            card.className = 'mood-card';
            card.innerHTML = `
                <h3>${this.isEmojiMode ? data.emoji : category}</h3>
                <div class="sub-moods">
                    ${data.subMoods.map(mood => `
                        <button class="btn medium-btn mood-btn" data-mood="${mood.name}">
                            ${this.isEmojiMode ? mood.emoji : mood.name}
                        </button>
                    `).join('')}
                </div>
            `;
            container.appendChild(card);
        });

        this.setupMoodListeners();
    }

    setupMoodListeners() {
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('selected');
                this.toggleMood(btn.dataset.mood);
            });
        });
    }

    toggleMood(mood) {
        if (this.selectedMoods.has(mood)) {
            this.selectedMoods.delete(mood);
        } else {
            this.selectedMoods.add(mood);
        }
        console.log('Selected moods:', Array.from(this.selectedMoods));
    }
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MoodscapesApp();
});