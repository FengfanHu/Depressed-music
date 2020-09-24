import React, {Fragment} from 'react';
import { Image, Avatar, Collapse } from 'antd';
import ShowHeader from '../common/ShowHeader';
import { ProfileTwoTone } from '@ant-design/icons';
import './PlaylistHeader.scss'
const { Panel } = Collapse;

/**
 * 歌单头部
 * @param {coverImgUrl, creator, description, name, createTime} props 
 */
function PlaylistHeader(props) {
    const { coverImgUrl, creator, createTime, description, ...ShowHeaderProps} = props;
    return (
        <ShowHeader
            cover={<Image width="200px" src={coverImgUrl} alt="Cover"></Image>}
            icon={<ProfileTwoTone />}
            {...ShowHeaderProps}
            children={
                <Fragment>
                    <div className="creator">
                        <Avatar shape="square" src={creator.avatarUrl}></Avatar>
                        <a href="/">{creator.nickname}</a>
                        <span>{new Date(createTime).toLocaleDateString()} 创建</span>
                    </div>
                    <Collapse ghost>
                        <Panel header="简介">
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
            }>
        </ShowHeader>
    )
}

export default PlaylistHeader;