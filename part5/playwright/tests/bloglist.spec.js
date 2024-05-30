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
    })
    
  })
})