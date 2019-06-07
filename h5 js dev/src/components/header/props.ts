import { Nullable } from '../../types';
import Action from '../../redux/types/actionTypes';

export type SystemState = {
	settDialogOpen: boolean;
};

export type SystemFunc = {
	openSettDialog: () => Action;
	closeSettDialog: () => Action;
};
