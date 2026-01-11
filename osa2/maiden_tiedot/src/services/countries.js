import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'
const allUrl = '/api/all'
const byName = '/api/name/{name}'

// global
var result = [];

const getAll = () => {
  return axios.get(baseUrl + allUrl).then(response => response.data);
//   result = axios.get(baseUrl + allUrl).then(response => response.data);
//   return result;
}

const getByName = (name) => {
  const end = `/api/name/${name}`
  const url = baseUrl + end
  console.log(url);
  
  return axios.get(url).then(response => response.data)
}

export default 
{ 
  getAll, 
  getByName
}