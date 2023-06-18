import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import Blog from '../components/Blog'

describe('<tests for the blog component />', () => {
    let blog = {
        title: 'Test Blog Title',
        author: 'Test Author',
        url: 'http://testblog.com',
        likes: 5,
        user: {
          username: 'testuser',
          name: 'Test User'
          }
    };
    let user = {
        username: 'testuser',
        name: 'Test User'
    };

    let mockUpdateBlogHandler = jest.fn();
    let mockDeleteBlogHandler = jest.fn();

test("checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default", () => {
    // Render the Blog component
    const component = render(<Blog 
        blog={blog} 
        user={user} 
        updateBlog={mockUpdateBlogHandler} 
        deleteBlog={mockDeleteBlogHandler} 
        />);
  
    // Use the getByText query to check if the title and author are rendered. <div> {blog.title} {blog.author} </div>
    const titleAndAuthorElement = component.getByText('Test Blog Title Test Author');
  
    // Use the queryByText query to check if the URL and number of likes are not rendered
    const urlElement = component.queryByText('http://testblog.com');
    const likesElement = component.queryByText('5');
  
    // Assert that the title and author are rendered
    expect(titleAndAuthorElement).toBeInTheDocument();
  
    // Assert that the URL and number of likes are not rendered
    expect(urlElement).not.toBeInTheDocument();
    expect(likesElement).not.toBeInTheDocument();
  });

  test("checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
    // Render the Blog component
    const component = render(<Blog 
        blog={blog} 
        user={user} 
        updateBlog={mockUpdateBlogHandler} 
        deleteBlog={mockDeleteBlogHandler} 
        />);
    
    const interactiveUser = userEvent.setup();
    const button = component.getByText('view');
    await interactiveUser.click(button);

    // Use the getByText query to check if the title and author are rendered. <div> {blog.title} {blog.author} </div>
    const titleAndAuthorElement = component.getByText('Test Blog Title Test Author');
    // Use the queryByText query to check if the URL and number of likes are rendered
    const urlElement = component.getByText('http://testblog.com');
    const likesElement = component.getByText('likes 5');

    // Assert that the title and author are rendered
    expect(titleAndAuthorElement).toBeInTheDocument();
    expect(urlElement).toBeInTheDocument();
    expect(likesElement).toBeInTheDocument();

  });

});