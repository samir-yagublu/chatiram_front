import { useContext, useState } from "react";
import "./profile.scss";
import { AuthContext } from '../../context/authContext';
import Posts from '../../components/posts/posts';
import Update from '../../components/update/Update'
import { useQuery } from 'react-query';
import axios from 'axios';
import {useMutation,  useQueryClient} from 'react-query';
import { useLocation } from "react-router-dom";
import Map from '../../components/map/map'

//import '../../client'
const Profile = ()=>{
  const HOST = process.env.REACT_APP_HOST;
  const userID = parseInt(useLocation().pathname.split('/')[2]);
  const [edit,setEdit] = useState(false);

  //const [order,setOrder] = useState(false);

    const { isLoading, error, data } = useQuery(['profile'], () => 
    
        axios.get(`${HOST}/api/profile/find/` + userID, {withCredentials:true}).then(res=>{
          //  console.log(res.data)
            return res.data;
        })   

     );

     const { isLoading : orderisLoading, error : orderError, data : orderData } = useQuery(['orders'], () => 
    
     axios.get(`${HOST}/api/orders?ustaID=` + userID, {withCredentials:true}).then(res=>{
       //  console.log(res.data)
         return res.data;
     })   

  );


     const { isLoading : fisLoading,  error : ferror , data : fdata } = useQuery(['followers'], () => 
    
        axios.get(`${HOST}/api/follow?followedUserID=` + userID, {withCredentials:true}).then(res=>{
          //  console.log(res.data)
         // console.log(res);
            return res.data;
        })   

     );

     const { isLoading : followingisLoading,  error : followingerror , data : followingdata } = useQuery(['following'], () => 
    
     axios.get(`${HOST}/api/follow/follows?followerUserID=` + userID, {withCredentials:true}).then(res=>{
       //  console.log(res.data)
      // console.log(res);
         return res.data;
     })   

  );
  const { isLoading : postnisLoading,  error : postngerror , data : postndata } = useQuery(['postnum'], () => 
    
     axios.get(`${HOST}/api/nposts?userID=` + userID, {withCredentials:true}).then(res=>{
       //  console.log(res.data)
      // console.log(res);
         return res.data;
     })   

  );
  const { isLoading : acceptedLoading,  error : acceptedError , data : isAccepted } = useQuery(['checkAccepted'], () => 
    
     axios.get(`${HOST}/api/orders/accepted?ustaID=` + userID + "&personalID=" + currentUser.id , {withCredentials:true}).then(res=>{
       //  console.log(res.data)
      // console.log(res);
         return res.data;
     })   

  );
 
     

    const {currentUser} = useContext(AuthContext);


    const queryClient = useQueryClient();
    const mutation = useMutation( (followed) => {
        if(followed){
           return axios.delete(`${HOST}/api/follow?followedUserID=` + userID, {withCredentials:true});
        ;}
        else{
           return axios.post(`${HOST}/api/follow`,{followedUserID : userID}, {withCredentials:true}) ;
        }
    } , {
  
        onSuccess: () =>{
          queryClient.invalidateQueries('followers') //datamiz elave olunan kimi re-fetch edecek
        } 
    })

    const ordermutation = useMutation( (ordered) => {
      if(ordered){
        
         return axios.delete(`${HOST}/api/orders?ustaID=` + userID, {withCredentials:true});
      ;}
      else{
       
         return axios.post(`${HOST}/api/orders` , {ustaID : userID}, {withCredentials:true}) ;
      }
  } , {

      onSuccess: () =>{
        queryClient.invalidateQueries('orders') //datamiz elave olunan kimi re-fetch edecek
      } 
  })
        
    const handleFollow = ()=>{
    
        mutation.mutate(fdata.includes(currentUser.id));

    }

    const handleOrder = ()=>{
      ordermutation.mutate(orderData.includes(currentUser.id));

    }

    //console.log(orderData);
    //console.log(data.id)
    return(



        <div className="profile">
            

            {isLoading ? 'isLoadin ' : 
          (  
         <div className="container">
             <div className="user">
                 <span className="username">{data.username}</span>
                {userID == currentUser.id ? ( <button className="edit" onClick={()=>{setEdit(true)}}>edit</button> ) : ( fisLoading ? "...loading" : 
              (  fdata.includes(currentUser.id) ? 
                 ( <button onClick={handleFollow} className="following">following</button> )  : (<button onClick={handleFollow} className="edit">follow</button>) ) ) }  
                <img src={'../client/' + data.profilePic} alt="Profile Picture" className="profilePic"></img>
                <span className="info"><span className="number">{postnisLoading ? 'Loading...' : postndata.length}</span> Posts</span>
           {fisLoading ? "...loading" : (     <span className="info"><span className="number">{fdata.length}</span> Followers</span>   ) }
                <span className="info"><span className="number">{followingisLoading ? 'Loading...' : followingdata.length}</span> Following</span>
            
                

             </div>
            
        
        <div className="cj">
            {data.type == 'usta' ? 
            <div className="contact">
                
                <h3>Contact information :</h3>
                <span className="contactinfo"> Name : <span className="userName"> {data.name} </span> </span>
                <span className="contactinfo">Telephone number : <span className="userNumber">{data.phone}</span></span>
                <span className="contactinfo">Email :<span className="userEmail">{data.email}</span> </span>
             
            </div>  :  <div></div> }
            
            <div className="call">
       { data.type == 'usta' && data.id != currentUser.id &&  ( orderisLoading ? 'Loading' : (orderData.includes(currentUser.id) ? 
      ( <div className="Order">
         { !isAccepted ? "" : (isAccepted[0].isAccepted == 1 ? 
         <div>Usta has been accepted your order , please wait 
           <button onClick={handleOrder}>Cancel</button>

         </div>  : (
       <div>  <span>Order created please wait for usta to accept</span> 
    
       <button onClick={handleOrder}>Cancel</button> </div>
         
         )  )}
         </div> ) : <button onClick={handleOrder}>Make order</button>  )) }
        </div>
    
         {data.type == 'usta' ?
            <div className="jobs">
              
                <h3>Jobs : </h3>
                <div className="items"> 
                    <span className="item">{data.job}</span>
                    
                </div>
               

            </div>
            : <div></div> }
              

        </div>
            
            
        
        
        </div>
          )  }

<div>    
  
  <Map ustaID = {userID} /></div>
        <div className="posts">
        <Posts userID = {userID} />
       
        </div>

           {edit &&  <Update  setEdit = {setEdit} user ={data} /> }

        </div>
    )

}

export default Profile;