import { useState } from 'react'

const Blog = ({ blog }) => {
  
  const [viewing, SetViewState] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const ViewBlog = (e) => {
    SetViewState(!viewing)
  }
  if(viewing){
    return (
      <div style={blogStyle}>
        {blog.title} <br/>
        {blog.author} <br/>
        {blog.url} <br/>
        {blog.likes} <br/>
        {blog.user?.name} <br/>
        <button onClick={ViewBlog}>view</button>
      </div>    
    )
  }
  else {
    return (
    <div>
      {blog.title} {blog.author} <button onClick={ViewBlog}>view</button>
    </div>  
    )
  }
}


export default Blog