import React, {Component, Fragment} from 'react';
import { recommend, personalizedList, personalizedNewSong, newAlbum } from '../../api/discovery';
import { Carousel, Image, Skeleton } from 'antd';
import RecommendSection from '../../components/discovery/RecommendSection';
class Recommend extends Component {
    constructor() {
        super()
        this.state = {
            banners: [],
            list: [],
            newSongs: [],
            newAlbums: []
        };
    }

    componentDidMount() {
        // Banners
        recommend().then(result => {
            this.setState({
                banners: result.data.banners
            });
        }).catch(err => console.log(err));
        // List
        personalizedList().then(result => {
            this.setState({
                list: result.data.result
            });
        }).catch(err => console.log(err));
        // NewSongs
        personalizedNewSong().then(result => {
            this.setState({
                newSongs: result.data.result.slice(0, 10)
            })
        }).catch(err => console.log(err));
        // NewAlbums
        newAlbum().then(result => {
            this.setState({
                newAlbums: result.data.monthData
            });
        }).catch(err => console.log(err));
    }

    render() {
        const {banners, list, newSongs, newAlbums} = this.state;
        return (
        <Fragment>
            <Skeleton loading={banners.length === 0}>
                <Carousel autoplay>
                    {banners.map(banner => (
                        <Image
                            width="100%"
                            src={banner.imageUrl}
                            key={banner.targetId}>
                        </Image>
                    ))}
                </Carousel>
            </Skeleton>
            <RecommendSection list={list} title="推荐歌单" type="playlist"></RecommendSection>
            <RecommendSection list={newSongs} title="推荐新音乐" type="song"></RecommendSection>
            <RecommendSection list={newAlbums} title="新碟上架" type="album" last={true}></RecommendSection>
        </Fragment>
        )
    }
}

export default Recommend;