import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import ShowHeader from '../common/ShowHeader';
import { PlayCircleTwoTone } from '@ant-design/icons';
import Track from '../common/Track';
import './SongHeader.scss'

/**
 * 歌单头部
 * @param {artist, coverImgUrl, album, time, name} props 
 */
function SongHeader(props) {

    const { artists, coverImgUrl, album, time, ...ShowHeaderProps} = props;

    /**
     * 处理歌手
     * @param {Number} milliseconds 
     */
    const handleArtists = (artists) => {
        return artists.map((artist, index) => (
            <Fragment key={index}>
                <Link to={`/artist/${artist.id}`} className="artists-name">{artist.name}</Link>{ index === artists.length-1 ? '' : '/' }
            </Fragment>
        ))
    }

    /**
     * 处理歌曲时间
     * @param {Number} milliseconds 
     */
    const handleTime = (milliseconds) => {
        let time = parseInt(milliseconds/1000, 10);
        let minutes = parseInt(time/60, 10) < 10 ?  '0'+parseInt(time/60, 10): parseInt(time/60, 10);
        let seconds = (time%60) < 10 ?  '0'+(time%60): (time%60);
        return `${minutes}:${seconds}`;
    }

    return (
        <Fragment>
            <ShowHeader
                marginBottom="70px"
                cover={<Track src={coverImgUrl}></Track>}
                icon={<PlayCircleTwoTone />}
                {...ShowHeaderProps}
                children={
                    <div className="artist">
                        <span>歌手：{handleArtists(artists)}</span>
                        <span>歌曲时长：{handleTime(time)}</span>
                    </div>
                }>
            </ShowHeader>
        </Fragment>
    )
}

export default SongHeader;