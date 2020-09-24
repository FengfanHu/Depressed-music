import React from 'react';
import { Row, Col, PageHeader, Skeleton } from 'antd';
import './ShowHeader.scss'

/**
 * 歌单头部
 * @param {name} props 
 */
function ShowHeader(props) {
    return (
        <Row className="playlist-content">
            <Col span={6}>
                {
                    props.cover
                    ? props.cover
                    : <Skeleton.Image style={{ width: "200px", height: "200px"}} />
                }
            </Col>
            <Col span={15} style={{ padding: '0px 10px' }}>
                <PageHeader
                    style={{ paddingTop: 0 }}
                    title={props.name}
                    avatar={{
                        size: "large",
                        icon: props.icon,
                        style: { backgroundColor: '#fff' },
                        shape: "square" }}>
                    { props.children }
                </PageHeader>
            </Col>
        </Row>
    )
}

export default ShowHeader;