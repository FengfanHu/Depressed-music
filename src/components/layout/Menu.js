import React, {useState} from 'react';
import {Menu} from 'antd';
import {Link, withRouter} from 'react-router-dom';
const { SubMenu, Item } = Menu;

function MenuContent(props) {
    const [selectedKeys, setSelectedKeys] = useState([props.location.pathname]);
    const renderSubMenu = ({path, title, children}) => {
       return (
            <SubMenu key={path} title={title}>
                {
                    children && children.map(child => {
                        return child.children && child.children.length > 0
                        ? renderSubMenu(child)
                        : renderMenuItem(child)
                    })
                }
            </SubMenu>
        );
    }
    const renderMenuItem = ({path, title}) => {
        return (
            <Item key={path}>
                <Link to={path}>{title}</Link>
            </Item>
        );
    }
    return (
        <Menu mode="horizontal"
            className="menu"
            selectable
            selectedKeys={selectedKeys}
            onClick={({key}) => setSelectedKeys([key]) }>
                { 
                    props.routers.map(router => 
                        {
                            return router.children && router.children.length > 0
                            ? renderSubMenu(router)
                            : renderMenuItem(router)
                        }
                    )
                }
        </Menu>
    )
}

export default withRouter(MenuContent);