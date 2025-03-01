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
    await page.getByRole('row', { name: title }).waitFor()
}

const openBlogInfo = async (page, row) => {
    await row.locator('button', { hasText: 'Show More' }).click()
    await row.locator('button', { hasText: 'Show Less' }).waitFor()
}

const logout = async (page) => {
    await page.getByRole('button', { name: 'Logout' }).click()
}

const like = async (page, blogName) => {
    const cell = await page.getByRole('cell', { name: blogName })
    const row = await cell.locator('..')

    if (await row.locator('button', { hasText: 'Show More' }).isVisible()) {
        await openBlogInfo(page, row)
    }
    
    const likesText = await row.locator('span:has-text("Likes:")').textContent()
    const likes = parseInt(likesText.replace('Likes: ', ''), 10)
    await row.locator('button', { hasText: 'Like' }).click()
    await row.getByText(`Likes: ${likes + 1}`).waitFor()
}

export { loginWith, addNewBlog, openBlogInfo, logout, like }