import axios from 'axios'
import { use } from 'react'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postNewBlogObj = async (newBlog, userid, token) => {
  return await postNewBlog(newBlog.title, newBlog.author, newBlog.url, userid, token);   
}

const postNewBlog = async (title, author, url, userid, token) => {
  try {    
    const newBlog = {
      'title' : title,
      'author' : author,
      'url' : url,
      'likes' : 0,
      'userId' : userid,
    }
    console.log(newBlog);
    
    const resp = await axios.post(baseUrl, newBlog, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return resp
  } catch (error) {
    console.log(error);
    return error
  }

}

export default { getAll, postNewBlog, postNewBlogObj }