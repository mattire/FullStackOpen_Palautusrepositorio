import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlog'
const assert = require('node:assert')


describe('<NewBlog />', () => {
   beforeEach(() => {
     const user = {
       id: '123',
       token: 'abc123'
     }
     window.localStorage.setItem('user', JSON.stringify(user))
  })

  test('NewBlog calls callback, and returns typed inputs texts when clicking create', async () => {
    
    const mockHandler = vi.fn()  
    render(<NewBlog handleNewBlog = {mockHandler} /> )
    
    const titleStr = 'Component testing is done with react-testing-library'
    const authorStr = "Zuckerberg"
    const urlStr = 'www.Component.com'

    const user = userEvent.setup()
    //const blogInputFields = ['title', 'author', 'url']

    const blogInputFieldsAndTexts = [ 
        ['title', titleStr],
        ['author', authorStr],
        ['url', urlStr],
    ]
    const input = await screen.findByAltText(blogInputFieldsAndTexts[0][0])
    await user.type(input, blogInputFieldsAndTexts[0][1])    
    const input2 = await screen.findByAltText(blogInputFieldsAndTexts[1][0])
    await user.type(input2, blogInputFieldsAndTexts[1][1])    
    const input3 = await screen.findByAltText(blogInputFieldsAndTexts[2][0])
    await user.type(input3, blogInputFieldsAndTexts[2][1])    

    const button = screen.getByText('create')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
    //console.log('*********************************');
    //console.log('mockHandler.mock.calls[0][0]');
    //console.log(mockHandler.mock.calls[0][0]);
    //console.log('*********************************');
    let blog = mockHandler.mock.calls[0][0].blog
    assert.strictEqual(blog.title ,titleStr)
    assert.strictEqual(blog.author,authorStr)
    assert.strictEqual(blog.url   ,urlStr)
    
  })
 })