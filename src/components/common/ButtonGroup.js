import React from 'react';
import { Button } from 'antd';
import { CaretRightOutlined, FolderAddOutlined, ShareAltOutlined } from '@ant-design/icons';
import './ButtonGroup.scss';
import { connect } from 'react-redux';
import { songUrl } from '../../api/song';
import { changeSong, setSongs } from '../../redux/action';

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

function mapDispatchToProps(dispatch) {
    return {
        onChangeSong: async (id) => {
            const song = await songUrl(id).then(result => result.data.data[0]).catch(err => console.log(err))
            dispatch(changeSong(song))
        },
        onSetSongs: async (songs) => {
            const song = await songUrl(songs[0].id).then(result => result.data.data[0]).catch(err => console.log(err))
            dispatch(changeSong(song))
            dispatch(setSongs(songs))
        }
    }
}

export default connect(null, mapDispatchToProps)(ButtonGroup);