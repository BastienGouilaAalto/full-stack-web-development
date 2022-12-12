const bcrypt = require('bcrypt')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
  
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: user._id
    })
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

  test('bloglist contains a blog about Canonical string reduction', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain(
      'Canonical string reduction'
    )
  }, 100000)

  test('unique identifier property of the blog posts is named id', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
  }, 100000)

})

describe('HTTP POST request to the /api/blogs url successfully creates a new blog post', () => {

  let headers
  beforeEach(async () => {
    const users = await helper.usersInDb()
    const user = users[0]

    const response = await api
      .post('/api/login')
      .send({
        username: user.username,
        password: 'sekret'
      })
    headers = {
      'Authorization': `bearer ${response.body.token}`
    }
  })

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
      .set(headers)
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
      .set(headers)
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
      .set(headers)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  }, 100000)

  test('fails with status code 401 unauthorized if the user token is missing', async () => {

    const newBlog = {
      title: 'test title',
      author: 'test author',
      url: 'http://testurl.html',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  }, 100000)

  test('fails with status code 401 unauthorized if the user token is wrong', async () => {

    wrong_headers = {
      'Authorization': 'bearer thisisawrongtoken'
    }

    const newBlog = {
      title: 'test title',
      author: 'test author',
      url: 'http://testurl.html',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(wrong_headers)
      .expect(401)

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

  let headers
  beforeEach(async () => {
    const users = await helper.usersInDb()
    const user = users[0]

    const response = await api
      .post('/api/login')
      .send({
        username: user.username,
        password: 'sekret'
      })
    headers = {
      'Authorization': `bearer ${response.body.token}`
    }
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(headers)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  }, 100000)

  test('fails with status code 401 unauthorized if the user token is missing', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  }, 100000)

  test('fails with status code 401 unauthorized if the user token is wrong', async () => {

    wrong_headers = {
      'Authorization': 'bearer thisisawrongtoken'
    }

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(wrong_headers)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  }, 100000)

})

afterAll(() => {
  mongoose.connection.close()
})