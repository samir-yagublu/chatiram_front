import './posts.scss'
import Post from '../../components/post/post';
import { useQuery } from 'react-query';
import axios from 'axios';

const HOST = process.env.REACT_APP_HOST;

console.log(HOST);
const Posts = ({userID,  category})=>{


  //console.log(type);
  
    const { isLoading, error, data } = useQuery('posts', () =>
        axios.get(`${HOST}/api/posts?userID=` +userID, {withCredentials:true}).then(res=>{
          //  console.log(res.data)
            return res.data;
        })

     );
      
       
    
      // console.log('data = ' ,data[0].img)

    return(
        <div className='posts'>
          {!category ? 
      (
        isLoading ? 'Loading' : (
          data && (
          data.map(post => <Post post={post} />))
        )    
        
        )   : category.map(post => <Post post={post} />)  }
      </div>
        
    )

}

export default Posts