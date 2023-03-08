import gql from "graphql-tag";

export const QUERY_SONGS = gql`
    query SongsQuery{
        songs {
            id
            title
        }
    }
`

export const QUERY_SONG = gql`
    query SongQuery($id: ID!){
        song(id: $id) {
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

export const CREATE_SONG = gql`
    mutation AddSong($title: String!){
        addSong(title: $title){
            id
            title
        }
    }
`

export const DELETE_SONG = gql`
    mutation DeleteSong($id: ID!){
        deleteSong(id: $id){
            id
            title
        }
    }
`
