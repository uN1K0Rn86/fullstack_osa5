const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, addNewBlog, openBlogInfo, logout, like } = require('./helper')

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
        await request.post('api/users', {
            data: {
                name: 'Kellanved',
                username: 'Shadowthrone',
                password: 'D4ncer'
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
            await loginWith(page, 'QuickBen', 'Kalam4eva')

            await expect(page.getByText('Ben Adaephon Delat logged in')).toBeVisible()
        })

        test('fails with incorrect credentials', async ({ page }) => {
            await loginWith(page, 'QuickBen', 'Kalamnot4eva')

            await expect(page.getByText('Incorrect username or password')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'QuickBen', 'Kalam4eva')
            await addNewBlog(
                page,
                'Blankets and their Many Uses',
                'Tehol Beddict',
                'https://letheras.blogspot.com'
            )
        })

        test('a new blog can be created', async ({ page }) => {
            await addNewBlog(
                page,
                'Walking in Walls (Capustan style)',
                'Ben Delat',
                'https://genabackis.blogspot.com'
            )
            
            const notifyDiv = await page.locator('.notification')
            await expect(page.getByRole('cell', { name: 'Ben Delat' })).toBeVisible()
            await expect(notifyDiv).toContainText('Walking in Walls (Capustan style)')
        })

        test('a blog can be liked', async ({ page }) => {
            const blogName = 'Blankets and their Many Uses'
            const cell = await page.getByRole('cell', { name: blogName })
            const row = await cell.locator('..')
            await like(page, blogName)

            const newLikesText = await row.locator('span:has-text("Likes:")').textContent()
            const newLikes = parseInt(newLikesText.replace('Likes: ', ''), 10)

            await expect(newLikes).toEqual(1)
        })

        test('a blog can be deleted by the user who added it', async ({ page }) => {
            const row = await page.locator('tr', { name: 'Blankets and their Many Uses' })
            await openBlogInfo(page, row)

            page.on('dialog', async (dialog) => {
                await dialog.accept()
            })
            await row.locator('button', { hasText: 'Remove' }).click()
            await page.waitForTimeout(500)

            const notifyDiv = await page.locator('.notification')
            await expect(notifyDiv).toContainText('successfully deleted')
            await expect(page.getByText('Blankets and their Many Uses')).not.toBeVisible()
        })

        test('the remove button is not visible if the blog was added by another user', async ({ page }) => {
            const row = await page.locator('tr', { name: 'Blankets and their Many Uses' })
            await openBlogInfo(page, row)
            await expect(row.locator('button', { hasText: 'Remove' })).toBeVisible()
            await logout(page)
            await loginWith(page, 'Shadowthrone', 'D4ncer')

            await page.getByText('Kellanved logged in').waitFor()
            const newRow = await page.locator('tr', { name: 'Blankets and their Many Uses' })
            await openBlogInfo(page, newRow)
            await expect(newRow.locator('button', { hasText: 'Show Less' })).toBeVisible()
            await expect(newRow.locator('button', { hasText: 'Remove' })).not.toBeVisible()
        })

        test('blogs are sorted by likes, most to least', async ({ page }) => {
            await addNewBlog(
                page,
                'Walking in Walls (Capustan style)',
                'Ben Delat',
                'https://genabackis.blogspot.com'
            )
            await addNewBlog(
                page,
                'Slaying Children',
                'Karsa Orlong',
                'https://teblor.org/blogs'
            )
            await addNewBlog(
                page,
                'Secrets of Thyr',
                'Tattersail',
                'https://secondarmycadre.org/blogs'
            )
            await addNewBlog(
                page,
                'Meanas and Rashan - Intricacies',
                'Bottle',
                'https://thefourteenth.com/blogs'
            )
            await addNewBlog(
                page,
                'My Many Candles',
                'Beak',
                'https://thefourteenth.com/blogs'
            )

            await like(page, 'My Many Candles')
            await like(page, 'My Many Candles')
            await like(page, 'My Many Candles')
            await like(page, 'My Many Candles')
            await like(page, 'My Many Candles')
            await like(page, 'My Many Candles')

            await like(page, 'Slaying Children')
            await like(page, 'Slaying Children')
            await like(page, 'Slaying Children')
            await like(page, 'Slaying Children')
            await like(page, 'Slaying Children')

            await like(page, 'Meanas and Rashan - Intricacies')
            await like(page, 'Meanas and Rashan - Intricacies')
            await like(page, 'Meanas and Rashan - Intricacies')
            await like(page, 'Meanas and Rashan - Intricacies')

            await like(page, 'Walking in Walls (Capustan style)')
            await like(page, 'Walking in Walls (Capustan style)')
            await like(page, 'Walking in Walls (Capustan style)')
            
            await like(page, 'Secrets of Thyr')
            await like(page, 'Secrets of Thyr')

            await like(page, 'Blankets and their Many Uses')

            const rowCount = await page.getByRole('row').count()

            await expect(rowCount).toEqual(7)

            for (let i = 1; i < rowCount - 1; i++) {
                const row = page.getByRole('row').nth(i)
                const likesText = await row.locator('span:has-text("Likes:")').textContent()
                const likes = parseInt(likesText.replace('Likes: ', ''), 10)

                const nextRow = page.getByRole('row').nth(i + 1)
                const likesTextNext = await nextRow.locator('span:has-text("Likes:")').textContent()
                const likesNext = parseInt(likesTextNext.replace('Likes: ', ''), 10)

                await expect(likes).toBeGreaterThanOrEqual(likesNext)
            }
        })
    })
})