import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { playlistDetail } from '../../api/common';
import TracksSection from '../../components/discovery/TracksSection';
import PlaylistHeader from '../../components/discovery/PlaylistHeader';
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
    }

    render() {
        const {tracks, ...headerProps} = this.state;
        return (
            <Fragment>
                <PlaylistHeader {...headerProps}></PlaylistHeader>
                <TracksSection title="歌曲列表" list={tracks} icon={<CustomerServiceTwoTone />}></TracksSection>
            </Fragment>
        )
    }
}

export default withRouter(PlayList);