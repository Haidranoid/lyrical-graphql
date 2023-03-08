import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import ApolloClient from "apollo-client";
import {ApolloProvider} from "react-apollo";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";
import App from "./components/App";

import './style/style.css'

const endpointUrl = 'http://localhost:4000/graphql'
const client = new ApolloClient({
    dataIdFromObject: o => o.id
})

const Root = () => {
    return <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={SongList}/>
            <Route path="songs/create" component={SongCreate}/>
            <Route path="songs/:id" component={SongDetail}/>
        </Route>
    </Router>
};

ReactDOM.render(
    <ApolloProvider client={client}>
        <Root/>
    </ApolloProvider>,
    document.getElementById('root'));