import React, {Component} from "react";
import {graphql} from "react-apollo";
import {LIKE_LYRIC} from "../queries/lyrics";

class LyricList extends Component {
    async onLike(id, likes) {
        const {likeLyric} = this.props;

        await likeLyric({
            variables: {
                id
            },
            optimisticResponse: {
                __type: 'Mutation',
                likeLyric: {
                    __typename: 'LyricType',
                    id: id,
                    likes: likes + 1
                }
            }
        })
    }

    render() {
        const {lyrics} = this.props;

        return <ul className="collection">
            {lyrics.map(lyric => <li key={lyric.id} className="collection-item">
                {lyric.content}
                <div className="vote-box">
                    <i className="material-icons"
                       onClick={() => this.onLike(lyric.id, lyric.likes)}>
                        thumb_up
                    </i>
                    {lyric.likes}
                </div>
            </li>)}
        </ul>
    }
}

export default graphql(LIKE_LYRIC, {
    name: "likeLyric"
})(LyricList);