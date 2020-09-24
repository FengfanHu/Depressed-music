import React, { Fragment } from 'react';
import { Layout } from 'antd';
import './Index.scss';
const {Content} = Layout;

function Find(props) {
    return (
        <Fragment>
            <Content className="content">
                { props.children }
            </Content>
        </Fragment>
    );
}

export default Find;