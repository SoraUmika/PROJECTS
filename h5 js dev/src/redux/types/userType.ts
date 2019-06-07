import { Nullable } from '../../types';

type UserType = {
	name: string;
	id: string;
    avatar: Nullable<string>;
};

export default UserType;
