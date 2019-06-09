/// <reference path="point.ts"/>

class Controller {
	points: Point[] = [];
	xEval: math.EvalFunction;
	yEval: math.EvalFunction;
	enableTrail: boolean = false;

	constructor(
		public p: p5,
		xFunc: string,
		yFunc: string,
		public t: number,
		public zoom: number,
		public tInc: number,
		public zoomInc: number,
		public shift: p5.Vector,
		pointNum: number
	) {
		for (let n = 0; n < pointNum; n++) {
			this.points.push(new Point(this.p, zoom, shift));
		}
		this.xEval = math.compile(xFunc);
		this.yEval = math.compile(yFunc);
		this.update();
	}

	update() {
		// console.log(this.t);
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

	setShift = (dx: number, dy: number) => {
		this.shift.add(dx, dy);
		this.points.forEach(i => i.setShift(this.shift));
	};

	setZoom = (dz: number) => {
		let newZoom = this.zoom + this.zoomInc * dz;
		if (newZoom > 0) {
			this.points.forEach(i => i.setZoom(newZoom));
			this.zoom = newZoom;
		}
	};

	setDeltaT = (dt: number) => {
		this.tInc = dt;
	}

	setTime = (t: number) => {
		this.t = t;
	}

	setDeltaZoom = (dz: number) => {
		this.zoomInc = dz;
	}

	reset = (pointNum: number, xEval: math.EvalFunction, yEval: math.EvalFunction) => {
		this.points = [];
		for (let n = 0; n < pointNum; n++) {
			this.points.push(new Point(this.p, this.zoom, this.shift));
		}
		this.xEval = xEval ? xEval : this.xEval;
		this.yEval = yEval ? yEval : this.yEval;
		this.update();
	}

	toggleTrail = () => {
		this.enableTrail = !this.enableTrail;
	}
}
