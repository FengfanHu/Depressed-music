import React, {Fragment} from 'react';
import { Image, Avatar, Collapse, Skeleton } from 'antd';
import ShowHeader from '../common/ShowHeader';
import { ProfileTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import  ButtonGroup from '../common/ButtonGroup';
import './PlaylistHeader.scss'
const { Panel } = Collapse;

/**
 * 歌单头部
 * @param {coverImgUrl, creator, description, name, createTime} props 
 */
function PlaylistHeader(props) {
    const { coverImgUrl, creator, createTime, description, ...ShowHeaderProps} = props;

    const handleTracks = (tracks) => {
        return tracks.map(track => {
            return {
                id: track.id,
                name: track.name
            }
        });
    }

    return (
        <ShowHeader
            cover={
                <Skeleton loading={!coverImgUrl}>
                    <Image width="200px" src={coverImgUrl} alt="Cover"></Image>
                </Skeleton>
            }
            icon={<ProfileTwoTone />}
            {...ShowHeaderProps}
            children={
                <Fragment>
                    <div className="creator">
                        <Avatar shape="square" src={creator.avatarUrl}></Avatar>
                        <Link to={`/user/${creator.userId}`}>{creator.nickname}</Link>
                        <span>{new Date(createTime).toLocaleDateString()} 创建</span>
                    </div>
                    <ButtonGroup list={handleTracks(props.list)}></ButtonGroup>
                    <Collapse ghost>
                        <Panel header="简介">
                            <p className="description">
                                {
                                    description
                                    ? description.split('\n').map((paragraph, index) => 
                                    (
                                        <Fragment key={index}>
                                            {paragraph}
                                            <br></br>
                                        </Fragment>
                                    ))
                                    : '暂无简介'
                                }
                            </p>
                        </Panel>
                    </Collapse>
                </Fragment>
            }>
        </ShowHeader>
    )
}

export default PlaylistHeader;