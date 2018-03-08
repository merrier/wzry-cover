import 'isomorphic-fetch';

const callApi = (endpoint, fetchOpts) => {
  const fullUrl = endpoint;

  if (
    fetchOpts.method &&
    (fetchOpts.method.toLowerCase() === 'post' ||
      fetchOpts.method.toLowerCase() === 'put' ||
      fetchOpts.method.toLowerCase() === 'delete')
  ) {
    fetchOpts.headers = { 'Content-type': 'application/json' };
    fetchOpts.body =
      typeof fetchOpts.body === 'object'
        ? JSON.stringify(fetchOpts.body)
        : fetchOpts.body;
  }

  if (fetchOpts.downloadCSV) {
    fetchOpts.headers = { 'Content-type': 'text/csv; charset=UTF-8' };
  }

  fetchOpts.credentials = 'same-origin';

  const timer = new Promise((resolve, reject) => {
    setTimeout(reject, fetchOpts.timeout || 5000, {
      message: 'Request Timeout'
    });
  });

  const fetchCb = fetch(fullUrl, fetchOpts)
    .then(response => {
      if (response.headers.get('content-type').match('application/json')) {
        return response.json().then(json => ({
          json,
          response
        }));
      } else {
        console.error(`Request Error: ${fullUrl}`);
        return {
          json: {
            data: {},
            message: 'Request Error'
          },
          response
        };
      }
    })
    .catch(e => {
      console.error(`Request Exception：${e}`);
    })
    .then(({ json, response }) => {
      if (!response.ok || json.message !== 'success') {
        return Promise.reject(json);
      }
      return json;
    });
  return Promise.race([fetchCb, timer]);
};

export const CALL_API = Symbol('Call API');

export default ({ dispatch, getState }) => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { types, fetchOpts } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    if (data.error && data.error.match('Cannot read property')) {
      finalAction.error = 'Server Error';
    }
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(
    actionWith({
      type: requestType
    })
  );

  return callApi(endpoint, fetchOpts).then(
    response =>
      next(
        actionWith({
          response,
          type: successType
        })
      ),
    error =>
      next(
        actionWith({
          type: failureType,
          error: error.message || 'Something bad happened'
        })
      )
  );
};
