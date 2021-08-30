import React, { useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import PropTypes from 'prop-types';

const { Dragger } = Upload;

const UploaderSingleFile = (
  { value, onChange, accept = '*', title, description = '' },
  ref
) => {
  const [files, setFile] = useState([]);

  useEffect(() => {
    if (value) {
      setFile([value]);
    } else {
      setFile([]);
    }
  }, [value]);

  return (
    <Dragger
      beforeUpload={file => {
        onChange(file);
        return false;
      }}
      ref={ref}
      onRemove={() => onChange(null)}
      accept={accept}
      multiple={false}
      fileList={files}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{title}</p>
      <p className="ant-upload-hint">{description}</p>
    </Dragger>
  );
};

UploaderSingleFile.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  title: PropTypes.string.isRequired,
  description: PropTypes.string
};

export default React.forwardRef(UploaderSingleFile);
