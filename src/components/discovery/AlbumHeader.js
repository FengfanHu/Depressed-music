import React, {Fragment} from 'react';
import { Image, Collapse } from 'antd';
import { Link } from 'react-router-dom';
import ShowHeader from '../common/ShowHeader';
import { PlayCircleTwoTone } from '@ant-design/icons';
import './AlbumHeader.scss'
const { Panel } = Collapse;

/**
 * 歌单头部
 * @param {artist, company, coverImgUrl, description, publishTime, name} props 
 */
function AlbumHeader(props) {
    const { artist, company, coverImgUrl, description, publishTime, ...ShowHeaderProps} = props;
    return (
        <Fragment>
            <ShowHeader
                cover={<Image width="200px" src={coverImgUrl} alt="Cover"></Image>}
                icon={<PlayCircleTwoTone />}
                {...ShowHeaderProps}
                children={
                    <div className="artist">
                        <span>歌手：<Link href="/">{artist.name}</Link></span>
                        <span>发行时间：{new Date(publishTime).toLocaleDateString()}</span>
                        <span>发行公司：{company}</span>
                    </div>
                }>
            </ShowHeader>
            <Collapse ghost style={{ padding: '0px 15px'}}>
                <Panel header="专辑介绍">
                    <p className="description">
                        { description.split('\n').map((paragraph, index) => 
                            (
                                <Fragment key={index}>
                                    {paragraph}
                                    <br></br>
                                </Fragment>
                            ))}
                    </p>
                </Panel>
            </Collapse>
        </Fragment>
    )
}

export default AlbumHeader;