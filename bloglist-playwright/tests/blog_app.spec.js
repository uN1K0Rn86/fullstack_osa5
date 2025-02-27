const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, addNewBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('api/testing/reset')
        await request.post('api/users', {
            data: {
                name: 'Ben Adaephon Delat',
                username: 'QuickBen',
                password: 'Kalam4eva'
            }
        })

        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByText('Username')).toBeVisible()
        await expect(page.getByText('Password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            loginWith(page, 'QuickBen', 'Kalam4eva')

            await expect(page.getByText('Ben Adaephon Delat logged in')).toBeVisible()
        })

        test('fails with incorrect credentials', async ({ page }) => {
            loginWith(page, 'QuickBen', 'Kalamnot4eva')

            await expect(page.getByText('Incorrect username or password')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            loginWith(page, 'QuickBen', 'Kalam4eva')
        })

        test('a new blog can be created', async ({ page }) => {
            addNewBlog(
                page,
                'Walking in Walls (Capustan style)',
                'Ben Delat',
                'https://genabackis.blogspot.com'
            )
            
            const notifyDiv = await page.locator('.notification')
            await expect(page.getByRole('cell', { name: 'Ben Delat' })).toBeVisible()
            await expect(notifyDiv).toContainText('Walking in Walls (Capustan style)')
        })
    })
})