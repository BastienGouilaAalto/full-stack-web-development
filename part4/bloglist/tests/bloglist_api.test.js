const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there is initially some blogs saved', () => {

  test('bloglist are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('bloglist contains the right amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)

  test('unique identifier property of the blog posts is named id', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
  }, 100000)

})

describe('HTTP POST request to the /api/blogs url successfully creates a new blog post', () => {

  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'test title',
      author: 'test author',
      url: 'http://testurl.html',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(
      'test title'
    )
  }, 100000)

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'test title',
      author: 'test author',
      url: 'http://testurl.html'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const lastBlogAdded = blogsAtEnd.find(blog => blog.title === newBlog.title)
    expect(lastBlogAdded.likes).toBe(0)
  }, 100000)

  test('fails with status code 400 if the title or url properties are missing', async () => {
    const newBlog = {
      author: 'test author',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  }, 100000)
})

describe('update a blog', () => {

  test('update the number of likes successful', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blogWithUpdatedLikes = blogsAtEnd.find(blog => blog.title === blogToUpdate.title)
    expect(blogWithUpdatedLikes.likes).toBe(updatedBlog.likes)
  }, 100000)

})

describe('deletion of a blog', () => {

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  }, 100000)

})

afterAll(() => {
  mongoose.connection.close()
})