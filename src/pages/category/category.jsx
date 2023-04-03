

import "../category/category.scss"
import Posts from "../../components/posts/posts";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useQuery } from 'react-query';
const Category = () => {
    const HOST = process.env.REACT_APP_HOST;
    const type = useLocation().pathname.split('/')[2];

    const { isLoading , error , data } = useQuery('category', () =>
    axios.get(`${HOST}/api/posts/category?type=` + type , {withCredentials:true}).then(res=>{
      //  console.log(res.data)
        return res.data;
    })

 );  

    console.log(data)
  return (
    <div className="category">
        {isLoading ? ''  :
        <Posts category={data} /> }
    </div>
  )
}

export default Category;

