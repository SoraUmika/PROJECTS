type Message = {
	type: MessageTypes;
	src: 'self' | 'other' | string;
	data: MessageDatas;
};

type MessageTypes = 'text';
type MessageDatas = TextData;

type TextData = {
	txt: string;
};

export default Message;
