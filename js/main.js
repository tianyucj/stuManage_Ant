import React from "react";
import ReactDOM from "react-dom";
import {Route,Router,IndexRoute,hashHistory} from "react-router";

import Index from "../index/Index";
import Registe from "../register/Registe";
import Login from "../login/Login";
import Manage from "../manage/Manage";
import Student from "../manage/Student";
import store from "./store";
import {Provider} from "react-redux";

ReactDOM.render(<Provider store={store}>
	<Router history={hashHistory}>
	<Route path="/" component={Index}>
		<IndexRoute component={Login}></IndexRoute>
		<Route path="/Registe" component={Registe}></Route>
		<Route path="/Login" component={Login}></Route>
		<Route path="/Manage" component={Manage}>
			<Route path="/Student" component={Student}></Route>
		</Route>
	</Route>
</Router></Provider>,document.getElementById("stuManage"));
