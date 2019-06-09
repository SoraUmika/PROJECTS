class MouseListener {
	mouseDown: boolean = false;

	constructor(moveCb: (dx: number, dy: number) => void, scrollCb: (dz: number) => void) {
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
