import React, { useReducer, useEffect } from 'react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Select, Spin } from 'antd';

const initialState = {
  data: [],
  fetching: false,
  lastFetchId: 0
};

function reducer(state, action) {
  switch (action.type) {
    case 'searching':
      return {
        ...state,
        lastFetchId: state.lastFetchId + 1,
        data: [],
        fetching: true
      };
    case 'searched':
      return {
        ...state,
        data: action.payload,
        fetching: false
      };
    default:
      throw new Error();
  }
}

const SearchAsync = (
  { endPoint, labelName, keyName, value, onChange, async = false, ...props },
  ref
) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (async && value && !state.data.length) {
      axios
        .get(`${endPoint}${value}/`)
        .then(resp => {
          dispatch({
            type: 'searched',
            payload: [
              {
                label: resp.data[labelName],
                value: resp.data[keyName]
              }
            ]
          });
        })
        .catch(e => {
          console.log(`SearchAsync error ${endPoint} `, e);
        });
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchSearch = textValue => {
    dispatch({ type: 'searching' });
    axios
      .get(`${endPoint}${textValue ? `?search=${textValue}&limit=100` : ''}`)
      .then(resp => {
        const payload = resp.data.results.map(item => ({
          label: item[labelName],
          value: item[keyName]
        }));
        dispatch({
          type: 'searched',
          payload
        });
      })
      .catch(e => {
        console.log(`SearchAsync error ${endPoint} `, e);
      });
  };

  useEffect(() => {
    if (!async) {
      fetchSearch();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const asynFetchSearch = debounce(fetchSearch, 800);

  const dynamicProps = {};

  if (async) {
    dynamicProps['onSearch'] = asynFetchSearch;
  }

  return (
    <Select
      value={value ? Number(value) : undefined}
      ref={ref}
      showSearch
      notFoundContent={state.fetching ? <Spin size="small" /> : null}
      filterOption={false}
      // onSearch={asynFetchSearch}
      onChange={onChange}
      defaultActiveFirstOption={false}
      style={{ minWidth: '200px' }}
      status={state.data.length}
      options={state.data}
      {...dynamicProps}
    />
  );
};

SearchAsync.propTypes = {
  endPoint: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  keyName: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

export default React.forwardRef(SearchAsync);
