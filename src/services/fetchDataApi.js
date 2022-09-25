import axios from 'axios';
const URL = 'https://pixabay.com/api/';
const API_KEY = '29162454-addc068f3f814e0a3a02d912a';
export async function fetchDataApi(query, page) {
  const PARAMS = {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 15,
    page,
    q: query,
  };
  const response = await axios.get(URL, {
    params: PARAMS,
  });
  return response.data;
}
