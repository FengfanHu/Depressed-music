import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { artistDetail, artistAlbum, artistDesc, artistMV } from '../../api/artist';
import ArtistHeader from '../../components/artist/ArtistHeader';
import ArtistDesc from '../../components/artist/ArtistDesc';
import { Tabs } from 'antd'; 
import Songs from '../../components/common/Songs';
import Cards from '../../components/common/Cards';
const { TabPane } = Tabs;

class Artist extends Component {

    constructor() {
        super();
        this.state = {
            artist: { alias: [] },
            hotSongs: [],
            hotAlbums: [],
            mvs: [],
            introduction: []
        };
    }

    componentDidMount() {
        const artistId = this.props.match.params.id;
        console.log(artistId);
        // 歌手详情
        artistDetail(artistId).then(result => {
            this.setState({
                artist: result.data.artist,
                hotSongs: result.data.hotSongs
            })
        }).catch(err => {
            console.log(err);
            if (err.response.status === 404) {
                this.props.history.push('/404');
            }
        })
        // 歌手专辑
        artistAlbum(artistId).then(result => {
            this.setState({
                hotAlbums: result.data.hotAlbums
            })
        }).catch(err => {
            console.log(err);
        })
        // 歌手详情
        artistDesc(artistId).then(result => {
            this.setState({
                introduction: result.data.introduction
            })
        }).catch(err => {
            console.log(err);
        })
        // 歌手MV
        artistMV(artistId).then(result => {
            this.setState({
                mvs: result.data.mvs
            })
        }).catch(err => {
            console.log(err);
        })
    }

    goto = (type, id) => {
        this.props.history.push(`/${type}/${id}`);
    }

    render() {
        const { artist, hotSongs, hotAlbums, introduction, mvs } = this.state;
        return (
            <Fragment>
                <ArtistHeader {...artist}></ArtistHeader>
                <Tabs size="large" style={{ padding: '10px 70px' }}>
                    <TabPane tab="热门歌曲" key="1">
                        <Songs list={hotSongs}></Songs>
                    </TabPane>
                    <TabPane tab="所有专辑" key="2">
                        <Cards pagination={{ pageSize: 12, simple: true }} column={4} list={hotAlbums} type="album" imgProp="picUrl"></Cards>
                    </TabPane>
                    <TabPane tab="相关MV" key="3">
                        <Cards pagination={{ pageSize: 12, simple: true }} column={4} list={mvs} type="mv" imgProp="imgurl"></Cards>
                    </TabPane>
                    <TabPane tab="艺人介绍" key="4">
                        <ArtistDesc introduction={introduction}></ArtistDesc>
                    </TabPane>
                </Tabs>
            </Fragment>
        )
    } 
}

export default withRouter(Artist);