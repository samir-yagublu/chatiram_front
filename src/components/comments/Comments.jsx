import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import './Comments.scss'
import { useQuery } from 'react-query';
import axios from 'axios';
import moment from 'moment';
import { useState } from "react";
import {useMutation,  useQueryClient} from 'react-query';
const Comments = ({postId, flag, setFlag}) => {
    const {currentUser} = useContext(AuthContext);
    const [description,setdescription] = useState("");
    const HOST = process.env.REACT_APP_HOST;

    const { isLoading, error, data } = useQuery('comments', () =>
        axios.get(`${HOST}/api/comments?postId=`+postId, {withCredentials:true}).then(res=>{
        
            
            return res.data;
        })

     );

  const queryClient = useQueryClient();
  const mutation = useMutation( (newComment) => {
      return axios.post(`${HOST}/api/comment`,newComment, {withCredentials:true});
  } , {

      onSuccess: () =>{
        queryClient.invalidateQueries('comments') //datamiz elave olunan kimi re-fetch edecek
        console.log(data.length)
        setFlag(!flag);

      } 
  })

  const handleClick = async (e)=>{
    e.preventDefault();

    mutation.mutate({description, postID : postId});
    setdescription("");

  }



    return(

        <div className="comments">
            <div className="write">
                <img src={currentUser.profilePic} alt="" />
                <input type="text" name="" placeholder='Write comment ...' value={description}  onChange={(e)=>{ setdescription(e.target.value) }}/>
                <button onClick={handleClick}>Send</button>

            </div>
          { isLoading ? "Loading..." : data.map(comment=>(
             
             <div className='comment'>
                 <img src={comment.profilePic} alt="" />
                 <div className="info">
                     <span>{comment.name}</span>
                     <p>{comment.description}</p>
                 </div>
                <span className='date'>{moment(comment.createDate).fromNow()}</span>
             </div> 


            ))  }

        </div>
  

    )


}

export default Comments;