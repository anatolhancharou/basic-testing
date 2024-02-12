import axios, { Axios } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const spy = jest.spyOn(axios, 'create');
    jest.spyOn(Axios.prototype, 'get').mockResolvedValueOnce({ data: [] });
    await throttledGetDataFromApi('people');
    expect(spy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const spy = jest
      .spyOn(Axios.prototype, 'get')
      .mockResolvedValueOnce({ data: [] });
    await throttledGetDataFromApi('todos');
    expect(spy).toHaveBeenCalledWith('todos');
  });

  test('should return response data', async () => {
    jest
      .spyOn(Axios.prototype, 'get')
      .mockResolvedValueOnce({ data: [{ id: 1 }] });
    const data = await throttledGetDataFromApi('photos');
    expect(data).toEqual([{ id: 1 }]);
  });
});
