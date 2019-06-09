import * as React from "react";
import ContextType from "./contextType";

const Context = React.createContext<ContextType>({
    theme: null,
    setting: null
});
export default Context;