import {
  Button,
  Col,
  Drawer,
  PageHeader,
  Popconfirm,
  Row,
  message
} from 'antd';
import {
  DeleteOutlined,
  FormOutlined,
  CheckCircleTwoTone,
  MinusCircleOutlined
} from '@ant-design/icons';
import AppliedFilters from 'components/AppliedFilters';
import SearchForm from 'components/SearchForm';
import ObjectsTable from 'components/Table';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useQueryParams,
  ArrayParam,
  NumberParam,
  StringParam
} from 'use-query-params';
import { CustomDateParam } from 'utils/filter-params';
import { displayDateTime } from 'utils/formats';
import { widhFilters } from 'utils/filter-hoc';

import { modelActions } from './data/models';
import FormFilter from './components/FilterForm';
import ObjectForm from './components/ObjectForm';
import { ENTITY_NAME, ENTITY_PLURAL_NAME, PAGE_SIZE } from './constants';

/** Define filters to have, the available choices are
 * label: Show on the filter form and the list of applied filters.
 * type: The params type availables are https://github.com/pbeshai/use-query-params#param-types
 * inForm: define if the filter appear on filters form
 * toDisplay: override the filter value display when the filter is applied
 */
const FILTERS = {
  page: {
    label: 'Pagina',
    type: NumberParam,
    inForm: false
  },
  search: {
    label: 'Buscador',
    type: StringParam,
    inForm: false
  },
  ordering: {
    label: 'Orden',
    type: StringParam,
    canRemove: false,
    inForm: false
  },
  first_name: {
    label: 'Nombre',
    type: StringParam,
    inForm: true
  },
  state: {
    label: 'Estado',
    type: StringParam,
    toDisplay: value => (value === 1 ? 'Inicial' : 'Finalizada'),
    inForm: true
  },
  last_name: {
    label: 'Apellido',
    type: StringParam,
    inForm: true
  },
  date_joined: {
    label: 'Fecha de registro',
    type: CustomDateParam,
    inForm: true
  },
  date_joined_range: {
    label: 'Rango de recha de registro',
    type: ArrayParam,
    inForm: true
  },
  id: {
    label: 'ID',
    type: NumberParam,
    inForm: false
  }
};

const CRUDPage = ({ filters }) => {
  const dispatch = useDispatch();

  // Represent the object on user want to make an action (delete or update).
  // If the currentObj is null, asume the user want to create a new object
  const [currentObj, setCurrentObj] = useState(null);

  const [visibleFilter, setVisibleFilter] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);

  /**
   * Selector to get a list data to receive from server.
   * The expected data is a dict.
   * Ex:
   *  {
   *    results: [],
   *    count: 0,
   *   }
   */
  const objects = useSelector(state => state.users?.listData);

  // Selector to know when the requests update is ready
  const reqCreateSuccess = useSelector(
    state => state.users.reqStatus.create === 'loaded'
  );

  // Selector to know when the requests update is ready
  const reqUpdateSuccess = useSelector(
    state => state.users.reqStatus.update === 'loaded'
  );

  // Selector to know when the requests list is ready
  const reqListLoading = useSelector(
    state => state.users.reqStatus.list !== 'loaded'
  );

  // Selector to know if backend response an error when try create or update object
  const formErrors = useSelector(state => {
    return state.users.errors.create || state.users.errors.update;
  });

  // State to manage queryParams
  const [query, setQuery] = useQueryParams(filters);

  /**
   * Dispatch action to make a requests with the actual queryParams
   */
  const getList = () => {
    // Example to dispatch list action and use success and error callBack functions (those are optionals)
    dispatch(
      modelActions.list(query, null, error => {
        if (error.status !== 401) {
          message.error(
            `Hubo un error al intentar recuperar el listado de ${ENTITY_PLURAL_NAME}`
          );
        }
      })
    );
  };

  /**
   * Every change of query get list from server
   */
  useEffect(() => {
    getList();
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * When change the status of request create or update,
   * check if there arent any error and reset the state
   * of current object and hiden the form
   */
  useEffect(() => {
    if (!formErrors) {
      setCurrentObj(undefined);
      setVisibleForm(false);
    }
  }, [formErrors, reqCreateSuccess, reqUpdateSuccess]);

  /**
   * Update query params
   * @param {queryParams to need change} params
   */
  const onChangeParams = params => {
    setQuery({ ...params, page: 1 });
  };

  // Execute when user want to update an object and define state currentObject and show the form.
  const onUpdate = obj => {
    setCurrentObj(obj);
    setVisibleForm(true);
  };

  // Execute when user want to create a new object. Define the state currentObject as null and show form
  const onCreate = () => {
    setCurrentObj(null);
    setVisibleForm(true);
  };

  // Execute when the form to search is submited
  const search = value => {
    onChangeParams({ search: value === '' ? undefined : value });
  };

  // Execute when the form to filter is submited.
  // Hide the filter form and change the queryPArams with the new values.
  const applyFilter = values => {
    setVisibleFilter(false);
    onChangeParams(values);
  };

  // Execute every time to delete a filter, remove the filter on queryParams.
  const removeFilter = (filterKey, value) => {
    if (value) {
      setQuery({ [filterKey]: query[filterKey].filter(val => val != value) });
    } else {
      setQuery({ [filterKey]: undefined });
    }
  };

  /**
   * Receive a entry object and return a component to represent the options on the every object.
   * Ex: edit object button, delete object button etc.
   * @param {object instance} param0
   */
  const OptionsTable = ({ value }) => (
    <span className="table-column-actions">
      {value.state == 1 && (
        <>
          <Popconfirm
            title={`¿Desea eliminar este ${ENTITY_NAME}?`}
            onConfirm={() => dispatch(modelActions.destroy(value))}
          >
            <DeleteOutlined />
          </Popconfirm>
          <FormOutlined onClick={() => onUpdate(value)} />
        </>
      )}
      <FormOutlined onClick={() => onUpdate(value)} />
    </span>
  );

  const ActiveIcon = ({ value }) =>
    value ? (
      <CheckCircleTwoTone twoToneColor="#52c41a" />
    ) : (
      <MinusCircleOutlined twoToneColor="#ff4747" />
    );

  // Define columns to table, More info in https://ant.design/components/table/#Column
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: true
    },
    {
      title: 'Titulo',
      dataIndex: 'name',
      // render: (text, obj) => `${obj.last_name}, ${obj.first_name}`,
      sorter: true
    },
    {
      title: 'Evento',
      dataIndex: 'event_name',
      sorter: true
    },
    {
      title: 'Estado',
      dataIndex: 'state'
    },
    {
      title: 'Fecha de inicio',
      dataIndex: 'specific_time',
      render: date => displayDateTime(date),
      sorter: true
    },
    {
      title: 'Activo',
      dataIndex: 'active',
      render: value => ActiveIcon({ value })
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: obj => OptionsTable({ value: obj })
    }
  ];

  return (
    <div className="generic-crud-section">
      <Drawer // https://ant.design/components/drawer/
        title={
          currentObj === null ? `Crear ${ENTITY_NAME}` : `Editar ${ENTITY_NAME}`
        }
        className="ant-drawer-horizontal"
        visible={visibleForm}
        onClose={() => setVisibleForm(false)}
        style={{
          overflow: 'auto',
          height: '100%'
        }}
      >
        <ObjectForm
          currentObj={currentObj}
          onClose={() => setVisibleForm(false)}
          formErrors={formErrors}
          create={data => dispatch(modelActions.create(data))}
          update={data => dispatch(modelActions.update(data))}
        />
      </Drawer>

      <Drawer
        title="Filtros"
        placement="top"
        closable={false}
        className="ant-drawer-vertical"
        onClose={() => setVisibleFilter(false)}
        visible={visibleFilter}
      >
        <FormFilter
          onSubmit={applyFilter}
          onCancel={() => setVisibleFilter(false)}
          filtersData={FILTERS}
          appliedFilters={query}
        />
      </Drawer>
      <PageHeader // https://ant.design/components/page-header/
        title={ENTITY_PLURAL_NAME}
        onBack={() => window.history.back()}
        subTitle="listado de usuarios registrados"
        className="page-header"
        extra={[
          <Button
            type="primary"
            onClick={() => onCreate()}
            className="btn-actions"
            key="btn_new"
          >
            Nuevo {ENTITY_NAME}
          </Button>
        ]}
      >
        <Row>
          <Col md={12} sm={24}>
            <SearchForm
              submit={search}
              searchValue={query.search || ''}
              placeholder="Ingrese email, nombre o apellido"
            />
          </Col>
          <Col md={12} sm={24}>
            <Button
              onClick={() => setVisibleFilter(true)}
              className="btn-open-filters-form"
            >
              Filtros
            </Button>
          </Col>
        </Row>
        <Row className="form-filters">
          <Col md={24} sm={24} className="container-applied-filters">
            <AppliedFilters
              filters={query}
              removeFilter={removeFilter}
              configFilters={FILTERS}
            />
          </Col>
        </Row>

        <ObjectsTable
          results={objects.results}
          columns={columns}
          pagination={{
            total: objects.count,
            current: query.page ? query.page : 1,
            pageSize: PAGE_SIZE,
            showSizeChanger: false
          }}
          loading={reqListLoading}
          footer={() =>
            `Total de ${ENTITY_PLURAL_NAME.toLowerCase()} encontrados ${
              objects.count
            }`
          }
          onChangeParams={onChangeParams}
          sortedField={query.ordering || ''}
          onChangePage={page => setQuery({ page })}
          tableLayout="auto"
        />
      </PageHeader>
    </div>
  );
};

export default widhFilters(CRUDPage, FILTERS);
