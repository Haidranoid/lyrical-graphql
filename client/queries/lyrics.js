import gql from "graphql-tag";

export const ADD_LYRICS_TO_SONG = gql`
    mutation addLyricToSong($content: String, $songId: ID){
        addLyricToSong(content: $content, songId: $songId){
            id
            title 
            lyrics {
                id
                content
                likes
            }
        }
    }
`

export const LIKE_LYRIC = gql`
    mutation likeLyric($id: ID){
        likeLyric(id: $id){
            id
            likes
        }
    }
`