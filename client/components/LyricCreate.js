import React, {Component} from "react";
import {graphql} from "react-apollo";
import {ADD_LYRICS_TO_SONG} from "../queries/lyrics";
import {QUERY_SONG} from "../queries/songs";

class LyricCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ''
        };
    }

    async handleSubmit(e){
        e.preventDefault();

        const {addLyricsToSong, songId} = this.props;

        await addLyricsToSong({
            variables: {
                content: this.state.content,
                songId
            }
        })

        this.setState({
            content: '',
        })
    }

    render() {
        return <form onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor="input-lyric">Add a Lyric</label>
            <input id="input-lyric" type="text"
                   value={this.state.content}
                   onChange={e => this.setState({content: e.target.value})}
            />
        </form>
    }
}

export default graphql(ADD_LYRICS_TO_SONG,{
    name: "addLyricsToSong"
})(LyricCreate);
