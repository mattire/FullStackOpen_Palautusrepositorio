import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  beforeEach(() => {
    const user = {
      id: '123',
      token: 'abc123'
    }
    window.localStorage.setItem('user', JSON.stringify(user))
  })
  
  
  test('renders content', async () => {
    const titleStr = 'Component testing is done with react-testing-library'
    const authorStr = "Zuckerberg"
    const urlStr = 'www.Component.com'
    const likesStr = '0'
  
    const blog = {
      title: titleStr,
      author: authorStr,
      url: urlStr,
      likes: parseInt(likesStr)
    }
  
    const remHandler = () => {  };
  
    const mockHandler = vi.fn()
  
    await render(<Blog blog={blog} removeHandler={remHandler} likeLogFunc={mockHandler} />)
  
    console.log('=============================');
    console.log(titleStr);
    console.log(authorStr);
    console.log('=============================');
    
  
    // const element1 = screen.getByText  (titleStr , { exact: false }); expect(element1).toBeDefined(); 
    // const element2 = screen.getByText  (authorStr, { exact: false }); expect(element2).toBeDefined(); 
    // const element3 = screen.queryByText(urlStr   , { exact: false }); expect(element3).toBeNull(); 
    // const element4 = screen.queryByText(likesStr , { exact: false }); expect(element4).toBeNull(); 
  
    // console.log([titleStr, authorStr])
  
    [ titleStr, authorStr ].forEach(s => {
      const element = screen.getByText(s, { exact: false }); expect(element).toBeDefined() });
    [ urlStr, likesStr ].forEach(s => {
      const element = screen.queryByText(s, { exact: false }); expect(element).toBeNull() });
  
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
  
    const element5 = screen.queryByText(urlStr, { exact: false }); expect(element5).toBeDefined() 
    const element6 = screen.queryByText(likesStr, { exact: false }); expect(element6).toBeDefined() 
  
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
  
})