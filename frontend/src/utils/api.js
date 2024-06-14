async function apiRequest(method, endpoint, headers, data ) {
  endpoint = endpoint.replace(/^\//, '');
  return await fetch(
    `${process.env.REACT_APP_API_HOST}/${endpoint}`,
    {
      method: method,
      headers: headers,
      body: data,
    }
  )
}

async function jsonApiRequest(method, endpoint, data) {
  return apiRequest(method, endpoint, {
    "Content-Type": "application/json",
  }, JSON.stringify(data))
}

export {apiRequest, jsonApiRequest}