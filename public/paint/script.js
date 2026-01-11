class PixelPaint {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.colorPicker = document.getElementById('colorPicker');
        this.brushSize = document.getElementById('brushSize');
        this.sizeValue = document.getElementById('sizeValue');
        this.brushBtn = document.getElementById('brushBtn');
        this.eraserBtn = document.getElementById('eraserBtn');
        this.fillBtn = document.getElementById('fillBtn');
        this.undoBtn = document.getElementById('undoBtn');
        this.redoBtn = document.getElementById('redoBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.saveBtn = document.getElementById('saveBtn');

        this.uploadBtn = document.getElementById('uploadBtn');

        this.preview = document.getElementById('preview');
        this.previewCtx = this.preview.getContext('2d');
        this.cursorPreview = document.getElementById('cursorPreview');

        this.canvasContainer = document.getElementById('canvas-container');

        // Zoom controls
        this.zoomInBtn = document.getElementById('zoomInBtn');
        this.zoomOutBtn = document.getElementById('zoomOutBtn');
        this.zoomFitBtn = document.getElementById('zoomFitBtn');
        //

        this.isDrawing = false;
        this.currentColor = '#345f1b';
        this.currentSize = 1;
        this.currentMode = 'brush'; // 'brush'  'eraser'
        this.lastX = -1;
        this.lastY = -1;

        // Zoom
        this.StandartCanvasSizeW = 480;
        this.StandartCanvasSizeH = 480;

        this.curCanvasSizeW = 480;
        this.curCanvasSizeH = 480;

        this.zoomSize = 40;

        // Undo/Redo stacks
        this.undoStack = [];
        this.redoStack = [];

        this.init();
    }

    init() {
        // Setup canvas (80x80 pixels)
        this.canvas.width = 60;
        this.canvas.height = 60;

        // alert(this.canvasContainer.offsetHeight);

        // Increase display size via CSS
        this.canvas.style.width = '480px';
        this.canvas.style.height = '480px';

        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Event listeners
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseleave', () => {
            this.stopDrawing();
            this.cursorPreview.style.display = 'none';
        });
        this.canvas.addEventListener('mouseenter', () => {
            this.cursorPreview.style.display = 'block';
        });

        // For mobile devices
        this.canvas.addEventListener('touchstart', (e) => this.startDrawing(e.touches[0]));
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.handleMouseMove(e.touches[0]);
        });
        this.canvas.addEventListener('touchend', () => {
            this.stopDrawing();
            this.cursorPreview.style.display = 'none';
        });

        // Tools
        this.colorPicker.addEventListener('change', (e) => {
            this.currentColor = e.target.value;
            this.updatePreview();
        });

        this.brushSize.addEventListener('input', (e) => {
            this.currentSize = e.target.value;
            this.sizeValue.textContent = e.target.value;
            this.updatePreview();
        });

        // Initialize preview
        this.updatePreview();

        this.clearBtn.addEventListener('click', () => this.clearCanvas());
        this.saveBtn.addEventListener('click', () => this.saveImage());

        this.uploadBtn.addEventListener('click', () => this.uploadImage());

        this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
        this.zoomFitBtn.addEventListener('click', () => this.zoomFit());

        // Undo/Redo buttons
        this.undoBtn.addEventListener('click', () => this.undo());
        this.redoBtn.addEventListener('click', () => this.redo());

        // Mode switching
        this.brushBtn.addEventListener('click', () => this.setMode('brush'));
        this.eraserBtn.addEventListener('click', () => this.setMode('eraser'));
        this.fillBtn.addEventListener('click', () => this.setMode('fill'));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Save initial state
        this.saveState();
    }

    startDrawing(e) {
        this.isDrawing = true;
        // Save state when starting to draw
        this.saveState();
        // Immediately draw on click without movement
        this.handleMouseMove(e);
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Check if mouse is over canvas
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            // Scale coordinates (80x80 -> 480x480)
            const scale = rect.width / this.canvas.width;
            const pixelX = Math.floor(x / scale);
            const pixelY = Math.floor(y / scale);

            const size = parseInt(this.currentSize);
            const halfSize = Math.floor(size / 2);

            // Preview position = drawing position
            const offset = Math.floor((size - 1) / 2);
            const previewX = (pixelX - offset) * scale;
            const previewY = (pixelY - offset) * scale;
            const previewSize = size * scale;

            this.cursorPreview.style.width = previewSize + 'px';
            this.cursorPreview.style.height = previewSize + 'px';
            this.cursorPreview.style.left = previewX + 'px';
            this.cursorPreview.style.top = previewY + 'px';
            // this.cursorPreview.style.top = (previewY - 484) + 'px';
            this.cursorPreview.style.borderColor = this.currentColor;
            this.cursorPreview.style.backgroundColor = this.currentColor + '40';
            this.cursorPreview.style.display = 'block';

            // If drawing - draw
            if (this.isDrawing) {
                if (this.currentMode === 'fill') {
                    // Fill mode - fill area
                    this.saveState();
                    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
                    const data = imageData.data;
                    const index = (pixelY * this.canvas.width + pixelX) * 4;
                    const targetColor = '#' +
                        ('00' + data[index].toString(16)).slice(-2) +
                        ('00' + data[index + 1].toString(16)).slice(-2) +
                        ('00' + data[index + 2].toString(16)).slice(-2);

                    this.floodFill(pixelX, pixelY, targetColor, this.currentColor);
                    this.isDrawing = false; // Complete drawing after fill
                } else {
                    if (this.lastX === -1 || this.lastY === -1) {
                        // First click or start drawing
                        this.drawPixel(pixelX, pixelY);
                    } else {
                        // Interpolate line between previous and current position
                        this.drawLine(this.lastX, this.lastY, pixelX, pixelY);
                    }

                    // Save current position as previous
                    this.lastX = pixelX;
                    this.lastY = pixelY;
                }
            }
        } else {
            this.cursorPreview.style.display = 'none';
        }
    }

    drawLine(lastX, lastY, currentX, currentY) {
        const dx = currentX - lastX;
        const dy = currentY - lastY;
        const steps = Math.max(Math.abs(dx), Math.abs(dy));

        if (steps === 0) return;

        const xIncrement = dx / steps;
        const yIncrement = dy / steps;

        let x = lastX;
        let y = lastY;

        for (let i = 0; i <= steps; i++) {
            this.drawPixel(Math.round(x), Math.round(y));
            x += xIncrement;
            y += yIncrement;
        }
    }

    drawPixel(pixelX, pixelY) {
        const size = parseInt(this.currentSize);

        if (this.currentMode === 'brush') {
            this.ctx.fillStyle = this.currentColor;
        } else {
            // Eraser mode - set white color
            this.ctx.fillStyle = '#ffffff';
        }

        for (let dx = 0; dx < size; dx++) {
            for (let dy = 0; dy < size; dy++) {
                const px = pixelX - Math.floor((size - 1) / 2) + dx;
                const py = pixelY - Math.floor((size - 1) / 2) + dy;

                if (px >= 0 && px < this.canvas.width && py >= 0 && py < this.canvas.height) {
                    this.ctx.fillRect(px, py, 1, 1);
                }
            }
        }
    }

    stopDrawing() {
        this.isDrawing = false;
        this.lastX = -1;
        this.lastY = -1;
    }

    clearCanvas() {
        if (confirm('Clear canvas?')) {
            this.saveState();
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    saveImage() {
        const link = document.createElement('a');
        link.download = `pixel-art-${Date.now()}.png`;
        link.href = this.canvas.toDataURL();
        link.click();

        console.log(link.href);
    }

    uploadImage() {

        if (confirm('do you want to upload the drawing to my website? (it will be shown here at the bottom of the page)')) {

            let userName = prompt('Your name:');
            let userSite = prompt('Your site: (optional)');
            let userArt = this.canvas.toDataURL();

            async function submitForm(userName, userSite, userArt) {
                const actionUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfS-P2p4G13K9JN5PFDeQOg8ONU0rkYkXMJkSinpOWfrTEihg/formResponse";

                const formData = new FormData();
                formData.append('entry.2146595141', userName);
                formData.append('entry.111079713', userSite);
                formData.append('entry.1928160295', userArt);

                await fetch(actionUrl, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors'
                });

            }

            submitForm(userName, userSite, userArt);
            alert('Successfully sent! Your drawing appeared after moderation (I check it every day)')

        }

    }

    zoomIn() {
        this.canvas.style.width = (this.curCanvasSizeW + this.zoomSize) + 'px';
        this.canvas.style.height = (this.curCanvasSizeH + this.zoomSize) + 'px';

        this.curCanvasSizeW += this.zoomSize;
        this.curCanvasSizeH += this.zoomSize;
    }

    zoomOut() {
        this.canvas.style.width = (this.curCanvasSizeW - this.zoomSize) + 'px';
        this.canvas.style.height = (this.curCanvasSizeH - this.zoomSize) + 'px';

        this.curCanvasSizeW -= this.zoomSize;
        this.curCanvasSizeH -= this.zoomSize;

    }

    zoomFit() {
        this.canvas.style.width = this.StandartCanvasSizeW + 'px';
        this.canvas.style.height = this.StandartCanvasSizeH + 'px';

        this.curCanvasSizeW = this.StandartCanvasSizeW;
        this.curCanvasSizeH = this.StandartCanvasSizeW;

    }

    updatePreview() {
        // Clear preview
        this.previewCtx.fillStyle = '#ffffff';
        this.previewCtx.fillRect(0, 0, 30, 30);

        // Draw brush, eraser or fill
        const size = parseInt(this.currentSize);
        const scale = 30 / 80; // Preview scale

        // Preview center
        const centerX = 15;
        const centerY = 15;
        const halfSize = Math.floor(size / 2);

        if (this.currentMode === 'brush') {
            // Brush mode - draw with color
            this.previewCtx.fillStyle = this.currentColor;
            for (let dx = 0; dx < size; dx++) {
                for (let dy = 0; dy < size; dy++) {
                    const px = centerX - Math.floor((size - 1) / 2) * scale + dx * scale;
                    const py = centerY - Math.floor((size - 1) / 2) * scale + dy * scale;
                    this.previewCtx.fillRect(px, py, scale, scale);
                }
            }
        } else if (this.currentMode === 'eraser') {
            // Eraser mode - draw white with border
            this.previewCtx.fillStyle = '#ffffff';
            this.previewCtx.strokeStyle = '#999999';
            this.previewCtx.lineWidth = 1;

            for (let dx = 0; dx < size; dx++) {
                for (let dy = 0; dy < size; dy++) {
                    const px = centerX - Math.floor((size - 1) / 2) * scale + dx * scale;
                    const py = centerY - Math.floor((size - 1) / 2) * scale + dy * scale;
                    this.previewCtx.fillRect(px, py, scale, scale);
                    this.previewCtx.strokeRect(px, py, scale, scale);
                }
            }
        } else if (this.currentMode === 'fill') {
            // Fill mode - draw droplet
            this.previewCtx.fillStyle = this.currentColor;
            this.previewCtx.beginPath();
            this.previewCtx.moveTo(centerX, centerY - 5);
            this.previewCtx.quadraticCurveTo(centerX + 5, centerY + 5, centerX, centerY + 10);
            this.previewCtx.quadraticCurveTo(centerX - 5, centerY + 5, centerX, centerY - 5);
            this.previewCtx.fill();

            // Add outline
            this.previewCtx.strokeStyle = '#333333';
            this.previewCtx.lineWidth = 1;
            this.previewCtx.stroke();
        }
    }

    // Save canvas state
    saveState() {
        // Clear redo stack on new action
        this.redoStack = [];

        // Save current state
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.undoStack.push(imageData);

        // Limit stack size (e.g., 50 steps)
        if (this.undoStack.length > 50) {
            this.undoStack.shift();
        }
    }

    // Undo action
    undo() {
        if (this.undoStack.length > 1) {
            // Save current state to redo stack
            const currentImage = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            this.redoStack.push(currentImage);

            // Restore previous state
            const previousImage = this.undoStack.pop();
            this.ctx.putImageData(previousImage, 0, 0);
        }
    }

    // Redo action
    redo() {
        if (this.redoStack.length > 0) {
            // Save current state to undo stack
            const currentImage = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            this.undoStack.push(currentImage);

            // Restore next state
            const nextImage = this.redoStack.pop();
            this.ctx.putImageData(nextImage, 0, 0);
        }
    }

    // Handle keyboard shortcuts
    handleKeydown(e) {
        // Check if Ctrl is pressed and user is not typing text
        if (e.ctrlKey && !e.altKey && !e.shiftKey) {
            if (e.key.toLowerCase() === 'z') {
                e.preventDefault();
                this.undo();
            }
        }

        if (e.ctrlKey && !e.altKey && e.shiftKey) {
            if (e.key.toLowerCase() === 'z') {
                e.preventDefault();
                this.redo();
            }
        }

        // Brush size control
        if (!e.ctrlKey && !e.altKey) {
            if (e.key === '-' || e.key === 'Minus') {
                e.preventDefault();
                this.changeBrushSize(-1);
            } else if (e.key === '=' || e.key === 'Equal') {
                e.preventDefault();
                this.changeBrushSize(1);
            } else if (e.key === '[') {
                e.preventDefault();
                this.changeBrushSize(-1);
            } else if (e.key === ']') {
                e.preventDefault();
                this.changeBrushSize(1);
            }
        }
    }

    // Change brush size
    changeBrushSize(delta) {
        const currentSize = parseInt(this.currentSize);
        const newSize = Math.max(1, Math.min(20, currentSize + delta));

        this.currentSize = newSize;
        this.brushSize.value = newSize;
        this.sizeValue.textContent = newSize;
        this.updatePreview();
    }

    // Flood fill algorithm
    floodFill(startX, startY, targetColor, replacementColor) {
        // Get image data
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;

        // Check if fill color matches target color
        if (targetColor === replacementColor) {
            return;
        }

        // Create queue for traversal
        const queue = [];
        queue.push({ x: startX, y: startY });

        // Pixel at position (x, y) has index in data array: (y * width + x) * 4
        const getIndex = (x, y) => (y * this.canvas.width + x) * 4;

        // Target color components
        const targetR = parseInt(targetColor.slice(1, 3), 16);
        const targetG = parseInt(targetColor.slice(3, 5), 16);
        const targetB = parseInt(targetColor.slice(5, 7), 16);

        // Replacement color components
        const replaceR = parseInt(replacementColor.slice(1, 3), 16);
        const replaceG = parseInt(replacementColor.slice(3, 5), 16);
        const replaceB = parseInt(replacementColor.slice(5, 7), 16);

        while (queue.length > 0) {
            const { x, y } = queue.shift();
            const index = getIndex(x, y);

            // Check if pixel is within canvas bounds
            if (x < 0 || x >= this.canvas.width || y < 0 || y >= this.canvas.height) {
                continue;
            }

            // Check if pixel color matches target color
            if (data[index] === targetR && data[index + 1] === targetG && data[index + 2] === targetB) {
                // Fill pixel
                data[index] = replaceR;
                data[index + 1] = replaceG;
                data[index + 2] = replaceB;

                // Add neighboring pixels to queue
                queue.push({ x: x + 1, y: y });
                queue.push({ x: x - 1, y: y });
                queue.push({ x: x, y: y + 1 });
                queue.push({ x: x, y: y - 1 });
            }
        }

        // Update canvas
        this.ctx.putImageData(imageData, 0, 0);
    }

    // Switch modes
    setMode(mode) {
        this.currentMode = mode;

        // Update button visual state
        this.brushBtn.classList.remove('active');
        this.eraserBtn.classList.remove('active');
        this.fillBtn.classList.remove('active');

        if (mode === 'brush') {
            this.brushBtn.classList.add('active');
        } else if (mode === 'eraser') {
            this.eraserBtn.classList.add('active');
        } else if (mode === 'fill') {
            this.fillBtn.classList.add('active');
        }

        // Update preview
        this.updatePreview();
    }

}

// Launch application
document.addEventListener('DOMContentLoaded', () => {
    new PixelPaint();
});