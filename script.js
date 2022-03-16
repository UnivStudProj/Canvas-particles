(function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    var w = canvas.width = innerWidth;
    var h = canvas.height = innerHeight;

    var particles = [];
    const properties = {
        bgColor             : 'rgba(17, 17, 19, 1)',
        particleColor       : 'rgba(255, 40, 40, 1)',
        particleRadius      : 3,
        particleCount       : 60,
        particleMaxVelocity : 0.5,
    }

    document.querySelector('body').appendChild(canvas);

    window.onresize = function() {
        w = canvas.width = innerWidth;
        h = canvas.height = innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.velocityX = Math.random() * properties.particleMaxVelocity * 2 - properties.particleMaxVelocity;
            this.velocityY = Math.random() * properties.particleMaxVelocity * 2 - properties.particleMaxVelocity;
        }

        updatePos() {
            let overX = this.#checkPos(this.x, this.velocityX, w);
            overX[0] || overX[1] ? this.velocityX *= -1 : this.velocityX;

            let overY = this.#checkPos(this.y, this.velocityY, h);
            overY[0] || overY[1] ? this.velocityY *= -1 : this.velocityY;

            this.x += this.velocityX;
            this.y += this.velocityY;
        }

        #checkPos(coord, velocity, side) {
            let isOverPositive = coord + velocity > side && velocity > 0;
            let isOverNegative = coord + velocity < 0 && velocity < 0;

            return [isOverPositive, isOverNegative]; 
        }

        reDraw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }
    }

    function reDrawBackground() {
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, w, h);
    }

    function reDrawParticles() {
        particles.forEach(particle => {
            particle.updatePos();
            particle.reDraw()
        });
    }

    function loop() {
        reDrawBackground();
        reDrawParticles();
        console.log(2);
        requestAnimationFrame(loop);
    }

    function init() {
        for (let i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle);
        }
        loop();
    }

    init();
}())