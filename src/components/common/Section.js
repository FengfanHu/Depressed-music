import React from 'react';
import { PageHeader, Divider, Skeleton } from 'antd';

function Section(props) {
    return (
        <PageHeader
            style={{ padding: '10px 30px' }}
            title={props.title}
            avatar={{ icon: props.icon, style: {backgroundColor: '#fff'} }}>
                <Skeleton loading={props.list.length === 0}>
                    {props.children}
                </Skeleton>
            {
                props.last
                ? <Divider style={{ fontSize: '12px', color: '#999999' }}>到底了 ╮(￣▽￣"")╭</Divider>
                : <Divider style={{ backgroundColor: '#9bc5fb', height: 2}}></Divider>
            }
        </PageHeader>
    )
}

export default Section;