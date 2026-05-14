// lib/candleCanvas.js
export function initCandleCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error("Canvas element not found:", canvasId);
        return;
    }
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let candles = [];
    const candleWidth = 10;
    const spacing = 15;
    const numCandles = Math.ceil(canvas.width / (candleWidth + spacing));

    // Mouse glow effect
    let mouse = { x: 0, y: 0, radius: 200, isMoving: false };

    // Function to generate random candle data
    function generateCandle() {
        const open = Math.random() * 100 + 50;
        const close = Math.random() * 100 + 50;
        const high = Math.max(open, close) + Math.random() * 30;
        const low = Math.min(open, close) - Math.random() * 30;
        return { open, close, high, low, color: close >= open ? '#22c55e' : '#ef4444' };
    }

    // Initialize candles
    for (let i = 0; i < numCandles; i++) {
        candles.push(generateCandle());
    }

    // Update canvas size on window resize
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const newNumCandles = Math.ceil(canvas.width / (candleWidth + spacing));
        if (newNumCandles > candles.length) {
            for (let i = candles.length; i < newNumCandles; i++) {
                candles.push(generateCandle());
            }
        } else if (newNumCandles < candles.length) {
            candles = candles.slice(0, newNumCandles);
        }
    };
    window.addEventListener('resize', resizeCanvas);

    // Mouse move handler for glow
    const handleMouseMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.isMoving = true;
        clearTimeout(mouse.timeout);
        mouse.timeout = setTimeout(() => {
            mouse.isMoving = false;
        }, 100); // Reset after 100ms of no movement
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Draw function for candles
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

        // Draw grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 0.5;
        const gridSize = 50;
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Update and draw candles
        for (let i = 0; i < numCandles; i++) {
            const candle = candles[i];
            const x = i * (candleWidth + spacing) + spacing / 2;
            const yOffset = canvas.height / 2; // Center candles vertically

            // Wick
            ctx.strokeStyle = candle.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x + candleWidth / 2, yOffset - candle.high);
            ctx.lineTo(x + candleWidth / 2, yOffset - candle.low);
            ctx.stroke();

            // Body
            ctx.fillStyle = candle.color;
            ctx.fillRect(x, yOffset - Math.max(candle.open, candle.close), candleWidth, Math.abs(candle.open - candle.close));

            // Small random movement for all candles (subtle "live" feel)
            candle.open += (Math.random() - 0.5) * 0.5;
            candle.close += (Math.random() - 0.5) * 0.5;
            candle.high = Math.max(candle.open, candle.close) + Math.abs((Math.random() - 0.5) * 5);
            candle.low = Math.min(candle.open, candle.close) - Math.abs((Math.random() - 0.5) * 5);

            // Ensure values stay within reasonable bounds
            candle.open = Math.max(20, Math.min(180, candle.open));
            candle.close = Math.max(20, Math.min(180, candle.close));
            candle.high = Math.max(20, Math.min(200, candle.high));
            candle.low = Math.max(0, Math.min(150, candle.low));
            candle.color = candle.close >= candle.open ? '#22c55e' : '#ef4444';
        }

        // Mouse glow effect
        if (mouse.isMoving) {
            const gradient = ctx.createRadialGradient(
                mouse.x, mouse.y, 0,
                mouse.x, mouse.y, mouse.radius
            );
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)'); // Blue glow
            gradient.addColorStop(0.8, 'rgba(59, 130, 246, 0.05)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add a small point of light at the cursor
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#fff';
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow
        }

        animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('mousemove', handleMouseMove);
    };
}