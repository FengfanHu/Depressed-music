import React, {Fragment} from 'react';
import {Avatar} from 'antd';
import './Track.scss';

function Track(props) {
    return (
    <Fragment>
        <Avatar className="cover" src={props.src} shape="circle"></Avatar>
        <div className="cover-bg"></div>
    </Fragment>
    )
}

export default Track;