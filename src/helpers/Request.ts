import store from '../store';
import { logout } from '../features/auth/authSlice';

type OracleDate = {
  $date: string
}

type QueryParameter = {
  $eq?: string | number | OracleDate,
  $ne?: string | number | OracleDate,
  $lt?:  number | OracleDate,
  $lte?: number | OracleDate,
  $gt?: number | OracleDate,
  $gte?: number | OracleDate,
  $instr?: string ,
  $ninstr?: string,
  $like?: string,
  $null?: null,
  $notnull?: null,
  $between?: [string | OracleDate, string | OracleDate]
}

type OrderByParameter = {
  [key: string]: string
}

type RestQuery = {
  [key: string]: string | QueryParameter | OrderByParameter
}

type Options = {
  limit?: string | number,
  offset?: string | number,
  [key: string]: string | number | undefined
}

export const request = (url: string, query?: RestQuery, options?: Options) => {
  const auth = store.getState().auth;
  let fullUrl = `https://glusfqycvwrucp9-db202012181437.adb.eu-zurich-1.oraclecloudapps.com/ords/sensor_datalake/sens${url}`;
  const queryParams = [];
  if (query) {
    queryParams.push(`q=${JSON.stringify(query)}`);
  }
  if (options) {
    Object.keys(options).forEach(key => {
      queryParams.push(`${key}=${options[key]}`);
    });
  }
  if (queryParams.length > 0) {
    fullUrl += `?${queryParams.join('&')}`;
  }
  const headers = new Headers();
  headers.set('Authorization', `Basic ${auth.token}`);
  return fetch(fullUrl, {
    method: 'GET',
    headers
  })
    .then(result => {
      if (result.ok) {
        return result.json();
      }
      store.dispatch(
        logout()
      );
      return Promise.reject(new Error(result.statusText));
    });
}

export const requestItems = <T extends unknown>(url: string, query?: RestQuery, options?: Options, items: T[] = []): Promise<T[]> => {
  return request(url, query, options).then((result) => {
    const newItems = items.concat(result.items);
    if (result.hasMore) {
      const updatedOptions: Options = {
        offset: 0,
        ...options
      };
      updatedOptions.offset += result.count;
      return requestItems(url, query, updatedOptions, newItems);
    }
    return newItems;
  });
}

export const requestItem = <T extends unknown>(url: string, query?: RestQuery, options?: Options): Promise<T> => {
  return request(url, query, options);
}