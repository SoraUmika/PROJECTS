import Action from "../../redux/types/actionTypes";

export type PageNavState = {
    pageNavindex: 0 | 1 | 2;
}

export type PageNavFunc = {
	pageNavOnClick: (index: 0 | 1 | 2) => Action;
}