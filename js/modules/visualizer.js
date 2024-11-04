export class AudioVisualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.isActive = false;
        this.animationFrame = null;
        
        this.initialize();
    }

    initialize() {
        this.container.appendChild(this.canvas);
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }

    start() {
        if (!this.isActive) {
            this.isActive = true;
            this.animate();
        }
    }

    stop() {
        this.isActive = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    animate() {
        if (!this.isActive) return;

        this.ctx.fillStyle = 'rgba(11, 11, 31, 0.2)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.isActive) {
            const barCount = 60;
            const barWidth = this.canvas.width / barCount;
            
            for (let i = 0; i < barCount; i++) {
                const height = Math.random() * this.canvas.height * 0.8;
                const hue = (i / barCount) * 360;
                
                this.ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.8)`;
                this.ctx.fillRect(
                    i * barWidth,
                    this.canvas.height - height,
                    barWidth - 2,
                    height
                );
            }
        }

        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
}

export default AudioVisualizer;
