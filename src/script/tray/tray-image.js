'use strict';

class TrayImage {
  constructor(size, number) {
    this.size = size;
    this.number = number;

    this.fontFamily = 'sans-serif';
    this.fontSize = this.size / 2;
    this.font = `bold ${this.fontSize}px ${this.fontFamily}`;
    this.fontHeight = this.getFontHeight();

    this.circlePadding = this.fontHeight / 7;
    this.circleRadius = (this.fontHeight / 2) + this.circlePadding;
    this.circleCenter = this.size - this.circleRadius;

    this.ready = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });

    this.draw();
  }

  getFontHeight() {
    const span = document.createElement('span');

    span.style.font = this.font;
    span.style['line-height'] = 1;
    span.textContent = '3';

    document.body.appendChild(span);
    const fontHeight = span.offsetHeight;
    document.body.removeChild(span);

    return fontHeight;
  }

  draw() {
    this.createCanvas();
    this.loadImage()
      .then(() => {
        this.drawBackgroundImage();

        if (this.number > 0) {
          this.drawCircle();
          this.drawNumber();
        }

        this.resolve();
      });
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.context = this.canvas.getContext('2d');
  }

  loadImage() {
    return new Promise((resolve) => {
      this.backgroundImage = new Image();
      this.backgroundImage.addEventListener('load', () => {
        resolve();
      }, false);
      this.backgroundImage.src = './image/slack-sticker-64.png';
    });
  }

  drawBackgroundImage() {
    this.context.drawImage(this.backgroundImage, 0, 0, this.size, this.size);
  }

  drawCircle() {
    this.context.beginPath();
    this.context.arc(
      this.circleCenter, this.circleCenter,
      this.circleRadius,
      0, 2 * Math.PI,
      false
    );
    this.context.fillStyle = 'darkred';
    this.context.fill();
  }

  drawNumber() {
    this.context.font = `${this.fontSize}px sans-serif`;

    const textMetrics = this.context.measureText(this.number);
    const x = this.circleCenter - (textMetrics.width / 2);
    const y = this.size - (2 * this.circlePadding);

    this.context.fillStyle = 'white';
    this.context.fillText(this.number, x, y);
  }

  getData(cb) {
    this.ready.then(() => {
      cb(this.canvas.toDataURL('image/png'));
    });
  }
}

module.exports = TrayImage;
