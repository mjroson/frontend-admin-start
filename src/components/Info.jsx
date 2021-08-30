import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Modal, Skeleton } from 'antd';
import { InfoCircleTwoTone } from '@ant-design/icons';

const Info = ({ identifier, modalTitle = 'Informacion' }) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (visible && data === null) {
      axios
        .get(`/api/documents/${identifier}/`)
        .then(resp => {
          setData(resp.data);
        })
        .catch(e => {
          console.log('Error to get documentato for  ', identifier);
          console.log(e);
        });
    }
  }, [visible, data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <InfoCircleTwoTone onClick={() => setVisible(true)} />
      <Modal
        title={<h1 style={{ textAlign: 'center' }}>{data?.title ?? '...'}</h1>}
        visible={visible}
        onOk={() => setVisible(false)}
        style={{ top: 10, minWidth: '70%' }}
        onCancel={() => setVisible(false)}
      >
        {data === null && <Skeleton active />}
        {data !== null && (
          <>
            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
            <hr />
            <p>¿Queres saber mas?</p>
            <a
              href={data.external_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver mas
            </a>
          </>
        )}
      </Modal>
    </>
  );
};

Info.propTypes = {
  identifier: PropTypes.string.isRequired
};

export default Info;
