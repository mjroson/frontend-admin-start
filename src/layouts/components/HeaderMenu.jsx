import React from 'react';
import { Menu, Tag } from 'antd';
import {
  ProfileOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';

import menuMaker from './Menu';

const { SubMenu } = Menu;

const HeaderMenu = ({ onClickMenuItem, onLogout, routes }) => (
  <Menu mode="horizontal" style={{ float: 'right' }} onSelect={onClickMenuItem}>
    {menuMaker(routes, null, 'header')}
    <SubMenu key="SubMenuUser" placement="bottomLeft" icon={<UserOutlined />}>
      <Menu.Item key="2">
        <ProfileOutlined size="large" />
        Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="6">
        <Tag color="#3b5999">UIF</Tag>
      </Menu.Item>
      <Menu.Item key="7">
        <Tag color="#001529">CORE</Tag>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={onLogout}>
        <LogoutOutlined size="large" />
        Logout
      </Menu.Item>
    </SubMenu>
  </Menu>
);

export default HeaderMenu;
