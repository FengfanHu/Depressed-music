import React from 'react';
import { Button } from 'antd';
import { CaretRightOutlined, FolderAddOutlined, ShareAltOutlined } from '@ant-design/icons';
import './ButtonGroup.scss';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../redux/dispatch';

function ButtonGroup(props) {
    return (
    <div className="btn-group">
        <Button type="primary"
            shape="round"
            icon={<CaretRightOutlined />}
            onClick={() => {
                props.id
                ? props.onChangeSong(props.id)
                : props.onSetSongs(props.list)
            }}>播放</Button>
        <Button type="primary"
            shape="round"
            icon={<FolderAddOutlined />}>收藏</Button>
        <Button type="primary"
            shape="round"
            icon={<ShareAltOutlined />}>分享</Button>
    </div>
    )
}

export default connect(null, mapDispatchToProps)(ButtonGroup);