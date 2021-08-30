import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';
import { ArrayParam } from 'use-query-params';

const AppliedFilters = ({ filters, removeFilter, configFilters = {} }) => {
  const activeFiltersKeys =
    Object.keys(filters).filter(key => filters[key] !== undefined) || [];

  const displayValue = (key, value = null) => {
    // Check if filter config has a function to display the current filter.
    if (typeof configFilters[key]?.toDisplay === 'function') {
      return configFilters[key].toDisplay(value || filters[key]);
    }
    return filters[key];
  };

  const displayLabel = label => configFilters[label]?.label ?? label;

  const DisplayFilter = ({ filterKey }) => {
    if (configFilters[filterKey].type === ArrayParam) {
      return filters[filterKey].map(value => (
        <Tag
          closable={configFilters[filterKey].canRemove !== false}
          onClose={() => removeFilter(filterKey, value)}
          key={`${filterKey}-${value}`}
          visible
        >
          <b>{displayLabel(filterKey)}</b> : {displayValue(filterKey, value)}
        </Tag>
      ));
    }
    return (
      <Tag
        closable={configFilters[filterKey].canRemove !== false}
        onClose={() => removeFilter(filterKey)}
        key={filterKey}
        visible
      >
        <b>{displayLabel(filterKey)}</b> : {displayValue(filterKey)}
      </Tag>
    );
  };

  if (activeFiltersKeys.length === 0) {
    return 'Sin filtros aplicados.';
  }

  return (
    <>
      <b>Filtros aplicados: </b>
      {activeFiltersKeys.map(value => (
        <DisplayFilter filterKey={value} />
      ))}
    </>
  );
};

AppliedFilters.propTypes = {
  filters: PropTypes.object,
  removeFilter: PropTypes.func,
  configFilters: PropTypes.object
};

export default AppliedFilters;
