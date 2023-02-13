import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const sty={display:'flex',width:'220px',margin:'10px 0'};
const CreateNewBlog = () => {
    const navigate = useNavigate();

    const [userCreate, setUserCreate] = useState({
        authorName: "",
        authorAvatar: "",
        title: "",
        category: "",
        subCategory: "",
        cover: "",
        description: ""
    });

    // const[records, setRecords] = useState([]);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserCreate({...userCreate, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/blogs', userCreate)
            .then(res => {
                console.log(res.data);
                navigate("/");
            })
            .catch(err => {
                console.log(err);
            });

        setUserCreate({authorName: "", authorAvatar: "", title: "", category: "",subCategory:"",cover:"",description:""});

        // const newRecord = {...userCreate, id: new Date().getTime.toString() }
        // console.log(records);
        // setRecords([...records, newRecord]);
        // console.log(records);

        // setUserCreate({authorname: "", authorava: "", title: "", category: "",subcategory:"",url:""});
    }
    return(
        <div>
            <form action="" onSubmit={handleSubmit}>
                <div style={sty}>
                    <label htmlFor="authorName">Author Name</label>
                    <input type={"text"} autoComplete="off" name="authorName" id="username" value={userCreate.authorname} onChange={handleInput} />
                </div>
                <div style={sty}>
                    <label htmlFor="authorAvatar">Author Avatar</label>
                    <input type={"text"} autoComplete="off" name="authorAvatar" id="authorAvatar" value={userCreate.authorava} onChange={handleInput}/>
                </div>
                <div style={sty}>
                    <label htmlFor="title">Title</label>
                    <input type={"text"} autoComplete="off" name="title" id="title" value={userCreate.title} onChange={handleInput} />
                </div>
                <div style={sty}>
                    <label htmlFor="description">Description</label>
                    {/* <input type={"text"} autoComplete="off" name="title" id="title" value={userCreate.title} onChange={handleInput} /> */}
                    <textarea name="description" id="description" value={userCreate.description} onChange={handleInput}></textarea>
                </div>
                <div style={sty}>
                    <label htmlFor="category">Category</label>
                    <input type={"text"} autoComplete="off" name="category" id="category" value={userCreate.category} onChange={handleInput}/>
                </div>

                    {/* <label htmlFor="authorname">Author Name</label>
                    <input type={"text"} autoComplete="off" name="authorname" id="username" value="" onChange={handleInput}/>

                    <label htmlFor="authorname">Author Name</label>
                    <input type={"text"} autoComplete="off" name="authorname" id="username" value="" onChange={handleInput}/>

                    <label htmlFor="authorname">Author Name</label>
                    <input type={"text"} autoComplete="off" name="authorname" id="username" value="" onChange={handleInput}/>

                    <label htmlFor="authorname">Author Name</label>
                    <input type={"text"} autoComplete="off" name="authorname" id="username" value="" onChange={handleInput}/> */}
                <div style={sty}>
                    <label htmlFor="subCategory">Sub Category</label>
                    <input type={"text"} autoComplete="off" name="subCategory" id="subCategory" value={userCreate.subcategory} onChange={handleInput}/>
                </div>

                <div style={sty}>
                    <label htmlFor="cover">Image URL</label>
                    <input type="url" autoComplete="off" name="cover" id="cover" value={userCreate.url} onChange={handleInput}/>
                </div>

                    <button type="submit">Create </button>
            </form>

            {/* <div>
                {
                    records.map((curElem) => {
                        const { id, authorname , authorava, title , category,subcategory,url} = curElem;
                        return(
                            <div className="showDataStyle" key={curElem.id}>
                                <p>{curElem.authorname}</p>
                                <p>{curElem.authorava}</p>
                                <p>{curElem.title}</p>
                                <p>{curElem.category}</p>
                                
                            </div>
                        )
                    })
                }
            </div> */}
        </div>
    )
} 

export default CreateNewBlog;