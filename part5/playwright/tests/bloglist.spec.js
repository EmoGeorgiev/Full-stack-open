const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
        await page.goto('http://localhost:5173')
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
            }
        })

        await request.post('/api/users', {
            data: {
            name: 'Matt Luukk',
            username: 'mluukk',
            password: 'salainen'
            }
        })

        await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
        await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'wrongUser', 'wrongPassword')
        await expect(page.getByText('wrong username or password')).toBeVisible()
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            loginWith(page, 'mluukkai', 'salainen')
        })
      
        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'test', 'testAuthor', 'https://example.com/test')
            await expect(page.getByText('test testAuthor')).toBeVisible()
        })

        test('blog can be liked', async ({ page }) => {
            await createBlog(page, 'test', 'testAuthor', 'https://example.com/test')
            await page.getByRole('button', { name: 'view'}).click()
            await page.getByRole('button', { name: 'like'}).click()
            await expect(page.getByText('likes 1')).toBeVisible()
        })

        test('blog can be deleted', async ({ page }) => {
            await createBlog(page, 'test', 'testAuthor', 'https://example.com/test')
            await page.getByRole('button', { name: 'view'}).click()
            page.on('dialog', dialog => dialog.accept());
            await page.getByRole('button', { name: 'remove'}).click()
            await expect(page.getByText('test testAuthor')).not.toBeVisible()
            await expect(page.getByText('Blog was removed successfully')).toBeVisible()
        })

        test('only the user that created the blog can see the remove button', async ({ page }) => {
            await createBlog(page, 'test', 'testAuthor', 'https://example.com/test')
            await page.getByRole('button', { name: 'logout'}).click()
            
            await loginWith(page, 'mluukk', 'salainen')
            await page.getByRole('button', { name: 'view'}).click()
            await expect(page.getByRole('button', { name: 'remove'})).not.toBeVisible()
        })
    })
    
  })
})