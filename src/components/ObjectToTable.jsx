import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';
import SearchForm from 'components/SearchForm';

const ObjectToTable = ({ object, ...props }) => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const list = [];
    for (const [key, value] of Object.entries(object)) {
      if (
        key
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase())
      ) {
        list.push({ key, value: String(value) });
      }
    }
    setData(list);
  }, [object, searchText]);

  const columnLabel = 'key';

  const renderAttributeLabel = text => (
    <b>
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    </b>
  );

  const columns = [
    {
      title: 'Attributo',
      dataIndex: columnLabel,
      key: columnLabel,
      align: 'right',
      width: '30%',
      render: renderAttributeLabel
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
      width: '70%'
    }
  ];

  return (
    <div style={{ padding: '0px 15px' }}>
      <SearchForm
        submit={setSearchText}
        searchValue={searchText || ''}
        placeholder="Ingrese nombre del atributo"
      />
      <Table
        style={{ marginTop: '15px' }}
        columns={columns}
        dataSource={data}
        size="small"
        pagination={false}
        {...props}
      />
    </div>
  );
};

ObjectToTable.propTypes = {
  object: PropTypes.object
};

export default ObjectToTable;
