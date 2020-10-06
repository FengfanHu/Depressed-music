import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Input, Modal, Form, message, Avatar, Popover } from 'antd';
import MenuContent from './Menu';
import { Link } from 'react-router-dom';
import { userLogin, checkLogin, userLogout } from '../../api/user';
import { mapStateToProps, mapDispatchToProps } from '../../redux/dispatch';
import './Header.scss';

const {Search} = Input;
const routers = [
    { title: '发现音乐', path:'/'},
    { title: '我的音乐', path: '/my'},
    { title: '朋友圈', path: '/friends'}
]


function Header(props) {
    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();
    const { user, onSetUser } = props;

    useEffect(() => {
        checkLogin()
            .then(res => onSetUser(res.data.profile))
            .catch(err => console.log(err));
    }, [onSetUser]);

    // 用户登录触发
    const onUserLogin = () => {
        form.validateFields()
            .then(val => {
                userLogin(val['phone'], val['password'])
                    .then((res) => {
                        const data = res.data;
                        if (data.code !== 200) {
                            return message.warning(data.msg);
                        }
                        message.success('登录成功');
                        onSetUser(data.profile);
                        setShowModal(false);
                    })
                }
            ).catch(err => {
                const errorFields = err.errorFields;
                errorFields.forEach(field => {
                    const errors = field.errors;
                    errors.forEach(error => {
                        message.error(error);
                    })
                })
            });

    }

    // 用户退出
    const onUserLogout = () => {
        userLogout()
            .then(res => {
                if (res.data.code === 200) message.success('退出成功');
                onSetUser({});
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="header-content">
            <Row gutter={5} justify="space-between">
                {/* Logo */}
                <Col>
                    <h1><Link to="/">Depressed Music</Link></h1>
                </Col>
                {/* Navigation */}
                <Col>
                    <MenuContent routers={routers}></MenuContent>
                </Col>
                {/* Search and Login */}
                <Col>
                    <Search placeholder="搜索歌曲/歌单" className="search"></Search>
                    {
                        Object.keys(user).length > 0
                        ? <Popover
                            content={<Button type="text" danger onClick={() => {onUserLogout()}}>退出</Button>}>
                            <Link to={`/user/${user.userId}`}>
                                <Avatar src={user.avatarUrl} title={user.nickname}/>
                            </Link>
                        </Popover>

                        : <Fragment>
                            <Button type="text" onClick={() => setShowModal(true)}>登录</Button>
                            <Modal
                                title="登录"
                                visible={showModal}
                                onCancel={() => { setShowModal(false) }}
                                onOk={() => { onUserLogin() }}>
                                <Form
                                    form={form}
                                    name="login"
                                    initialValues={{ remember: true }}
                                    >
                                <Form.Item
                                    label="手机号"
                                    name="phone"
                                    rules={[{ required: true, message: '请输入与您账号的手机号!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="密码"
                                    name="password"
                                    rules={[{ required: true, message: '请输入您的密码!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                </Form>
                            </Modal>
                        </Fragment>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);