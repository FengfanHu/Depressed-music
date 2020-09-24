import React from 'react';
import { Row, Col, Avatar, Input } from 'antd';
import MenuContent from './Menu';
import './Header.scss';

const {Search} = Input;
const routers = [
    { title: '发现音乐', path:'/find' ,children: [
        { title: '推荐', path: '/'},
        { title: '排行榜', path: '/rank'},
        { title: '歌单', path: '/playlist'},
        { title: '歌手', path: '/singer'}
    ]},
    { title: '我的音乐', path: '/my'},
    { title: '朋友圈', path: '/friends'}
]

function Header(props) {

    return (
        <div className="header-content">
            <Row gutter={5} justify="space-between">
                {/* Logo */}
                <Col>
                    <h1><a href="/">Depressed Music</a></h1>
                </Col>
                {/* Navigation */}
                <Col>
                    <MenuContent routers={routers}></MenuContent>
                </Col>
                {/* Search and Login */}
                <Col>
                    <Search placeholder="搜索歌曲/歌单" className="search"></Search>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </Col>
            </Row>
        </div>
    )
}

export default Header;