import * as React from "react";
import Typography from "@material-ui/core/Typography";

export default class Chat extends React.Component<{},{}>{
    render(){
        return (
            <React.Fragment>
                <div>
                    <Typography>
                        ROOM
                    </Typography>
                </div>
            </React.Fragment>
        );
    }
}