export class MoodSelector {
    constructor() {
        this.moods = {
            energetic: {
                icon: '⚡',
                color: '#FF5733',
                genres: ['dance', 'electronic', 'pop']
            },
            relaxed: {
                icon: '🌊',
                color: '#4F8FF7',
                genres: ['ambient', 'chill', 'classical']
            },
            focused: {
                icon: '🎯',
                color: '#9D50FF',
                genres: ['minimal', 'instrumental', 'study']
            },
            happy: {
                icon: '☀️',
                color: '#FFD700',
                genres: ['happy', 'pop', 'funk']
            },
            melancholic: {
                icon: '🌙',
                color: '#6B4FF7',
                genres: ['indie', 'alternative', 'ambient']
            }
        };
        
        this.selectedMood = null;
        this.container = document.querySelector('.mood-categories');
        this.initialize();
    }

    initialize() {
        if (this.container) {
            this.renderMoods();
            this.setupEventListeners();
        }
    }

    renderMoods() {
        this.container.innerHTML = '';
        
        Object.entries(this.moods).forEach(([mood, data]) => {
            const moodElement = this.createMoodElement(mood, data);
            this.container.appendChild(moodElement);
        });
    }

    createMoodElement(mood, data) {
        const element = document.createElement('button');
        element.className = 'mood-button';
        element.dataset.mood = mood;
        
        element.style.setProperty('--mood-color', data.color);
        
        element.innerHTML = `
            <span class="mood-icon">${data.icon}</span>
            <span class="mood-name">${mood.charAt(0).toUpperCase() + mood.slice(1)}</span>
        `;
        
        return element;
    }

    setupEventListeners() {
        this.container.addEventListener('click', (e) => {
            const moodButton = e.target.closest('.mood-button');
            if (moodButton) {
                this.selectMood(moodButton.dataset.mood);
            }
        });
    }

    selectMood(mood) {
        if (this.selectedMood === mood) return;
        
        this.selectedMood = mood;
        this.updateSelection();
        this.emit('moodSelected', {
            mood,
            preferences: this.moods[mood]
        });
    }

    updateSelection() {
        const buttons = this.container.querySelectorAll('.mood-button');
        buttons.forEach(button => {
            button.classList.toggle('selected', 
                button.dataset.mood === this.selectedMood);
        });
    }

    emit(eventName, data) {
        window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
    }

    getCurrentMood() {
        return this.selectedMood;
    }
}

export default MoodSelector;
