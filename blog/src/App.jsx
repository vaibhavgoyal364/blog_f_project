import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Blog from './pages/Blog';
import Home from './pages/Home';
import CreateNewBlog from './components/CreateNewBlog'
import axios from 'axios';

// const data=fetch('http://localhost:1000/',{
//       method:'post',
//       headers:{
//         'Accept':'application/json','Content-Type':'application/json'

//       },
//       body:JSON.stringify({
//         heading:'uoiii',des:'this is  a pic',url:'cat.com'
//       })


// }).then(r=>r.json()).then(r=>console.log(r));

// const data=fetch('http://localhost:1000/',{method:'POST',mode:'cors',headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({a:'a'})}).then(r=>console.log(r));


// const send={k:'k',a:'a'};
  // var data = axios.post('http://localhost:1000/create',send).then(r=>console.log(r.data));

const App = () => {
const [show, setShow] = useState(false);

const clicked=(t)=>{
  if(t){
      setShow(t);
  }
}
  return (
    <div className='container'>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/create' element={<CreateNewBlog />}/>
        {/* {show?<createBlog/>:null} */}      
      </Routes>
    </div>
  );
};

export default App;
