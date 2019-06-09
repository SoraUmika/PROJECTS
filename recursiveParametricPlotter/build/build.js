class Trail {
    constructor(p) {
        this.p = p;
        this.record = [];
    }
    update(v) {
        this.record.push(v);
        if (this.record.length > 50) {
            this.record.splice(0, 1);
        }
    }
    draw() {
        let x1, y1, x2, y2;
        let alpha = 0;
        for (let i = 0; i < this.record.length - 1; i++) {
            [x1, y1] = this.record[i].array();
            [x2, y2] = this.record[i + 1].array();
            this.p.stroke(255, alpha);
            this.p.line(x1, y1, x2, y2);
            alpha += 5;
        }
        this.p.stroke(255);
    }
}
class Point {
    constructor(p, zoom, shift) {
        this.p = p;
        this.zoom = zoom;
        this.shift = shift;
        this.trail = new Trail(p);
    }
    update(v) {
        this.applyTransformation(v);
        this.coord = v;
        this.trail.update(v);
    }
    applyTransformation(v) {
        v.mult(this.zoom);
        v.add(this.p.windowWidth / 2, this.p.windowHeight / 2);
        v.add(this.shift);
    }
    draw(enableTrail) {
        const [x, y] = this.coord.array();
        this.p.point(x, y);
        if (enableTrail) {
            this.trail.draw();
        }
    }
    setZoom(n) {
        this.zoom = n;
    }
    setShift(v) {
        this.shift = v;
    }
}
class Controller {
    constructor(p, xFunc, yFunc, t, zoom, tInc, zoomInc, shift, pointNum) {
        this.p = p;
        this.t = t;
        this.zoom = zoom;
        this.tInc = tInc;
        this.zoomInc = zoomInc;
        this.shift = shift;
        this.points = [];
        this.enableTrail = false;
        this.setShift = (dx, dy) => {
            this.shift.add(dx, dy);
            this.points.forEach(i => i.setShift(this.shift));
        };
        this.setZoom = (dz) => {
            let newZoom = this.zoom + this.zoomInc * dz;
            if (newZoom > 0) {
                this.points.forEach(i => i.setZoom(newZoom));
                this.zoom = newZoom;
            }
        };
        this.setDeltaT = (dt) => {
            this.tInc = dt;
        };
        this.setTime = (t) => {
            this.t = t;
        };
        this.setDeltaZoom = (dz) => {
            this.zoomInc = dz;
        };
        this.reset = (pointNum, xEval, yEval) => {
            this.points = [];
            for (let n = 0; n < pointNum; n++) {
                this.points.push(new Point(this.p, this.zoom, this.shift));
            }
            this.xEval = xEval ? xEval : this.xEval;
            this.yEval = yEval ? yEval : this.yEval;
            this.update();
        };
        this.toggleTrail = () => {
            this.enableTrail = !this.enableTrail;
        };
        for (let n = 0; n < pointNum; n++) {
            this.points.push(new Point(this.p, zoom, shift));
        }
        this.xEval = math.compile(xFunc);
        this.yEval = math.compile(yFunc);
        this.update();
    }
    update() {
        let scope = {
            x: this.t,
            y: this.t,
            t: this.t
        };
        this.points.forEach(point => {
            scope = {
                x: this.xEval.eval(scope),
                y: this.yEval.eval(scope),
                t: scope.t
            };
            point.update(this.p.createVector(scope.x, scope.y));
        });
        this.t += this.tInc;
    }
    draw() {
        this.points.forEach(i => i.draw(this.enableTrail));
    }
}
class MouseListener {
    constructor(moveCb, scrollCb) {
        this.mouseDown = false;
        let el = document.getElementById("defaultCanvas0");
        el.onmousedown = () => {
            this.mouseDown = true;
        };
        el.onmousemove = ev => {
            if (this.mouseDown) {
                moveCb(ev.movementX, ev.movementY);
            }
        };
        el.onmouseup = () => {
            this.mouseDown = false;
        };
        el.onwheel = ev => {
            scrollCb(ev.deltaY > 0 ? -1 : 1);
        };
    }
}
const T = -0.15;
const DT = 0.000000001;
const ZOOM = 250;
const DZOOM = 0.5;
const SHIFT = [0, 0];
let xFunc = "-x^2+y^2+t^2-x*y+y*t-t";
let yFunc = "y^2-x+t";
let pointNum = 100;
const SKETCH = (p) => {
    let controller = new Controller(p, xFunc, yFunc, T, ZOOM, DT, DZOOM, p.createVector(...SHIFT), pointNum);
    controller.update();
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.stroke(255);
        p.strokeWeight(1);
        p.textSize(15);
        new MouseListener(controller.setShift, controller.setZoom);
        let pointNumInp = p.createInput("", "number").position(0, 0);
        p.createButton("set number of points").mousePressed(() => {
            let val = parseInt(pointNumInp.value());
            if (val && val > 0) {
                pointNum = val;
                controller.reset(val, null, null);
            }
            else {
                alert("Invalid positive non-zero int value: " + val);
            }
        }).position(173, 0);
        let tInp = p.createInput("", "number").position(0, 20);
        p.createButton("set time").mousePressed(() => {
            let val = parseFloat(tInp.value());
            if (val) {
                controller.setTime(val);
            }
            else {
                alert("Invalid float value: " + val);
            }
        }).position(173, 20);
        let dtInp = p.createInput("", "number").position(0, 40);
        p.createButton("set delta time").mousePressed(() => {
            let val = parseFloat(dtInp.value());
            if (val) {
                controller.setDeltaT(val);
            }
            else {
                alert("Invalid float value: " + val);
            }
        }).position(173, 40);
        let xFuncInp = p.createInput("", "text").position(0, 60);
        p.createButton("set x function").mousePressed(() => {
            let val = xFuncInp.value(), xEval;
            if (val) {
                try {
                    xEval = math.compile(val);
                    xEval.eval({ x: 0, y: 0, t: 0 });
                    xFunc = val;
                }
                catch (error) {
                    xEval = null;
                    alert(error);
                }
                finally {
                    controller.reset(pointNum, xEval, null);
                }
            }
        }).position(173, 60);
        let yFuncInp = p.createInput("", "text").position(0, 80);
        p.createButton("set y function").mousePressed(() => {
            let val = yFuncInp.value(), yEval;
            if (val) {
                try {
                    yEval = math.compile(val);
                    yEval.eval({ x: 0, y: 0, t: 0 });
                    yFunc = val;
                }
                catch (error) {
                    yEval = null;
                    alert(error);
                }
                finally {
                    controller.reset(pointNum, null, yEval);
                }
            }
        }).position(173, 80);
        let dZoomInp = p.createInput("", "number").position(0, 100);
        p.createButton("set delta zoom").mousePressed(() => {
            let val = parseFloat(dZoomInp.value());
            if (val && val > 0) {
                controller.setDeltaZoom(val);
            }
            else {
                alert("Invalid positive non-zero float value: " + val);
            }
        }).position(173, 100);
        p.createButton("toggle trail").mouseClicked(controller.toggleTrail).position(0, 120);
    };
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = () => {
        p.background(0);
        controller.draw();
        controller.update();
        p.noStroke();
        let text = `
		x_func = ${xFunc}
		y_func = ${yFunc}
		time = ${controller.t}
		delta_time = ${controller.tInc}
		zoom = ${controller.zoom}
		delta_zoom = ${controller.zoomInc}
		num_of_points = ${pointNum}
		`;
        p.text(text, 5, 160);
        p.fill(0, 255, 0);
        p.stroke(255);
    };
};
var sketchP = new p5(SKETCH);
//# sourceMappingURL=build.js.map