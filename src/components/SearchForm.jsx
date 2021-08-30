import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';

const { Search } = Input;

const SearchForm = ({ searchValue = '', submit, placeholder = '' }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ search: searchValue });
  }, [searchValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form form={form} name="searchForm">
      <Form.Item name="search">
        <Search
          placeholder={placeholder}
          className="search-input"
          onSearch={value => submit(value)}
          style={{ width: '100%' }}
          enterButton
          allowClear
        />
      </Form.Item>
    </Form>
  );
};

SearchForm.propTypes = {
  searchValue: PropTypes.string,
  submit: PropTypes.func,
  placeholder: PropTypes.string
};

export default SearchForm;
