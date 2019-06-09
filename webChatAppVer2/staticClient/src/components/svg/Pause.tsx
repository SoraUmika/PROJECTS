import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
const Pause: React.FC<SvgIconProps> = props => {
    return (
        <SvgIcon {...props}>
            <path fill="none" d="M0 0h24v24H0V0z"/><path d="M6 5h4v14H6zm8 0h4v14h-4z"/>
        </SvgIcon>
    );
}
export default Pause;
