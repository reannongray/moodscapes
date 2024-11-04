export class StarField {
    constructor() {
        this.stars = [];
        this.container = document.querySelector('.stars');
        this.maxStars = 200;
        this.shootingStarInterval = 3000;
    }

    initialize() {
        this.createStars();
        this.animateStars();
        this.createShootingStars();
    }

    createStars() {
        for (let i = 0; i < this.maxStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDuration = `${2 + Math.random() * 3}s`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            this.container.appendChild(star);
            this.stars.push(star);
        }
    }

    animateStars() {
        this.stars.forEach(star => {
            star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite ease-in-out`;
        });
    }

    createShootingStars() {
        setInterval(() => {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            shootingStar.style.left = `${Math.random() * 100}%`;
            shootingStar.style.top = `${Math.random() * 100}%`;
            shootingStar.style.animation = 'shoot 1s linear forwards';
            this.container.appendChild(shootingStar);

            setTimeout(() => {
                shootingStar.remove();
            }, 1000);
        }, this.shootingStarInterval);
    }

    cleanup() {
        this.container.innerHTML = '';
        this.stars = [];
    }
}

export default StarField;

