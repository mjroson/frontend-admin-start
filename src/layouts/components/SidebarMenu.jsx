import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { useLocation } from 'react-router-dom';

import menuMaker from './Menu';

const getActiveMenuKey = routes => {
  const customPath = String(window.location.pathname);
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].path === customPath) {
      return String(i);
    }
    if (routes[i].submenu && routes[i].submenu.length > 0) {
      for (let x = 0; x < routes[i].submenu.length; x++) {
        if (routes[i].submenu[x].path === customPath) {
          return `${i}-${x}`;
        }
      }
    }
  }
};

const SideMenu = ({ onClickMenuItem, theme, routes }) => {
  const location = useLocation();
  const [menuSelectedKey, setMenuSelectedKey] = useState(null);

  useEffect(() => {
    const selectedMenuKey = getActiveMenuKey(routes);
    if (selectedMenuKey) {
      setMenuSelectedKey(selectedMenuKey);
    }
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Menu
      mode="vertical"
      style={{ flex: 1 }}
      theme={theme}
      selectedKeys={[menuSelectedKey]}
      onSelect={onClickMenuItem}
    >
      {menuMaker(routes)}
    </Menu>
  );
};

export default SideMenu;
