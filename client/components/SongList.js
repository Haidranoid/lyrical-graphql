import React, {Component} from "react";
import gql from 'graphql-tag'
import {graphql} from "react-apollo";
import {hashHistory, Link} from "react-router";
import {QUERY_SONGS, DELETE_SONG} from "../queries/songs";

class SongList extends Component {
    constructor(props) {
        super(props);

        this.handleSongDelete = this.handleSongDelete.bind(this);
    }

    async handleSongDelete(id) {
        const {deleteSong} = this.props;
        const {data: {refetch}} = this.props;

        await deleteSong({
            variables: {
                id
            },
        });

        await refetch();
    }

    render() {
        const {data: {loading, error, songs}} = this.props;

        if (loading)
            return <div>Loading...</div>

        if (!loading && error)
            return <div>Error</div>

        return <div>
            <ul className="collection">
                {songs.map(song =>
                    <li key={song.id} className="collection-item">
                        <Link to={`/songs/${song.id}`}>
                            {song.title}
                        </Link>

                        <i className="material-icons"
                           onClick={() => this.handleSongDelete(song.id)}
                        >delete</i>
                    </li>)
                }
            </ul>
            <Link
                to="songs/create"
                className="btn-floating btn-large red right"
            >
                <i className="material-icons">add</i>
            </Link>
        </div>
    }
}

export default graphql(DELETE_SONG, {name: "deleteSong"})(
    graphql(QUERY_SONGS)(SongList)
);