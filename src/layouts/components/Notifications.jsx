import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popover, Button, Badge, Card } from 'antd';

import { BellOutlined } from '@ant-design/icons';

import ImportFileList from 'pages/ImportFile/components/ImportFileList';

import { modelActions } from 'pages/ImportFile/data/models';

const NotificationsDropDown = props => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const total = useSelector(
    state =>
      state.importFiles?.listData?.results?.filter(
        item => item.state !== 'success' && item.state !== 'error'
      ).length ?? 0
  );

  useEffect(() => {
    dispatch(modelActions.list());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Popover
      placement="bottomRight"
      classNames="global-notifications"
      visible={visible}
      onClick={() => setVisible(!visible)}
      content={
        <Card
          style={{
            maxHeight: '600px',
            width: '400px',
            overflow: 'auto',
            margin: '-12px -15px'
          }}
          cover
        >
          <ImportFileList setVisible={setVisible} />
        </Card>
      }
      trigger="hover"
    >
      <Button
        type="primary"
        shape="circle"
        icon={<BellOutlined style={{ fontSize: '22px', marginLeft: '8px' }} />}
        size="large"
      >
        <Badge count={total} offset={[5, -18]}>
          <span className="head-example" />
        </Badge>
      </Button>
    </Popover>
  );
};

export default NotificationsDropDown;
