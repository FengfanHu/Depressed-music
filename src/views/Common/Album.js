import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { albumDetail } from '../../api/common';
import TracksSection from '../../components/discovery/TracksSection';
import AlbumHeader from '../../components/discovery/AlbumHeader';
import { CustomerServiceTwoTone } from '@ant-design/icons';

class Album extends Component {
    constructor() {
        super()
        this.state = {
            songs: [],
            artist: {},
            name: '',
            company: '',
            coverImgUrl: '',
            description: '',
            publishTime: 0,
        }
    }

    componentDidMount() {
        const albumId = this.props.match.params.id;
        albumDetail(albumId).then(result => {
            this.setState({
                songs: result.data.songs,
                artist: result.data.album.artist,
                name: result.data.album.name,
                company: result.data.album.company,
                coverImgUrl: result.data.album.picUrl,
                description: result.data.album.description,
                publishTime: result.data.album.publishTime
            })
        }).catch(err => {
            if (err.response.status === 404) {
                this.props.history.push('/404');
            }
        });
    }

    render() {
        const {songs, ...headerProps} = this.state;
        return (
            <Fragment>
                <AlbumHeader {...headerProps}></AlbumHeader>
                <TracksSection title="专辑包含歌曲" list={songs} icon={<CustomerServiceTwoTone />}></TracksSection>
            </Fragment>
        )
    }
}

export default withRouter(Album);