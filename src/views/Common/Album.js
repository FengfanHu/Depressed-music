import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { albumDetail, albumComments } from '../../api/album';
import TracksSection from '../../components/song/TracksSection';
import AlbumHeader from '../../components/album/AlbumHeader';
import Comments from '../../components/common/Comments';
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
            hotComments: [],
            comments: [],
            commentCount: 0
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
        albumComments(albumId).then(result => {
            this.setState({
                hotComments: result.data.hotComments,
                comments: result.data.comments,
                commentCount: result.data.total
            })
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const {songs, comments, commentCount, hotComments, ...headerProps} = this.state;
        return (
            <Fragment>
                <AlbumHeader {...headerProps}></AlbumHeader>
                <TracksSection title="专辑包含歌曲" list={songs} icon={<CustomerServiceTwoTone />}></TracksSection>
                <Comments
                    padding="0px 70px"
                    subTitle={`共${commentCount}条评论`} list={comments}
                    comments={comments} hotComments={hotComments} />
            </Fragment>
        )
    }
}

export default withRouter(Album);