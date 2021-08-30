import axios from 'axios';

const initialState = {
  templateConfigs: null,
  reqStatus: {}
};

const ROOT_NAME = 'general';

const ACTION_TYPES = {
  SET_TEMPLATES_CONFIG: `${ROOT_NAME}/SET_TEMPLATES_CONFIG`
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_TEMPLATES_CONFIG:
      return {
        ...state,
        templateConfigs: action.payload
      };
    default:
      return state;
  }
}

export function fetchTemplatesConfig() {
  return dispatch => {
    const reqName = 'getTemplateConfig';
    axios
      .get('/api/template-config/')
      .then(resp => {
        dispatch({
          type: ACTION_TYPES.SET_TEMPLATES_CONFIG,
          payload: resp.data,
          reqName
        });
      })
      .catch(e => {
        console.log('Get template config error ', e);
      });
  };
}

export const getTemplateConfig = state => state.general.templateConfigs;
