import axios from 'axios';
import history from '../history';

// axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

const getFormData = object =>
  Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());

axios.interceptors.response.use(
  response => response,
  error => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      const formData = getFormData({
        grant_type: 'refresh_token',
        client_id: process.env.REACT_APP_API_CLIENT_ID,
        refresh_token: window.localStorage.getItem('refresh_token')
      });
      axios
        .post('api-token-refresh/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(resp => {
          const token = resp.data.access_token;
          window.localStorage.setItem('token', token);
          window.localStorage.setItem('refresh_token', resp.data.refresh_token);
          error.config.headers['Authorization'] = `Bearer ${token}`;
          error.config.baseURL = undefined;
          axios
            .request(error.config)
            .then(retryResp => {
              return Promise.resolve(retryResp);
            })
            .catch(retryError => {
              return Promise.reject(retryError);
            });
        })
        .catch(e => {
          console.warn('Refresh token error ', e);
          history.push(`/login?next=${history.location.pathname}`);
          return Promise.reject(e);
        });
    } else {
      return Promise.reject(error);
    }
  }
);

axios.interceptors.request.use(request => {
  const token = window.localStorage.getItem('token');

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});
