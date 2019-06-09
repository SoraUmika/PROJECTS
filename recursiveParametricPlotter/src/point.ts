/// <reference path="trail.ts"/>

class Point {
	coord: p5.Vector;
	trail: Trail;

	constructor(public p: p5, public zoom: number, public shift: p5.Vector) {
		this.trail = new Trail(p);
	}

	update(v: p5.Vector) {
		this.applyTransformation(v);
		this.coord = v;
		this.trail.update(v);
	}

	applyTransformation(v: p5.Vector) {
		v.mult(this.zoom);
		v.add(this.p.windowWidth / 2, this.p.windowHeight / 2);
		v.add(this.shift);
	}

	draw(enableTrail: boolean) {
		const [ x, y ] = this.coord.array();
		this.p.point(x, y);
		if (enableTrail){
			this.trail.draw();
		}
	}

	setZoom(n: number) {
		this.zoom = n;
	}

	setShift(v: p5.Vector) {
		this.shift = v;
	}
}
