import React, {Component} from "react";
import gql from 'graphql-tag'
import {graphql} from "react-apollo";
import {Link, hashHistory} from "react-router";
import {CREATE_SONG, QUERY_SONGS} from "../queries/songs";

class SongCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        const {title} = this.state;
        const {addSong} = this.props;

        await addSong({
            variables: {
                title
            },
            refetchQueries: [{
                query: QUERY_SONGS,
                variables: {},
            }]
        });

        hashHistory.push('/')
    }

    render() {
        const {title} = this.props;

        return <div>
            <Link to="/">Back</Link>
            <h3>Create a New Song</h3>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="title-name">Song Title:</label>
                <input id="title-name" type="text" onChange={this.handleTitleChange} value={title}/>
            </form>
        </div>
    }
}

export default graphql(CREATE_SONG, {name: "addSong"})(SongCreate);