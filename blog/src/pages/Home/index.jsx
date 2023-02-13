import React, { useEffect, useState } from 'react';
import EmptyList from '../../components/common/EmptyList';
import BlogList from '../../components/Home/BlogList';
import Header from '../../components/Home/Header';
import SearchBar from '../../components/Home/SearchBar';
// import { blogList } from '../../config/data';
import axios from 'axios';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchedBlogs, setsearchedBlogs] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const refreshBlogs = () => {
    axios.get('http://localhost:8000/api/blogs')
    .then(res=>{
      setBlogs(res.data);
      setsearchedBlogs(res.data);
    })
    .catch(err=>console.log(err));
  };

  // Search submit
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  // Search for blog by category
  const handleSearchResults = () => {
    const filteredBlogs = blogs.filter((blog) =>
      blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setsearchedBlogs(filteredBlogs);
  };

  // Clear search and show all blogs
  const handleClearSearch = () => {
    setsearchedBlogs(blogs);
    setSearchKey('');
  };

  useEffect(() => {
    refreshBlogs();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <Header />

      {/* Search Bar */}
      <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />

      {/* Blog List & Empty View */}
      {!searchedBlogs.length ? <EmptyList /> : <BlogList blogs={searchedBlogs} />}
    </div>
  );
};

export default Home;
