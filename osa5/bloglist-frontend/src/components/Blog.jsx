import { useState } from 'react'
import blogSrvc  from '../services/blogs'

const Blog = ({ blog, removeHandler, likeLogFunc }) => {

  const [viewing, SetViewState] = useState(false)
  const [likes, SetLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const getUserIdToken = () => {
    const userStr     = window.localStorage.getItem('user')
    const user        = JSON.parse(userStr)
    return ( { id: user.id, token: user.token })
  }

  const ViewBlog = (e) => {
    console.log(e)
    SetViewState(!viewing)
  }
  const DelBlog = () => {
    if(window.confirm(`Remove blog ${blog.title}`)){
      const userProps = getUserIdToken()
      console.log(`blog ${blog}`)
      console.log(`blog.id ${blog.id}`)
      blogSrvc.delBlogObj(blog.id, userProps.token)
      removeHandler(blog)
    }
  }

  const SendLike = async () => {
    try {
      if(likeLogFunc){ likeLogFunc() }

      const userProps = getUserIdToken()
      // const userStr     = window.localStorage.getItem('user')
      // const user        = JSON.parse(userStr);
      blog.likes += 1
      await blogSrvc.putBlogObj(blog, userProps.id, userProps.token)
      SetLikes(blog.likes)
    } catch (error) {
      console.log(error)
    }
  }

  if(viewing){
    return (
      <div style={blogStyle}>
        {blog.title} <br/>
        {blog.author} <br/>
        {blog.url} <br/>
        Likes {likes} <button onClick={SendLike}>like</button> <br/>
        {blog.user?.name} <br/>
        <button onClick={ViewBlog}>hide</button>
        <button onClick={DelBlog}>delete</button>
      </div>
    )
  }
  else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={ViewBlog}>view</button>
      </div>
    )
  }
}

export default Blog