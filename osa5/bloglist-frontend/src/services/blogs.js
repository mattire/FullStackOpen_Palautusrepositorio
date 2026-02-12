import axios from 'axios'
import { use } from 'react'
const baseUrl = '/api/blogs'

const getHeaders = (token) => {  
  return(
   {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
   }
  )
};

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

const putBlogObj = async (blog, userid, token) => {
  const url = `${baseUrl}/${blog.id}`
  const resp = await axios.put(url, 
    {
      user: userid,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }, 
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  return resp
}

const delBlogObj = async (blogId, token) => {
  const url = `${baseUrl}/${blogId}`
  const h = getHeaders(token)
  return await axios.delete(url, { headers: h})
}


export default { getAll, postNewBlog, postNewBlogObj, putBlogObj, delBlogObj }