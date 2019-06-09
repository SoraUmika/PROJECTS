import UserType from "./redux/types/userType";

export type Nullable<T> = T | null;
export type ChatFilterModes = "online" | "unread" | "all";
export type StringObject<T> = {[index: string]: T};
export type Users = StringObject<UserType>;