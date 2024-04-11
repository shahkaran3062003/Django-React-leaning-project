import React, { Component } from "react";
import RoomCreatePage from "./RoomCreatePage";
import RoomJoinPage from "./RoomJoinPage";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element=<h1>This is Home Page.</h1> ></Route>
                    <Route path="/join" element={<RoomJoinPage />} />

                    <Route path="/create" element={<RoomCreatePage />} />

                </Routes>
            </Router>
        );
    }
}
