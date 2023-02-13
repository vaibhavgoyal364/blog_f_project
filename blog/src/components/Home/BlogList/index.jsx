import React from 'react';
import BlogItem from './BlogItem';
import './styles.css';

const BlogList = ({ blogs }) => {
  return (
    <div className='blogList-wrap'>
      {blogs.map((blog, i) => (
        <BlogItem key={i} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
