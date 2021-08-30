import ModelReduxRest from 'utils/magic-redux-rest';

import {
  ENDPOINT,
  ENTITY_NAME,
  ENTITY_PLURAL_NAME,
  PAGE_SIZE
} from '../constants';

const config = {
  entityName: ENTITY_NAME,
  entityNamePluralName: ENTITY_PLURAL_NAME,
  ApiUrl: ENDPOINT,
  pageSize: PAGE_SIZE
};

const model = new ModelReduxRest(config);

export const modelActions = model.actions;
export const modelReducer = model.reducer;
