import React from 'react';
import { Row, Col, PageHeader, Skeleton } from 'antd';

/**
 * 歌单头部
 * @param {name} props 
 */
function ShowHeader(props) {
    return (
        <Row style={{ padding: props.padding ? props.padding : '30px 30px', marginBottom: props.marginBottom ? props.marginBottom : '0px' }} justify="center">
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
                    subTitle={props.subTitle}
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