class Point {
  constructor(e) {
    this.x = e.offsetX;
    this.y = e.offsetY;
  }
}

class Segment {
  constructor(p1, p2, style) {
    this.p1 = p1;
    this.p2 = p2;
    this.style = style;
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.strokeStyle = this.style.color;
    ctx.lineWidth = this.style.width;
    ctx.lineCap='round'
    ctx.lineJoin='round'
    ctx.stroke();
    ctx.restore();
  }
}

class Pencil {
  constructor(mouse, style) {
    this.mouse = mouse;
    this.style = style;
  }

  draw(lastMouse) {
    if (lastMouse) {
      const seg = new Segment(this.mouse, lastMouse, this.style);
      return seg;
    }
  }
}

class Circle {
  constructor(initialMouse, lastMouse, style) {
    this.initialMouse = initialMouse;
    this.style = style;
    this.lastMouse = lastMouse;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.initialMouse.x,
      this.initialMouse.y,
      Math.hypot(
        this.initialMouse.x - this.lastMouse.x,
        this.initialMouse.y - this.lastMouse.y
      ),
      0,
      Math.PI * 2
    );
    ctx.strokeStyle = this.style.color;
    ctx.lineWidth = this.style.width;
    ctx.stroke();
    if(this.style.shapesFilled){
      ctx.fillStyle = this.style.color
      ctx.fill()
    }
  }
}

class Rectangle {
  constructor(initialMouse, lastMouse, style) {
    this.initialMouse = initialMouse;
    this.style = style;
    this.lastMouse = lastMouse;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.initialMouse.x,
      this.initialMouse.y,
      this.lastMouse.x - this.initialMouse.x,
      this.lastMouse.y - this.initialMouse.y
    );
    ctx.strokeStyle = this.style.color;
    ctx.lineWidth = this.style.width;
    ctx.stroke();
    if(this.style.shapesFilled){
      ctx.fillStyle = this.style.color
      ctx.fill()
    }
  }
}
