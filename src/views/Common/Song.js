import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { songDetail } from '../../api/common';
import SongHeader from '../../components/discovery/SongHeader';

class Song extends Component {
    constructor() {
        super()
        this.state = {
            artists: [],
            name: '',
            album: '',
            coverImgUrl: '',
            time: 0,
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
    }

    render() {
        const {songs, ...headerProps} = this.state;
        return (
            <Fragment>
                <SongHeader {...headerProps}></SongHeader>
            </Fragment>
        )
    }
}

export default withRouter(Song);