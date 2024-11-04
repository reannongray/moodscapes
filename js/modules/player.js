export class Player {
    constructor() {
        this.isPlaying = false;
        this.volume = 1;
        this.currentProgress = 0;
        this.audioContext = null;
        this.elements = {
            playBtn: document.getElementById('playBtn'),
            volumeSlider: document.getElementById('volumeSlider'),
            progress: document.getElementById('audioProgress')
        };
        
        this.initialize();
    }

    initialize() {
        this.setupEventListeners();
        this.setupAudioContext();
    }

    setupAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.error('Web Audio API not supported:', error);
        }
    }

    setupEventListeners() {
        if (this.elements.playBtn) {
            this.elements.playBtn.addEventListener('click', () => this.togglePlay());
        }

        if (this.elements.volumeSlider) {
            this.elements.volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
            });
        }

        if (this.elements.progress) {
            this.elements.progress.addEventListener('click', (e) => {
                const rect = this.elements.progress.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                this.seekTo(percent);
            });
        }
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        this.updatePlayButton();
        this.emit('playStateChanged', this.isPlaying);
    }

    updatePlayButton() {
        if (this.elements.playBtn) {
            const icon = this.elements.playBtn.querySelector('i');
            if (icon) {
                icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
            }
        }
    }

    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
        if (this.elements.volumeSlider) {
            this.elements.volumeSlider.value = this.volume * 100;
        }
        this.emit('volumeChanged', this.volume);
    }

    seekTo(percent) {
        this.currentProgress = Math.max(0, Math.min(1, percent));
        if (this.elements.progress) {
            this.elements.progress.value = this.currentProgress * 100;
        }
        this.emit('progressChanged', this.currentProgress);
    }

    emit(eventName, data) {
        const event = new CustomEvent(eventName, { detail: data });
        window.dispatchEvent(event);
    }

    cleanup() {
        if (this.audioContext) {
            this.audioContext.close();
        }
    }
}

export default Player;
