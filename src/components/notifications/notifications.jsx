
import '../notifications/notifications.scss'
import { Link } from "react-router-dom";
import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
const Notificatins = ({notify})=>{

  const HOST = process.env.REACT_APP_HOST;
  const {currentUser} = useContext(AuthContext);
  const location = async ()=>{

    const location = await axios.get(`${HOST}/api/locations?userID=` + currentUser.id + "personalID=?" + currentUser.id , {withCredentials:true})
    return location.data;

  }
  

  const showLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        const locationData = await location();
     
        if (locationData.length) {
          const response = await axios.put(`${HOST}/api/locations`, { latitude, longitude, userID: currentUser.id }, { withCredentials: true });
        
        } else {
          const response = await axios.post(`${HOST}/api/locations`, { latitude, longitude, userID: currentUser.id }, { withCredentials: true });
        
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Location is not supported');
    }
  };



  const accept = async (event) => {
    console.log('clicked accept button')
    event.preventDefault();
    await showLocation();
    const data = await axios.put(`${HOST}/api/orders`, { personalID: notify.USERID }, { withCredentials: true });
    console.log(data)
    // Wait for 3 seconds before redirecting
    // setTimeout(() => {
    //   window.location.href = `/profile/${notify.USERID}`;
    // }, 4000);
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
