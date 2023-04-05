import './stories.scss'
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import axios from 'axios'
import {useQuery,useMutation,  useQueryClient} from 'react-query';
import { useState } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import { storage } from "../../firebase";

const Stories = ()=>{
  const [imageSrc, setImageSrc] = useState(null);
  const HOST = process.env.REACT_APP_HOST;
    const handleChange = (e)=>{
      e.preventDefault();
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
      setImageSrc(reader.result);
    };

    }
    const {currentUser} = useContext(AuthContext);

      const [file,setFile] = useState(null);

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

     

      const upload = async () => {
  
        console.log("uploading file:", file.name);
        const imageRef = ref(storage, `images/${file.name + Date.now()}`);
        const snapshot = await uploadBytes(imageRef, file);
        console.log("file uploaded:", snapshot.ref.fullPath);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("download URL:", downloadURL);
      
        return downloadURL;
      };

const handleClick = async (e)=>{
  e.preventDefault();
      let imgUrl = '';
      imgUrl = await upload();
      //console.log(filen)
      mutation.mutate({img:imgUrl});
      setFile(null);


}
//console.log(imageSrc);
//console.log(filen)


const deleteStory = ()=>{



}
    return(
        <div className='stories'>
            <div className='story'>
              
                   { file ? ( <img src={imageSrc} alt="Selected Image" />) : (<img src={currentUser.profilePic} alt="story"  />)   }
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
                    <img src={story.img} alt="story"  />
                    <span >{story.username} </span>
                   
                 
                </div>
            
            )

             )  )
             
            
            
            
            }





            </div>

    )

}

export default Stories