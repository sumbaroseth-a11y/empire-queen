const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");

// Arreglos de paletas de colores (2 paletas, 4 colores cada una)
const paletaCineNoir = ["#0b0c10", "#54032d", "#66fcf1", "#d4af37"];
const paletaNeonCyber = ["#1a002b", "#4a0072", "#ff007f", "#00e5ff"];
let paletaActual = paletaCineNoir;

// Función 1: Dibujar fondo con degradado
function dibujarFondo(colores) {
    const gradiente = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradiente.addColorStop(0, colores.at(0));
    gradiente.addColorStop(1, colores.at(1));
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Función 2: Dibujar círculo / lente óptico
function dibujarOrbita(x, y, radio, color) {
    ctx.beginPath();
    ctx.arc(x, y, radio, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, radio * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

// Función 3: Dibujar triángulo (prisma de luz)
function dibujarPrisma(x, y, tamano, color) {
    ctx.beginPath();
    ctx.moveTo(x, y - tamano);
    ctx.lineTo(x - tamano, y + tamano);
    ctx.lineTo(x + tamano, y + tamano);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.6;
    ctx.fill();
    ctx.globalAlpha = 1.0;
}

// Función 4: Dibujar líneas de encuadre y textos
function dibujarEncuadreYTextos(colores) {
    ctx.strokeStyle = colores.at(3);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(30, 30);
    ctx.lineTo(canvas.width - 30, 30);
    ctx.moveTo(30, canvas.height - 30);
    ctx.lineTo(canvas.width - 30, canvas.height - 30);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px 'Segoe UI', sans-serif";
    ctx.fillText("CONSTELACIONES CINEMATOGRÁFICAS", 45, 70);

    ctx.fillStyle = colores.at(2);
    ctx.font = "15px 'Segoe UI', sans-serif";
    ctx.fillText("Empire Queen Studio · Óptica Generativa y Narrativa Visual", 45, 95);
}

// Función principal que genera toda la composición
function generarComposicion() {
    dibujarFondo(paletaActual);

    // Bucle for: dibuja 22 elementos combinando figuras con condicional if/else
    for (let i = 0; i < 22; i++) {
        const x = Math.random() * (canvas.width - 100) + 50;
        const y = Math.random() * (canvas.height - 160) + 120;
        const tamano = Math.random() * 25 + 10;
        const indiceColor = Math.floor(Math.random() * 2) + 2;
        const colorAleatorio = paletaActual.at(indiceColor);

        if (i % 3 === 0) {
            dibujarOrbita(x, y, tamano, colorAleatorio);
        } else if (i % 3 === 1) {
            dibujarPrisma(x, y, tamano, colorAleatorio);
        } else {
            ctx.fillStyle = colorAleatorio;
            ctx.globalAlpha = 0.5;
            ctx.fillRect(x, y, tamano, tamano * 0.6);
            ctx.globalAlpha = 1.0;
        }
    }

    dibujarEncuadreYTextos(paletaActual);
}

// Eventos de botones HTML
document.getElementById("btnPaleta1").addEventListener("click", () => {
    paletaActual = paletaCineNoir;
    generarComposicion();
});

document.getElementById("btnPaleta2").addEventListener("click", () => {
    paletaActual = paletaNeonCyber;
    generarComposicion();
});

document.getElementById("btnGenerar").addEventListener("click", () => {
    generarComposicion();
});

document.getElementById("btnGuardar").addEventListener("click", () => {
    const enlace = document.createElement("a");
    enlace.download = "EmpireQueen_ArteGenerativo.png";
    enlace.href = canvas.toDataURL("image/png");
    enlace.click();
});

window.onload = generarComposicion;
