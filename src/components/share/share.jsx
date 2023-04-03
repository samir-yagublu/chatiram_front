import "../../components/share/share.scss";
import Image from "../../images/img.png";
import Map from "../../images/map.png";
import Friend from "../../images/friend.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext.js";
import { useState } from "react";
import axios from "axios";

import {useMutation,  useQueryClient} from 'react-query';

const Share = () => {
  const HOST = process.env.REACT_APP_HOST;
  const handleChange = (e)=>{
   
    setFile(e.target.files[0]);

  }
  

  const queryClient = useQueryClient();
  const mutation = useMutation( (newPost) => {
      return axios.post(`${HOST}/api/post`,newPost, {withCredentials:true});
  } , {

      onSuccess: () =>{
        queryClient.invalidateQueries('posts') //datamiz elave olunan kimi re-fetch edecek
      } 
  })

  const [file,setFile] = useState(null);
  const [description,setdescription] = useState("");
  const [type,setType] = useState("car");
  const upload = async ()=>{

    try{
      const formData = new FormData();
      formData.append("file",file);
      console.log('upload in icinde')
      const res = await axios.post(`${HOST}/api/upload`, formData,{withCredentials:true});
      
      return res.data;
    }
    catch(err){console.log(err)}
    
      }

  const handleClick = async (e)=>{
    e.preventDefault();
    let imgUrl = '';
    if(file) imgUrl = await upload() 
    mutation.mutate({description,type, img:imgUrl});
    setdescription("");
    setFile(null);

  }
  const {currentUser} = useContext(AuthContext)

  
    //console.log(type)

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
          <img
            src={"../client/" + currentUser.profilePic}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} onChange={(e)=>{ setdescription(e.target.value) }} name ='descriptionription' 
          value={description}
          />
        </div>

        <div className="right">
          {file && ( <img className="file" alt="" src={URL.createObjectURL(file)}/> )  }
        </div>

          </div>

          


        <hr />
        <div className="bottom">
          <div className="left">
            <form action="" id="postUpload">
            <input type="file" id="file" style={{display:"none"}} onChange={handleChange} name='postupload' />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            </form>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">

          <div className="categories">
                                        

                <select name="type" id="type"  onChange={(e)=> setType(e.target.value)} >
                <option value="car">Car Mechanic</option>
           <option value="rac">Repair and Construction</option>
                      <option value="household">Household Appliance</option>
                         <option value="electronic">Electronic</option>
                     <option value="fan">Furniture and Interior </option>
               <option value='other'>Other</option>
                  </select> 
             </div>

            <button onClick={handleClick} >Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;