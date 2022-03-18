(function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    var w = canvas.width =  innerWidth;
    var h = canvas.height = innerHeight;

    var particles = [];
    const properties = {
        bgColor             : 'rgb(17, 17, 19)',
        particleColor       : 'hsl(300, 87%, 55%)',
        particleRadius      : 3,
        particleCount       : 60,
        particleMaxVelocity : 0.5,
        lineLength          : 150,
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

    function drawLines() {
        let x1, y1, x2, y2, length, opacity;
        // For each particle getting its coords (Main)
        // and other particles coords (Other)
        particles.forEach(particleMain => {
            x1 = particleMain.x;
            y1 = particleMain.y;
            particles.forEach(particleOther => {
                x2 = particleOther.x;
                y2 = particleOther.y;
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

                if (length < properties.lineLength) {
                    opacity = 1 - length / properties.lineLength;
                    ctx.lineWidth = '0,5';
                    ctx.strokeStyle = `hsla(${300 - opacity * 90}, 80%, 58%, ${opacity})`;
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    // ctx.filter = 'drop-shadow(0px 0px 5px purple)';
                    ctx.stroke();
                }
            });
        });
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
        drawLines();
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