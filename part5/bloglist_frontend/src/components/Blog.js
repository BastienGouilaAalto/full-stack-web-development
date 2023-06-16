import React, { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const updateBlogLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    };
    console.log(updatedBlog);
    updateBlog(updatedBlog)
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} 
            <button id='like-button' onClick={updateBlogLikes}>like</button>
          </div>
          {typeof blog.user !== 'undefined' ? <div>{blog.user.name}</div>: <div>Unknown user</div>}
        </div>
      )}
    </div>
  );
};

export default Blog;