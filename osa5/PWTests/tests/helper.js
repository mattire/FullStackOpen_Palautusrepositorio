const { test, expect, beforeEach, describe } = require('@playwright/test')

const loginWith = async (page, username, password)  => {
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const loginTest = async (page, username, password, usersName)  => {
    await loginWith(page, username, password)
    await expect(page.getByText(`${usersName} logged in`)).toBeVisible()
}

const fillLabelInputs = async (page, fieldsDict)  => {
    for (const inputFld in fieldsDict){
        await page
                .getByLabel(inputFld)
                .fill(fieldsDict[inputFld])
    }
}

const createBlog = async (page, blogTitle, blogAuthor, blogUrl)  => {
    const blogInputFieldsAndIputs = { 
        'title': blogTitle, 
        'author': blogAuthor, 
        'url': blogUrl
    }
    await page.getByRole('button', { name: 'Create new blog' }).click()

    await fillLabelInputs(page, blogInputFieldsAndIputs)
    await page.getByRole('button', { name: 'create', exact: true }).click()
    //await page.waitForTimeout(3000);

}



export { loginWith, loginTest, createBlog }