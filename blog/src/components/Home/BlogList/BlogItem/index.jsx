import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '../../../common/Chip';
import './styles.css';
import moment from 'moment';

const BlogItem = ({
  blog: {
    description,
    title,
    createdAt,
    authorName,
    authorAvatar,
    cover,
    category,
    _id,
  },
}) => {
  return (
    <Link to={`/blog/${_id}`} className='blogItem-wrap blogItem-link'>
      <img className='blogItem-cover' src={cover} alt='cover' />
      <Chip label={category} />
      <h3>{title}</h3>
      <p className='blogItem-desc'>{description}</p>
      <footer>
        <div className='blogItem-author'>
          <img src={authorAvatar} alt='avatar' />
          <div>
            <h6>{authorName}</h6>
            <p>{moment(createdAt).format('MMMM D, YYYY')}</p>
          </div>
        </div>
        {/* <Link className='blogItem-link' to={`/blog/${_id}`}>
          ➝
        </Link> */}
      </footer>
    </Link>
  );
};

export default BlogItem;
