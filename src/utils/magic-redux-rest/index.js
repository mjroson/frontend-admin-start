import { createReducer } from '@reduxjs/toolkit';
import generateReducer from './genericReducers';
import generateactions from './genericActions';

export const initialState = {
  listData: {
    count: 0,
    results: []
  },
  currentData: {},
  errors: {},
  loading: false,
  reqStatus: {}
};
const DEFAULT_PAGE_SIZE = 15;
class ModelReduxRest {
  constructor(config, state = initialState, reducerManager = {}, actions = {}) {
    this.config = config;
    const { pageSize = DEFAULT_PAGE_SIZE } = config;
    this.actions = generateactions(
      config.entityName,
      config.ApiUrl,
      actions,
      pageSize
    );

    this.reducer = this.initializeReducer(state, reducerManager);
  }

  initializeReducer = (state, reducerManager) =>
    createReducer(state, {
      ...generateReducer(this.config.entityName),
      ...reducerManager
    });
}

export default ModelReduxRest;
