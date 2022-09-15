import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImagesByValue (value, page = 1){
  const API_KEY = '29332799-a92cd8e6a78297bd57d7c923a';
const searchParams = new URLSearchParams({
  key: API_KEY,
  q: value,
  image_type: 'photo',
  orientation: 'horizontal',
  page: page,
  per_page: 12,
});

const response = await axios.get(`?${searchParams}`);
return response;
}
