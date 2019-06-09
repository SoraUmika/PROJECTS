import Action from "./actionTypes";

interface Dispatch{
    (action: Action): Action
}

export default Dispatch;