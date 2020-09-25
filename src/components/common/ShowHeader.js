import React from 'react';
import { Row, Col, PageHeader, Skeleton } from 'antd';

/**
 * 歌单头部
 * @param {name} props 
 */
function ShowHeader(props) {
    return (
        <Row style={{ padding: '30px 30px', paddingBottom: '15px' }} justify="center">
            <Col span={7}>
                {
                    props.cover
                    ? props.cover
                    : <Skeleton.Image style={{ width: "200px", height: "200px"}} />
                }
            </Col>
            <Col span={14} style={{ padding: '0px 10px' }}>
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