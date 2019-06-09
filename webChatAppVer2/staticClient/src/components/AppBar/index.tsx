import * as React from "react";
import loadable from "@loadable/component";

import Loading from "./loading";
import { AppBarProps } from "./props";

const LoadableComponent = loadable(() => import("./component"), {
	fallback: <Loading />
});

const AppBarLoadable: React.FC<AppBarProps> = props => {
	return <LoadableComponent {...props} />;
};

export default AppBarLoadable;
