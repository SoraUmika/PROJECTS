import { CSSProperties } from 'react';
import { StringObject } from './types';

export default class CSS {
	static trans = (percent: number, base: string = '0,0,0'): string => 'rgba(' + base + ',' + percent + ')';

	private static bdF = (name: string, { all, left, right, top, bottom }: BorderOption): CSSProperties => {
		let style: StringObject<string | number> = {};
		all ? (style[name] = all) : null;
		left ? (style[name + 'Left'] = left) : null;
		right ? (style[name + 'Right'] = right) : null;
		top ? (style[name + 'Top'] = top) : null;
		bottom ? (style[name + 'Bottom'] = bottom) : null;
		return style;
	};

	private static ctF = (name: string, { toggle, color }: ColorToggleOption): CSSProperties => {
		return toggle
			? {
					[name]: color
				}
			: {};
	};

	static fullW: CSSProperties = {
		width: '100%'
	};

	static fullH: CSSProperties = {
		height: '100%'
	};

	static absolute: CSSProperties = {
		position: 'absolute'
	};

	static appBar: CSSProperties = {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		height: '100%'
	};

	static pointer = (toggle: boolean): CSSProperties => ({
		cursor: toggle ? 'pointer' : 'default'
	});

	static roundEdgeNav = (arg: Unit): CSSProperties => ({
		borderTopRightRadius: arg,
		borderBottomRightRadius: arg
	});

	static roundEdgePanel = (arg: Unit): CSSProperties => ({
		borderBottomLeftRadius: arg,
		borderBottomRightRadius: arg
	});

	static roundEdge = (arg: Unit): CSSProperties => ({
		borderRadius: arg
	});

	static border = (arg: string): CSSProperties => ({
		border: arg
	});

	static divider = (height: Unit): CSSProperties => ({
		width: '1px',
		height: height,
		margin: 4
	});

	static size = ({ width, height }: SizeOption): CSSProperties => ({
		width: width,
		height: height
	});

	static margin = (arg: BorderOption): CSSProperties => CSS.bdF('margin', arg);

	static padding = (arg: BorderOption): CSSProperties => CSS.bdF('padding', arg);

	static toggleBg = (arg: ColorToggleOption): CSSProperties => CSS.ctF('backgroundColor', arg);

	static toggleColor = (arg: ColorToggleOption): CSSProperties => CSS.ctF('color', arg);

	static indicator = ({ toggle, color }: ColorToggleOption): CSSProperties => ({
		width: '4px',
		position: 'absolute',
		left: '0px',
		height: '100%',
		backgroundColor: toggle ? color : undefined
	});

	static float = (direction: FloatType): CSSProperties => ({
		float: direction
	});

	static bg = (color: string): CSSProperties => ({
		backgroundColor: color
	});

	static font = ({ size, weight, color, align }: FontOption): CSSProperties => ({
		fontSize: size,
		fontWeight: weight,
		color: color,
		textAlign: align
	});

	static pos = ({ left, right, top, bottom }: PosOption): CSSProperties => ({
		left: left,
		right: right,
		top: top,
		bottom: bottom
	});

	static transition = (num: number): CSSProperties => ({
		transition: num + 's'
	});

	static zIndex = (num: number): CSSProperties => ({
		zIndex: num
	});

	private static other = (arg: CSSProperties) => arg;

	private static CSSMap: StringObject<CSSProperties> = {
		fullW: CSS.fullW,
		fullH: CSS.fullH,
		absolute: CSS.absolute,
		appBar: CSS.appBar
	};

	private static ArgMap: StringObject<(arg: boolean | Unit | AnyOptions) => CSSProperties> = {
		pointer: CSS.pointer,
		roundEdgeNav: CSS.roundEdgeNav,
		roundEdgePanel: CSS.roundEdgePanel,
		roundEdge: CSS.roundEdge,
		float: CSS.float,
		bg: CSS.bg,
		divider: CSS.divider,
		size: CSS.size,
		margin: CSS.margin,
		padding: CSS.padding,
		toggleBg: CSS.toggleBg,
		toggleColor: CSS.toggleColor,
		indicator: CSS.indicator,
		font: CSS.font,
		pos: CSS.pos,
		transition: CSS.transition,
		border: CSS.border,
		other: CSS.other,
		zIndex: CSS.zIndex
	};

	static multi = (option: MultiStylesOption, ...others: CSSProperties[]): CSSProperties => {
		let styles: CSSProperties[] = Object.keys(option).map((key: string): CSSProperties => {
			if (key in CSS.CSSMap) {
				return CSS.CSSMap[key];
			} else {
				return CSS.ArgMap[key](option[key]);
			}
		});
		return Object.assign({}, ...styles, ...others);
	};
}

type Globals = '-moz-initial' | 'inherit' | 'initial' | 'revert' | 'unset';
type MultiStylesOption = {
	fullW?: boolean;
	fullH?: boolean;
	absolute?: boolean;
	appBar?: boolean;
	pointer?: boolean;
	transition?: number;
	roundEdgeNav?: Unit;
	roundEdgePanel?: Unit;
	roundEdge?: Unit;
	divider?: SizeOption;
	size?: SizeOption;
	margin?: BorderOption;
	padding?: BorderOption;
	toggleBg?: ColorToggleOption;
	toggleColor?: ColorToggleOption;
	indicator?: ColorToggleOption;
	float?: FloatType;
	bg?: string;
	font?: FontOption;
	pos?: PosOption;
	border?: string;
	other?: CSSProperties;
	zIndex?: number;
} & StringObject<any>;
type SizeOption = {
	width?: Unit;
	height?: Unit;
};
type BorderOption = {
	all?: Unit;
	left?: Unit;
	right?: Unit;
	top?: Unit;
	bottom?: Unit;
};
type ColorToggleOption = {
	toggle: boolean;
	color: string;
};
type FontOption = {
	size?: Unit;
	weight?: FontWeightTypes;
	color?: string;
	align?: Globals | 'center' | 'end' | 'justify' | 'left' | 'match-parent' | 'right' | 'start';
};
type PosOption = {
	left?: Unit;
	right?: Unit;
	top?: Unit;
	bottom?: Unit;
};

type Unit = string | number;
type FontWeightTypes =
	| '-moz-initial'
	| 'inherit'
	| 'initial'
	| 'revert'
	| 'unset'
	| 'bold'
	| 'normal'
	| number
	| 'bolder'
	| 'lighter';
type FloatType = 'left' | 'right';
type AnyOptions = SizeOption | BorderOption | ColorToggleOption | FontOption | PosOption;
