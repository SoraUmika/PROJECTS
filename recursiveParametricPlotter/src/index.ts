/// <reference path="controller.ts"/>
/// <reference path="mouseListener.ts"/>

const T = -0.15;
const DT = 0.000000001;
const ZOOM = 250;
const DZOOM = 0.5;
const SHIFT: [number, number] = [0, 0];

let xFunc = "-x^2+y^2+t^2-x*y+y*t-t";
let yFunc = "y^2-x+t";
let pointNum = 100;

const SKETCH = (p: p5) => {
	let controller = new Controller(
		p,
		xFunc,
		yFunc,
		T,
		ZOOM,
		DT,
		DZOOM,
		p.createVector(...SHIFT),
		pointNum
	);
	controller.update();

	p.setup = () => {
		p.createCanvas(p.windowWidth, p.windowHeight);
		p.stroke(255);
		p.strokeWeight(1);
		p.textSize(15);
		new MouseListener(controller.setShift, controller.setZoom);

		let pointNumInp = p.createInput("", "number").position(0, 0);
		p.createButton("set number of points").mousePressed(() => {
			let val = parseInt(pointNumInp.value() as string);
			if (val && val > 0){
				pointNum = val;
				controller.reset(val, null, null);
			}else{
				alert("Invalid positive non-zero int value: " + val);
			}
		}).position(173, 0);

		let tInp = p.createInput("", "number").position(0, 20);
		p.createButton("set time").mousePressed(() => {
			let val = parseFloat(tInp.value() as string);
			if (val){
				controller.setTime(val);
			}else{
				alert("Invalid float value: " + val);
			}
		}).position(173, 20);

		let dtInp = p.createInput("", "number").position(0, 40);
		p.createButton("set delta time").mousePressed(() => {
			let val = parseFloat(dtInp.value() as string);
			if (val){
				controller.setDeltaT(val);
			}else{
				alert("Invalid float value: " + val);
			}
		}).position(173, 40);

		let xFuncInp = p.createInput("", "text").position(0, 60);
		p.createButton("set x function").mousePressed(() => {
			let val = xFuncInp.value() as string, xEval: math.EvalFunction;
			if (val){
				try{
					xEval = math.compile(val);
					xEval.eval({x: 0, y: 0, t:0});
					xFunc = val;
				} catch (error){
					xEval = null;
					alert(error);
				} finally{
					controller.reset(pointNum, xEval, null);
				}
			}
		}).position(173, 60);

		let yFuncInp = p.createInput("", "text").position(0, 80);
		p.createButton("set y function").mousePressed(() => {
			let val = yFuncInp.value() as string, yEval: math.EvalFunction;
			if (val){
				try{
					yEval = math.compile(val);
					yEval.eval({x: 0, y: 0, t:0});
					yFunc = val;
				} catch (error){
					yEval = null;
					alert(error);
				} finally{
					controller.reset(pointNum, null, yEval);
				}
			}
		}).position(173, 80);

		let dZoomInp = p.createInput("", "number").position(0, 100);
		p.createButton("set delta zoom").mousePressed(() => {
			let val = parseFloat(dZoomInp.value() as string);
			if (val && val > 0){
				controller.setDeltaZoom(val);
			}else{
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
