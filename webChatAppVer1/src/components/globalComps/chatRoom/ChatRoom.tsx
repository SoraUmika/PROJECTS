import * as React from 'react';

import Input from './input/Input';
import Header from './header/Header';
import CSS from '../../../css';
import UserType from '../../../redux/types/userType';

type Props = {
    user: UserType;
};

const ChatRoom: React.FC<Props> = (props: Props) => {
    const {user} = props;
	return (
		<React.Fragment>
			<Header user={user}/>
			<div style={CSS.multi({ fullW: true, size: { height: '78%' } })}/>
			<Input />
		</React.Fragment>
	);
};

export default ChatRoom;
