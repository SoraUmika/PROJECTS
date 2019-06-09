import Action from '../../redux/types/actionTypes';
import UserType from '../../redux/types/userType';

export type SystemState = {
	settDialogOpen: boolean;
	user: UserType;
};

export type SystemFunc = {
	openSettDialog: () => Action;
	closeSettDialog: () => Action;
};
