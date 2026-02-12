import { useState } from 'react'

const NewBlog  = ({ handleNewBlog }) => {

  const [newBlog, setNewBlog] = useState({ title: '', author:'', url:'' })

  const blogInputFields = ['title', 'author', 'url']

  const afterBlogSending = () => {
    setNewBlog({ title: '', author:'', url:'' })
  }

  const OnSubmitNewBlog = (e) => {
    e.preventDefault()
    handleNewBlog( { blog: newBlog, aftersend: afterBlogSending })
  }

  return (
    <div>
      <button>create new blog</button>
      <h2>create new</h2>
      <form onSubmit={ OnSubmitNewBlog }>
        {blogInputFields.map(field => (
          <label key={field} style={{ display: 'flex', marginBottom: '8px' }}>
            <div style={{ width: '80px' }}>
              {field}:
            </div>
            <input
              type='text'
              value={newBlog[field]}
              onChange = { ({ target }) =>
                setNewBlog({ ...newBlog, [field]: target.value })
              }
            />
            <br />
          </label>
        ))}

        <button type='submit'>create</button>
        <br/><br/>

      </form>
    </div>
  )
}

export default NewBlog