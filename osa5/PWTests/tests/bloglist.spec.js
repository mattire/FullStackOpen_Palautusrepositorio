const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, loginTest, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Reijonen',
        username: 'MatTire',
        password: 'swordfish'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Jack Dalton',
        username: 'JaDal',
        password: 'swordfish2'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginTitleLocator = page.getByRole('heading', { name: 'log in to application' })
    const userNameLocator = page.getByRole('textbox', { name: 'username' })
    const passwordNameLocator = page.getByRole('textbox', { name: 'password' })

    for (const l of [loginTitleLocator, userNameLocator, passwordNameLocator]){
        await expect(l).toBeVisible()
    }
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await loginTest(page, 'MatTire', 'swordfish', 'Matti Reijonen')  
    })

    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'HanSolo', 'Chewbacca')    
        await expect(page.getByText('Han Solo logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => { loginTest(page, 'MatTire', 'swordfish', 'Matti Reijonen') })

    test('user can create blog', async ({ page }) => {
        const title  = 'Kinney Chase'
        const author = 'Billy The Kid'
        await createBlog(page, title, author, 'www.kinney.com')  

        await page.waitForTimeout(3000);
        //await expect(page.getByText(`${blogInputFieldsAndIputs['title']} ${blogInputFieldsAndIputs['author']}`)).toBeVisible()
        var searchTxt = `${title} ${author}`
        await expect(page.getByText(searchTxt)).toBeVisible()
    })

    describe('When blog created', () => {
      beforeEach(async ({ page, request }) => {
        const title  = 'Kinney Chase'
        const author = 'Billy The Kid'
        await createBlog(page, title, author, 'www.kinney.com')  
        var searchTxt = `${title} ${author}`
        await expect(page.getByText(searchTxt)).toBeVisible()
      })
      
      test('blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()

        await expect(page.getByText('like')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(3000);
        await expect(page.getByText('Likes 1')).toBeVisible()
        
      })

      test('blog can be removed', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()

        await expect(page.getByText('delete')).toBeVisible()
        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', { name: 'delete' }).click()
        await page.waitForTimeout(3000);
        const title  = 'Kinney Chase'
        const author = 'Billy The Kid'
        var searchTxt = `${title} ${author}`
        await expect(page.getByText(searchTxt)).not.toBeVisible()        
      })

      test('delete button can be viewed only by user who created the blog', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await loginTest(page, 'JaDal', 'swordfish2', 'Jack Dalton')  
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
      })

      test('blogs are arranged in the order of likes', async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/testgenerate')

        await page.reload({ timeout: 1000 });

        await page.waitForTimeout(1000);

        const btns = await page.getByRole('button', { name: 'view' }).all()

        var rbtns = btns.reverse()
        for(const b of rbtns){
            //console.log(b);
            b.click()
            await page.waitForTimeout(100);
        }

        await page.waitForTimeout(100);
        
        const likeElements = await page.locator('.like-count').all();

        const likeCounts = await Promise.all(
            likeElements.map(async (el) => {
                const text = await el.textContent();
                return parseInt(text);
            })
        );
        // Check descending order
        expect(likeCounts).toEqual([...likeCounts].sort((a, b) => b - a));
      })

    })

  })
})