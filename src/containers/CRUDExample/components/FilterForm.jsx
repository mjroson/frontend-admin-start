import { Button, Form, Input, DatePicker } from 'antd';
import React, { useEffect } from 'react';

const { RangePicker } = DatePicker;

const FilterForm = ({ onSubmit, onCancel, appliedFilters, filtersData }) => {
  const [form] = Form.useForm();

  /**
   * Clean attributes to initialData if it's not a attribute form
   */
  const getFilterDataToForm = () => {
    const data = {};
    for (const [key, value] of Object.entries(appliedFilters)) {
      if (filtersData[key]?.inForm) {
        data[key] = value;
      }
    }
    return data;
  };

  useEffect(() => {
    if (appliedFilters != null) {
      form.setFieldsValue({ ...getFilterDataToForm() });
    }
  }, [appliedFilters]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form form={form} onFinish={onSubmit} layout="vertical">
      <Row gutter={24} style={{ width: '100%' }}>
        <Col sm={24} md={8} lg={8}>
          <Form.Item label="Nombre" name="first_name">
            <Input placeholder="Ingresa el nombre completo" />
          </Form.Item>
        </Col>
        <Col sm={24} md={8} lg={8}>
          <Form.Item label="Apellido" name="last_name">
            <Input placeholder="Ingresa el apellido completo" />
          </Form.Item>
        </Col>
        <Col sm={24} md={8} lg={8}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Ingresa el email" />
          </Form.Item>
        </Col>
        <Col sm={24} md={8} lg={8}>
          <Form.Item label="Fecha de registro" name="date_joined">
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>
        </Col>
        <Col sm={24} md={8} lg={8}>
          <Form.Item label="Fecha" name="date_joined_range">
            <RangePicker format="YYYY-MM-DD" />
          </Form.Item>
        </Col>
      </Row>
      <div className="drawer-footer">
        <Button
          type="secondary"
          onClick={onCancel}
          className="btn-forms-action"
        >
          Cancelar
        </Button>
        <Button type="primary" htmlType="submit" className="btn-forms-action">
          Aplicar filtros
        </Button>
      </div>
    </Form>
  );
};

export default FilterForm;
