import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [newBlog, setNewBlog] = useState({ title: '', author:'', url:''}) 

  const lsUser = window.localStorage.getItem('user');
  const loggedIn = lsUser != null;
  const userOjb = JSON.parse(lsUser)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleNewBlog = async (e) => {
    e.preventDefault()
    // console.log(newBlog.title, newBlog.author, newBlog.url);   
    // console.log(userOjb.token);
    // console.log(userOjb);
    const r = await blogService.postNewBlogObj(newBlog, userOjb.id, userOjb.token)
    if(r.request.status==201){
      console.log(r.data);
      setNewBlog({ title: '', author:'', url:''})
      // setTitle('')
      // setUrl('')
      // setAuthor('')
      var newBlogs = blogs.concat(r.data)
      setBlogs(newBlogs)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      var jsonUser = JSON.stringify(user)
      window.localStorage.setItem('user', jsonUser)
      setUsername('')
      setPassword('')
      setUser(jsonUser)
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = async(e) => {
    window.localStorage.removeItem('user', null);
    setUser(null)
  }


  if(!loggedIn){
    return (
      <div> 
        <h2>log in to application</h2>               
        <form onSubmit={handleLogin}>
        <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            />
        </label>
        </div>
        <div>
          <label>
            password
            <input
              type="text"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              />
          </label>
        </div>
        <button type="submit">login</button>
        </form>
      </div>
      )
  }
  else{
    return (
      <div>
        <h2>blogs</h2>
        <div>
          {userOjb.name} logged in<button onClick={()=> handleLogout()}>logout</button>
        </div><br/>
        <h2>create new</h2>
        <form onSubmit={handleNewBlog}>

        <label>
          title:
          <input
            type="text"
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}
            />
        </label><br/>
        <label>
          author:
          <input
            type="text"
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}
            />
        </label><br/>
        <label>
          url:
          <input
            type="text"
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}
            />
        </label><br/>
        <button type="submit">create</button>
        <br/><br/>

        </form>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App