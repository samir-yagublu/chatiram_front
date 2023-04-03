import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import './update.scss';
import axios from 'axios';
import {useMutation,  useQueryClient} from 'react-query';
const Update = ({setEdit,user})=>{
const {currentUser} = useContext(AuthContext);
const HOST = process.env.REACT_APP_HOST;
const [file,setFile] = useState(null);
const [inputs,setInputs] = useState({
    name : user.name,
    username : user.username,
    phone : user.phone,
    job : user.job
});
const handleChange =  (event)=>{
    setInputs((prev) => ({...prev,[event.target.name]: event.target.value}));
    
 
}

const queryClient = useQueryClient();
  const mutation = useMutation( (user) => {
      return axios.put(`${HOST}/api/users`,user, {withCredentials:true});
  } , {

      onSuccess: () =>{
        queryClient.invalidateQueries('profile') //datamiz elave olunan kimi re-fetch edecek
      } 
  })

const upload = async ()=>{

    try{
      const formData = new FormData();
      formData.append("file",file);
      //console.log('upload in icinde')
      const res = await axios.post(`${HOST}/api/upload`, formData,{withCredentials:true});
      
      return res.data;
    }
    catch(err){console.log(err)}
    
      }

      const handleClick = async (e)=>{
        e.preventDefault();
        let imgUrl = user.profilePic;
        if(file) imgUrl = await upload() 
        mutation.mutate({ ...inputs, profilePic:imgUrl } );
        setEdit(false);
      }
const fileChange = (e)=>{
    setFile(e.target.files[0])
}

//console.log(file)
console.log(user);
    return(
        <div  className='update'>
            <h1>Editing </h1>
            {currentUser.type == 'personal' ? 
            (<form>
                <div>
                <label > Username : </label>
                <input name='username' type='text' value={inputs.username} onChange={handleChange} ></input>

                </div>
               
              <div>  <label >Name :</label>
                <input name='name' type='text' value={inputs.name} onChange={handleChange} ></input></div>
              
                <div><label >Select profile picture : </label>
                <input type='file' onChange={fileChange} ></input></div>
                <button className="edit" onClick={handleClick} >Edit</button>
                
            </form>) : 
            
            
            (<form>
               <div><label > Username : </label>
                <input name='username' type='text' value={inputs.username} onChange={handleChange} ></input></div>
                
              <div> <label >Name :</label>
                <input name='name' type='text' value={inputs.name} onChange={handleChange} ></input>
                </div>
            
              <div><label >Phone :</label>
                <input name='phone' type='text' value={inputs.phone}  onChange={handleChange}></input></div>
                <div><label >Select profile picture : </label>
                <input type='file' onChange={fileChange} ></input></div>
                <div className="jobs">
        <label for="job">Choose a job:</label>

              <select name="job" id="job" value={inputs.job} onChange={handleChange} >
                <option value="car">Car Mechanic</option>
                <option value="rac">Repair and Construction</option>
                <option value="household">Household Appliance</option>
                <option value="electronic">Electronic</option>
                <option value="fan">Furniture and Interior </option>
                <option value='other'>Other</option>
                    </select> 
                            </div>

                    <button className="edit" onClick={handleClick} >Edit</button>
             
              
            </form>)  }


            <button onClick={()=>setEdit(false)} className='close'>X</button>
        </div>
        
    )


}

export default Update;