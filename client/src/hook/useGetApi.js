import { useEffect, useState } from 'react';

export const useGetApi = (api = () => {}, params = {}, initData = null) => {
  const [data, setData] = useState(initData);
  async function fetchData() {
    const response = await api({ ...params });
    if (response) setData(response);
  }
  useEffect(() => {
    fetchData();
  }, [JSON.stringify(params)]);
  return data;
};
