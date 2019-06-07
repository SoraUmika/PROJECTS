import { StringObject } from '../../types';

type ThemeType = {
	colorMain: string;
	transMain: string;
	colorBgPrime: string;
	colorBgSecond: string;
} & StringObject<any>;

export default ThemeType;
