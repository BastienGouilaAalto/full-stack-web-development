import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from '../components/BlogForm';

test('check, that the form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const mockCreateBlogHandler = jest.fn();
  const interactiveUser = userEvent.setup();

  const { container } = render(<BlogForm createBlog={mockCreateBlogHandler} />);

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')
  const submitButton = container.querySelector('#submit-button')

  await interactiveUser.type(titleInput, 'Test Blog Title');
  await interactiveUser.type(authorInput, 'Test Author');
  await interactiveUser.type(urlInput, 'http://testblog.com');

  await interactiveUser.click(submitButton);

  expect(mockCreateBlogHandler).toHaveBeenCalledWith({
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testblog.com'
  });
});
