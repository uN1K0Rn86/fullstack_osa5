const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
}

const addNewBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'Add New Blog' }).click()

    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)

    await page.getByRole('button', { name: 'Create' }).click()
    await page.getByRole('cell', { name: author }).waitFor()
}

const openBlogInfo = async (page, row) => {
    await row.locator('button', { hasText: 'Show More' }).click()
}

const logout = async (page) => {
    await page.getByRole('button', { name: 'Logout' }).click()
}

export { loginWith, addNewBlog, openBlogInfo, logout }