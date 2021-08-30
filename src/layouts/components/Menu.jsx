import React from 'react';
import { Menu } from 'antd';

const { SubMenu } = Menu;

const menuMaker = (routes, parentKey, place = 'side') =>
  routes
    .filter(item => {
      if (place === 'side') {
        return !item?.header;
      }
      return item?.header ?? false;
    })
    .map((item, idx) => {
      if (!item.hidden) {
        const key = parentKey ? `${parentKey}-${idx}` : String(idx);
        if (item.submenu) {
          return (
            <SubMenu
              key={key}
              title={
                <span>
                  {item.Icon ? <item.Icon /> : null}
                  <span className="nav-text">{item.label}</span>
                </span>
              }
            >
              {menuMaker(item.submenu, key, place)}
            </SubMenu>
          );
        }
        return (
          <Menu.Item key={key} path={item.path}>
            {item.Icon ? <item.Icon /> : null}
            <span className="nav-text">{item.label}</span>
          </Menu.Item>
        );
      }
      return null;
    });

export default menuMaker;
