
import '../notifications/notifications.scss'
import { Link } from "react-router-dom";
import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
const Notificatins = ({notify})=>{

  const HOST = process.env.REACT_APP_HOST;
  const {currentUser} = useContext(AuthContext);
  const location = async ()=>{

    const location = await axios.get("http://localhost:8800/api/locations?userID=" + currentUser.id + "personalID=?" + currentUser.id , {withCredentials:true})
    return location.data;

  }
  

  const showLocation = async ()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( async (position) => {
        const { latitude, longitude } = position.coords;
        const locationData = await location();
        console.log(locationData.length)
          if(locationData.length) {
  
            axios.put(`${HOST}/api/locations`, {latitude, longitude, userID: currentUser.id}, { withCredentials: true })
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
            
          
        } else {
          axios.post(`${HOST}/api/locations`, {latitude, longitude, userID: currentUser.id}, { withCredentials: true })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
          
        } 
      
      
      });  
    } else {
      console.log('Location is not supported')
    }


  }



  const accept = async (event) => {
    event.preventDefault();
    await showLocation();
    await axios.put(`${HOST}/api/orders`, { personalID: notify.USERID }, { withCredentials: true });
    
    // Wait for 3 seconds before redirecting
    setTimeout(() => {
      window.location.href = `/profile/${notify.USERID}`;
    }, 4000);
  }

const decline = async (event)=>{
    event.preventDefault();
  await  axios.delete(`${HOST}/api/orders/delete?personalID=` + notify.USERID, {withCredentials:true})

  //window.location.href = '/profile/' + notify.USERID;
}

    return(
        <div className="notification">
                {notify.isAccepted == 0 ? 
               <div className='notify'>
                   {/* <span>{notify.USERID}</span> */}
                   {/* <span>{notify.isAccepted}</span> */}
                    <img src={"../client/" + notify.profilePIC} alt='' ></img>
                    <span>{notify.username} has made order : </span>
                  <Link to={'/profile/' + notify.USERID}  >  
                  <button className="accept" onClick={accept} >Accept</button>  
                  </Link >
                    <button className="decline" onClick={decline}>Decline</button>
                    
                   </div> 
                    : "" }
            
            </div>

    )


}

export default Notificatins;