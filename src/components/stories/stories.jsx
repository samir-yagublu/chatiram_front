import './stories.scss'
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import axios from 'axios'
import {useQuery,useMutation,  useQueryClient} from 'react-query';
import { useState } from "react";

const Stories = ()=>{
  const [imageSrc, setImageSrc] = useState(null);
  const HOST = process.env.REACT_APP_HOST;
    const handleChange = (e)=>{
      e.preventDefault();
      setFilen(e.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
      setImageSrc(reader.result);
    };

    }
    const {currentUser} = useContext(AuthContext);

      const [filen,setFilen] = useState(null);

  const { isLoading, error, data } = useQuery(['stories',currentUser.id], () =>
    
        axios.get(`${HOST}/api/stories`, {withCredentials:true}).then(res=>{
          //  console.log(res.data)
            return res.data;
        })

     );

     


     const queryClient = useQueryClient();
     const mutation = useMutation( (newPost) => {

        return axios.post(`${HOST}/api/stories`,newPost,{withCredentials:true})
         
     } , {
   
         onSuccess: () =>{
           queryClient.invalidateQueries('stories') //datamiz elave olunan kimi re-fetch edecek
         } 
     })

     const upload = async ()=>{

    try{
      const formData = new FormData();
      formData.append("filen",filen);
      //console.log('story uploadin icinde')
      const res = await axios.post(`${HOST}/api/upload/story`,formData, {withCredentials:true});
      return res.data;
    }
    catch(err){console.log(err)}
    
      }

const handleClick = async (e)=>{
  e.preventDefault();
      let imgUrl = '';
      imgUrl = await upload();
      //console.log(filen)
      mutation.mutate({img:imgUrl});
      setFilen(null);


}
//console.log(imageSrc);
//console.log(filen)


const deleteStory = ()=>{



}
    return(
        <div className='stories'>
            <div className='story'>
              
                   { filen ? ( <img src={imageSrc} alt="Selected Image" />) : (<img src={'../client/'+currentUser.profilePic} alt="story"  />)   }
                   {/* <img src={currentUser.profilePic} alt="story"  /> */}
                    <span >{currentUser.name}</span>
                   
                      <input id="filen" style={{ display: "none" }} type="file" onChange={handleChange}  />
                       <label htmlFor="filen">
                        <span className='button' >+</span>
                        <button className='button2' onClick={handleClick}>Share</button>
                       </label>
                      
                       
                </div>

            {isLoading ? "Loading..." :  (data.map( story =>(  
                                            //map islenende key vermeliyik (mecburi deyil)
                <div className='story' > 
                  {story.id  == currentUser.id ?  <button className='delete' onClick={deleteStory}>Delete</button>  : '' }
                    <img src={"./client/" + story.img} alt="story"  />
                    <span >{story.username} </span>
                   
                 
                </div>
            
            )

             )  )
             
            
            
            
            }





            </div>

    )

}

export default Stories