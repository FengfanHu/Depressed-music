import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { songDetail, songComments } from '../../api/song';
import SongHeader from '../../components/song/SongHeader';
import Comments from '../../components/common/Comments';

class Song extends Component {
    constructor() {
        super()
        this.state = {
            artists: [],
            name: '',
            album: '',
            coverImgUrl: '',
            time: 0,
            commentCount: 0,
            comments: [],
            hotComments: []
        }
    }

    componentDidMount() {
        const songId = this.props.match.params.id;
        songDetail(songId).then(result => {
            const song = result.data.songs[0];
            this.setState({
                artists: song.ar,
                name: song.name,
                album: song.al,
                coverImgUrl: song.al.picUrl,
                time: song.dt
            })
        }).catch(err => {
            if (err.response.status === 404) {
                this.props.history.push('/404');
            }
        });
        // 评论
        songComments(songId).then(result => {
            this.setState({
                hotComments: result.data.hotComments,
                comments: result.data.comments,
                commentCount: result.data.total
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const {songs, commentCount, comments, hotComments, ...headerProps} = this.state;
        return (
            <Fragment>
                <SongHeader {...headerProps} ></SongHeader>
                <Comments
                    padding="0px 70px"
                    subTitle={`共${commentCount}条评论`} list={comments}
                    comments={comments} hotComments={hotComments} />
            </Fragment>
        )
    }
}

export default withRouter(Song);