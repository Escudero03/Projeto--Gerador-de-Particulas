const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Garante que o fundo da página seja sempre preto
document.body.style.backgroundColor = '#000';

// Partículas e textos
const particles = [];
const texts = [
    { element: document.getElementById('text1'), x: Math.random() * canvas.width, y: Math.random() * canvas.height, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2 },
    { element: document.getElementById('text2'), x: Math.random() * canvas.width, y: Math.random() * canvas.height, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2 }
];

// Classe de partículas
class Particle {
    constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Criar partículas
function createParticles(num) {
    for (let i = 0; i < num; i++) {
        let size = Math.random() * 5 + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speedX = (Math.random() - 0.5) * 2;
        let speedY = (Math.random() - 0.5) * 2;
        particles.push(new Particle(x, y, size, speedX, speedY));
    }
}

// Conectar partículas
function connectParticles() {
    let maxDistance = 100;

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// Atualizar os textos flutuantes
function updateTexts() {
    texts.forEach(text => {
        text.x += text.speedX;
        text.y += text.speedY;

        if (text.x < 0 || text.x > canvas.width - 200) text.speedX *= -1;
        if (text.y < 0 || text.y > canvas.height - 50) text.speedY *= -1;

        text.element.style.left = `${text.x}px`;
        text.element.style.top = `${text.y}px`;
        text.element.style.display = 'block'; // Garante visibilidade
    });
}

// Loop de animação
function animate() {
    // Define fundo preto corretamente SEM deixar branco
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Atualiza e desenha partículas
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    connectParticles(); // Liga as partículas com linhas
    updateTexts(); // Atualiza os textos animados
    requestAnimationFrame(animate);
}

// Ajusta o tamanho do canvas ao redimensionar a tela
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles(100); // Recria partículas ao redimensionar
});

createParticles(100);
animate();
