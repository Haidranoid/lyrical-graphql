import React, {Component} from "react";
import {Link} from "react-router";
import {graphql} from "react-apollo";
import {QUERY_SONG} from "../queries/songs";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component {
    render() {
        const {data: {loading, error, song}} = this.props;

        if (loading)
            return <div>Loading...</div>

        if (!loading && error)
            return <div>Error</div>

        return <div>
            <Link to="/">Back</Link>
            <h3>{song.title}</h3>
            <LyricList lyrics={song.lyrics}/>
            <LyricCreate songId={this.props.params.id}/>
        </div>
    }
}

export default graphql(QUERY_SONG, {
    options: props => {
        return {
            variables: {
                id: props.params.id
            }
        }
    }
})(SongDetail);