import { Nullable } from '../../types';
import Message from './messageType';

type UserType = {
	name: string;
	id: string;
	avatar: Nullable<string>;
	msg: Message[];
};

export default UserType;
