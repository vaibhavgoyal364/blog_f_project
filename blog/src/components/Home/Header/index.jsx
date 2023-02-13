import React, { useState } from 'react';
import './styles.css';
import {Navigate} from 'react-router-dom';
const Header = (props) => {

  const [click,set]=useState(false);
  // const click=false;

  return (
    <header className='home-header'>
      <h2>Everyday's Morning </h2>
      <h4>everyone's favourite</h4>
      <h1>
        <span>“</span> Blog <span>”</span>
      </h1>
      <p>
        an awesome place to make oneself <br /> productive and entertained through
        weekly updates.

      </p>

      <button className='create' onClick={()=>{set(true)}}>
        Create Blog
      </button>
      { click ? <Navigate replace to='/create'/> : null }
    </header>
  );
  
  
};

export default Header;
