import React from 'react';
import { PageHeader, Divider, Empty } from 'antd';

function Section(props) {
    return (
        <PageHeader
            style={{ padding: props.padding ? props.padding : '10px 30px' }}
            title={props.title}
            subTitle={props.subTitle ? props.subTitle : ''}
            avatar={{ icon: props.icon, style: {backgroundColor: '#fff', fontSize: '24px'} }}>
                {
                    props.list.length > 0
                    ? props.children
                    : <Empty description={false}></Empty>
                }
            {
                props.last
                ? <Divider style={{ fontSize: '12px', color: '#999999' }}>到底了 ╮(￣▽￣"")╭</Divider>
                : <Divider style={{ backgroundColor: '#9bc5fb', height: 2}}></Divider>
            }
        </PageHeader>
    )
}

export default Section;