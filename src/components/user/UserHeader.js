import React from 'react';
import { Image, Row, Col, Statistic, Divider, Typography, Skeleton } from 'antd';
import ShowHeader from '../common/ShowHeader';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import './UserHeader.scss';

const { Paragraph } = Typography;

/**
 * 歌单头部
 * @param { level, avatarUrl, gender, nickname, follows, followeds, eventCount, signature } props 
 */
function UserHeader(props) {
    const { level, avatarUrl, gender, nickname, follows, followeds, eventCount, signature } = props;
    return (
        <ShowHeader
            subTitle={`Lv.${level}`}
            cover={
                <Skeleton loading={!avatarUrl}>
                    <Image src={avatarUrl} alt="Cover" width="200px" />
                </Skeleton>
            }
            icon={gender === 1 ? <ManOutlined style={{ color: '#1890ff' }} /> : <WomanOutlined style={{ color: '#ff85c0' }} />}
            name={nickname}>
            <Row gutter={30}>
                <Col><Statistic title="关注" value={follows} className="statistic"></Statistic></Col>
                <Col><Statistic title="粉丝" value={followeds} className="statistic"></Statistic></Col>
                <Col><Statistic title="动态" value={eventCount} className="statistic"></Statistic></Col>
            </Row>
            <Divider style={{ margin: '5px 0px' }}></Divider>
            <span style={{ display: 'block', marginBottom: '5px' }}>
                <Paragraph type="secondary" ellipsis={{ rows: 2, expandable: true, symbol: "展开" }}>
                    { signature ? signature : '这人很懒，什么都没留下' }
                </Paragraph>
            </span>
        </ShowHeader>
    )
}

export default UserHeader;