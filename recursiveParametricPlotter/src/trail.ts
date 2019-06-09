class Trail {
    record: p5.Vector[] = [];

	constructor(public p: p5) {}

	update(v: p5.Vector) {
        this.record.push(v);
        if (this.record.length > 50){
            this.record.splice(0, 1);
        }
	}

	draw() {
        let x1, y1, x2, y2;
        let alpha = 0;
		for (let i = 0; i < this.record.length - 1; i++){
            [x1, y1] = this.record[i].array();
            [x2, y2] = this.record[i + 1].array();
            this.p.stroke(255, alpha);
            this.p.line(x1, y1, x2, y2);
            alpha += 5;
        }
        this.p.stroke(255);
	}
}
