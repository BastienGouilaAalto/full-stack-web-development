const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', userExtractor ,async (request, response) => {
  let body = request.body

  if(!request.user)
  return response.status(401).json({ error: 'token missing or invalid' })
  // get user from request object
  const user = request.user

  if(!body.likes) {
    body.likes = 0
  }

  const blog = new Blog(
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user : user._id
    }
  )

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

  if(!request.user)
  return response.status(401).json({ error: 'token missing or invalid' })
  // get user from request object
  const user = request.user
  
  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.user.toString() === user._id.toString()) {    
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else{
    return response.status(401).json({ error: 'only the user who created the blog can delete it' })
  }
})

blogsRouter.put('/:id', async (request, response) => {

  let body = request.body
  if(!body.likes) {
    body.likes = 0
  }

  const blogToUpdate = await Blog.findById(request.params.id)

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user : blogToUpdate.user
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})


module.exports = blogsRouter