class Environment {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.#addEventListeners();

    this.segments = [];
    this.rectangles = [];
    this.circles = [];

    this.style = {
      color: "black",
      width: 2,
    };

    this.state = {
      drawingOn: false,
      selectedTool: "pencil",
      lastMouse: null,
      currentlyAddingSegment: null,
      currentlyAddingRectangle: null,
      currentlyAddingCirlce: null,
      shapesFilled: true
    };
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
    for (const seg of this.segments) {
      seg.draw(this.ctx);
    }

    for (const rec of this.rectangles) {
      rec.draw(this.ctx);
    }

    for (const circ of this.circles) {
      circ.draw(this.ctx);
    }

    this.state.currentlyAddingSegment &&
      this.state.currentlyAddingSegment.draw(this.ctx);
    this.state.currentlyAddingRectangle &&
      this.state.currentlyAddingRectangle.draw(this.ctx);
    this.state.currentlyAddingCirlce &&
      this.state.currentlyAddingCirlce.draw(this.ctx);
  }

  changeWidth(width) {
    this.style.width = width;
  }

  changeColor(color) {
    this.style.color = color;
  }

  changeTool(tool) {
    this.state.selectedTool = tool;
  }

  fillShapes(){
    this.state.shapesFilled = !this.state.shapesFilled
  }

  clearEnvironment() {
    this.segments = [];
    this.rectangles = [];
    this.circles = [];
  }

  download() {
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = document.querySelector("canvas").toDataURL();
    link.click();
    link.remove();
  }

  #addEventListeners() {

    this.canvas.addEventListener("mousedown", (e) => {
      this.state.drawingOn = true;
      this.state.lastMouse = new Point(e);
    });

    this.canvas.addEventListener("mousemove", (e) => {
      const style = { width: this.style.width, color: this.style.color };

      if (this.state.drawingOn) {
        switch (this.state.selectedTool) {
          case "circle":
            this.state.currentlyAddingCirlce = new Circle(
              this.state.lastMouse,
              new Point(e),
              {...style, shapesFilled:this.state.shapesFilled}
            );
            break;
          case "rectangle":
            this.state.currentlyAddingRectangle = new Rectangle(
              this.state.lastMouse,
              new Point(e),
              {...style, shapesFilled:this.state.shapesFilled}
            );
            break;
          case "segment":
            this.state.currentlyAddingSegment = new Segment(
              this.state.lastMouse,
              new Point(e),
              style
            );
            break;
          case "pencil":
            this.segments.push(
              new Pencil(new Point(e), style).draw(this.state.lastMouse)
            );
            break;
        }
        if (this.state.selectedTool == "pencil") {
          this.state.lastMouse = new Point(e);
        }
      }
    });

    this.canvas.addEventListener("mouseup", () => {
      this.state.drawingOn = false;
      this.state.lastMouse = null;
      this.state.firstSegmentPoint = null;
      if (this.state.selectedTool == "segment") {
        const seg = this.state.currentlyAddingSegment
        seg && this.segments.push(seg);
        this.state.currentlyAddingSegment = null;
      }
      if (this.state.selectedTool == "rectangle") {
        const rect = this.state.currentlyAddingRectangle
        rect && this.rectangles.push(rect)
        this.state.currentlyAddingRectangle = null;
      }
      if (this.state.selectedTool == "circle") {
        const circ = this.state.currentlyAddingCirlce
        circ && this.circles.push(circ);
        this.state.currentlyAddingCirlce = null;
      }
    });
  }
}
