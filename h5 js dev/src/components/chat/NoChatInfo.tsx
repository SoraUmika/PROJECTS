/**
 * The message shown when no chat is opened.
 */
import * as React from 'react';

const style: React.CSSProperties = {
	margin: '100px'
};

const NoChatInfo: React.FC<{}> = () => {
	return <div style={style} />;
};

export default NoChatInfo;
