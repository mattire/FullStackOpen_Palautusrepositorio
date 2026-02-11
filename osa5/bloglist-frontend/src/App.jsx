import { useState, useEffect, useRef } from 'react'
import Blog         from './components/Blog'
import Notification from './components/Notification'
import NewBlog      from './components/NewBlog'
import Toggable      from './components/Togglable'
import blogService  from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs]       = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser]         = useState(null)

  const [newBlog, setNewBlog] = useState({ title: '', author:'', url:''}) 

  const [styleNotification, setStyleNotification] = useState({msg: '', style: 'notif'})

  const blogFormRef = useRef()

  const lsUser   = window.localStorage.getItem('user');
  const loggedIn = lsUser != null;
  const userOjb  = JSON.parse(lsUser)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleNewBlog = async (e) => {
    e.preventDefault()
    blogFormRef.current.toggleVisibility()
try {
      const r = await blogService.postNewBlogObj(newBlog, userOjb.id, userOjb.token)
      if(r.request.status==201){
        console.log(r.data);
        setNewBlog({ title: '', author:'', url:''})
        var newBlogs = blogs.concat(r.data)
        setBlogs(newBlogs)
        setTimedNotif({msg:`Creating blog ${newBlog.title} succeeded`, style : "notif"})
      } else {
        setTimedNotif({msg:`Creating blog ${newBlog.title} failed`, style: "error"})
      }
    } catch (error) {
      setTimedNotif({msg:`Creating blog ${newBlog.title} failed`, style: "error"})
    }  
  }

  const setTimedNotif = (notifObj) => {
      setStyleNotification(notifObj)
      setTimeout(function() { 
        setStyleNotification({ msg: '', style: "notif"})
      }.bind(this), 4000 )
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
      setTimedNotif({ msg: 'login successful', style: 'notif'})
    } catch (error) {
      console.log(error);
      //console.log(error.request.statusText);
      setTimedNotif({ msg: `login failed ${error.request.statusText} ${error}`, style: 'error'})
    }
  }

  const handleLogout = async(e) => {
    window.localStorage.removeItem('user', null);
    setUser(null)
    //setStyleNotification({ msg: 'logout successful', style: 'notif'})
    setTimedNotif({ msg: 'logout successful', style: 'notif'})
  }


  if(!loggedIn){
    return (
      <div> 
        <h2>log in to application</h2>               
        <Notification msg = {styleNotification.msg} style={styleNotification.style}/>
        <form onSubmit={handleLogin}>
        <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={( event ) => { setUsername(event.target.value) }
          } 
            // onChange={( target ) => setUsername(target.value)}
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
        <Notification msg = {styleNotification.msg} style={styleNotification.style}/>
        <div>
          {userOjb.name} logged in<button onClick={()=> handleLogout()}>logout</button>
        </div><br/>

        <Toggable buttonLabel="Create new blog" ref={blogFormRef}>
          <NewBlog 
                newBlog={newBlog} 
                setNewBlog = {setNewBlog}
                handleNewBlog = {handleNewBlog}
                >
          </NewBlog>
        </Toggable>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App