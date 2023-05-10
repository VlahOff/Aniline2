const request = async (method, url, data) => {
  const options = {};
  const userData = JSON.parse(localStorage.getItem('userData'));

  if (method !== 'GET') {
    options.method = method;

    if (data) {
      options.headers = {
        'Content-type': 'application/json',
      };
      options.body = JSON.stringify(data);
    }
  }

  if (userData) {
    options.headers = {
      ...options.headers,
      'X-Authorization': userData.accessToken,
    };
  }

  const response = await fetch(url, options);
  return response.json();
};

export const fetchApi = {
  get: request.bind(null, 'GET'),
  post: request.bind(null, 'POST'),
  put: request.bind(null, 'PUT'),
  delete: request.bind(null, 'DELETE'),
};
