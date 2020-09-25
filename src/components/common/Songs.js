import React from 'react';
import { List, Avatar } from 'antd';
import { Link } from 'react-router-dom';

function Songs(props) {

    /**
     * 处理歌曲时间
     * @param {Number} milliseconds 
     */
    const handleTime = (milliseconds) => {
        let time = parseInt(milliseconds/1000, 10);
        let minutes = parseInt(time/60, 10) < 10 ?  '0'+parseInt(time/60, 10): parseInt(time/60, 10);
        let seconds = (time%60) < 10 ?  '0'+(time%60): (time%60);
        return `${minutes}:${seconds}`;
    }

    return (
        <List
            pagination
            size="small"
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={props.list} // ! list -> tracks
            renderItem={item => (
            <List.Item key={item.id}>
                <List.Item.Meta
                    avatar={
                    <Avatar src={item.al.picUrl} />
                    }
                    // TODO 需要艺人界面
                    title={<Link to= {`/song/${item.id}`} >{item.name}</Link>}
                    description={item.ar[0].name}
                />
                <div><b>歌曲时长：</b>{handleTime(item.dt)}</div>
            </List.Item>
            )}
        />
    )
}

export default Songs;