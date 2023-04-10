import jwtdecoder from 'jwt-decode';

type Token = {
  expiring: number;
  authorized: boolean;
}

const getCookie = (): string | undefined => {
  const value = '; ' + document.cookie;
  const parts = value.split('; GRAPHQL_TOKEN=');

  const firstMatch = parts.pop();
  if (firstMatch !== undefined) {
    return firstMatch.split(';').shift();
  }
};

export const getToken = (): Token | undefined => {
  const cookie = getCookie();

  if (cookie !== undefined && cookie !== '') {
    return jwtdecoder(cookie);
  }

  return undefined;
};


export const doFetch = async (url: string, method: string, data?: any): Promise<{status: number, data: any}>  => {
  const response = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: 'same-origin', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    body: method !== 'GET' ? JSON.stringify(data) : undefined // body data type must match "Content-Type" header
  });

  const parseData = await response.json();

  return {
    status: response.status,
    data: parseData,
  };
};

