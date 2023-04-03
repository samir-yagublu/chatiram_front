import './post.scss';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext, useState , useEffect } from 'react';
import Comments from '../comments/Comments';
import moment from 'moment';
import { useQuery } from 'react-query';
import axios from 'axios';
import {useMutation,  useQueryClient} from 'react-query';
const Post = ({post})=> {
    const HOST = process.env.REACT_APP_HOST;
    const [flag, setFlag] = useState(false);
    const [commentn,setCommentn] = useState(null);
    const { isLoading, error, data } = useQuery(['likes',post.postID], () => 
    
        axios.get(`${HOST}/api/likes?postID=` + post.postID, {withCredentials:true}).then(res=>{
          //  console.log(res.data)
            return res.data;
        })   

     );
    //  const { cisLoading, cerror, cdata } = useQuery(['getCommentNumber',post.postID], () =>
    
      
    //  axios.get('http://localhost:8800/api/comments/number?postID=' + post.postID, {withCredentials:true}).then(res=>{
    //         setCommentn(res.data);
    //         console.log(res.data)

    //         return res.data;
    //     })

    //  );
     
    useEffect(() => {
        axios.get(`${HOST}/api/comments/number?postID=` + post.postID, { withCredentials: true })
          .then(res => {
            setCommentn(res.data);
          })
          .catch(error => console.error(error));
      }, [flag]);
     

     const queryClient = useQueryClient();
     const mutation = useMutation( (liked) => {
         if(liked){
            return axios.post(`${HOST}/api/likes/delete`,{postID:post.postID}, {withCredentials:true});
         ;}
         else{
            return axios.post(`${HOST}/api/likes`,{postID:post.postID}, {withCredentials:true}) ;
         }
     } , {
   
         onSuccess: () =>{
           queryClient.invalidateQueries('likes') //datamiz elave olunan kimi re-fetch edecek
         } 
     })



    //  const { cisLoading, cerror, cdata } = useQuery('comments', () =>
    //     axios.get('http://localhost:8800/api/comments/number'+post.postID, {withCredentials:true}).then(res=>{
        
            
    //         return res.data;
    //     })

    //  );

       // console.log(cdata)

       const handleLike = ()=>{
        mutation.mutate(data.includes(currentUser.id))

       }

       
        
           
       const dmutation = useMutation( () => {
       
           return  axios.delete(`${HOST}/api/post`, {
            withCredentials: true,
            params: {
                id: post.postID
            }
        });
       
        
         
    } , {
  
        onSuccess: () =>{
          queryClient.invalidateQueries('posts') //datamiz elave olunan kimi re-fetch edecek
        } 
    })


       
        
        
       const pid = post.postID;

       const deletePost =  (e) => {
           e.preventDefault();
           dmutation.mutate();
          
       };

    
    const [commentOpen, SetcommentOpen]= useState(false);
    const {currentUser} = useContext(AuthContext);
 
    return(
        <div className='post'>
            <div className="container">
            <div className="user">
                <div className="userInfo">
                    <img src={ '../client/' + post.profilePic} alt="User picture" />
                    <div className="details">
                        <Link to={`/profile/${post.userID}`} style={{textDecoration:"none", color:'inherit'}}>
                            <span className='name'>{post.username} </span>
                        </Link>
                        <span className='date'>{moment(post.createDate).fromNow()}</span>

                    </div>

                </div>
                {post.userID == currentUser.id ? <button onClick={deletePost}>Delete</button> : ''}
                
       

            </div>
            <div className="content">
            <p> {post.description}   </p>
            <div className="image">
         
            <img src={"../client/"+post.img} alt=""></img>
            </div>
          

            </div>
            <div className="info">
                <div className="item">
                { isLoading ? 'Loading...' : (
    <span>
      {data.includes(currentUser.id) ? <FavoriteOutlinedIcon style={{color:"red"}} onClick={handleLike} /> : <FavoriteBorderTwoToneIcon onClick={handleLike} />}
      {<span>{data.length} likes</span> }
    </span>
) } 
                </div>
                <div className="item" onClick={()=> SetcommentOpen(!commentOpen)}><TextsmsOutlinedIcon />
                {  commentn ? commentn.length : '0' }      comments
                </div>

                   <div className="item"><ShareOutlinedIcon/>
                   Share
                   </div>
                   
                </div>
               
                  {commentOpen && <Comments setFlag = {setFlag} flag = {flag} postId = {post.postID}/> 

                  
                   }                
            </div>


        </div>
     

    )

}

export default Post;