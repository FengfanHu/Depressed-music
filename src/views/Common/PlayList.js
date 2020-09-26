import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { playlistDetail, playlistComments } from '../../api/playlist';
import TracksSection from '../../components/song/TracksSection';
import PlaylistHeader from '../../components/playlist/PlaylistHeader';
import Comments from '../../components/common/Comments';
import { CustomerServiceTwoTone } from '@ant-design/icons';

class PlayList extends Component {
    constructor() {
        super()
        this.state = {
            tracks: [],
            creator: {},
            name: '',
            coverImgUrl: '',
            description: '',
            createTime: 0,
            hotComments: [],
            comments: [],
            commentCount: 0,
        }
    }

    componentDidMount() {
        const playlistId = this.props.match.params.id;
        playlistDetail(playlistId).then(result => {
            this.setState({
                tracks: result.data.playlist.tracks,
                creator: result.data.playlist.creator,
                name: result.data.playlist.name,
                coverImgUrl: result.data.playlist.coverImgUrl,
                description: result.data.playlist.description,
                createTime: result.data.playlist.createTime
            })
        }).catch(err => {
            if (err.response.status === 404) {
                this.props.history.push('/404');
            }
        });
        // 评论
        playlistComments(playlistId).then(result => {
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
        const {tracks, hotComments, comments, commentCount, ...headerProps} = this.state;
        return (
            <Fragment>
                <PlaylistHeader {...headerProps}></PlaylistHeader>
                <TracksSection title="歌曲列表" list={tracks} icon={<CustomerServiceTwoTone />}></TracksSection>
                <Comments subTitle={`共${commentCount}条评论`} list={comments} comments={comments} hotComments={hotComments} />
            </Fragment>
        )
    }
}

export default withRouter(PlayList);