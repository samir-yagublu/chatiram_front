import "./navbar.scss"
import HomeIcon from '@mui/icons-material/Home';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import logo from '../../images/chatiram.png'
import SearchIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ChatIcon from '@mui/icons-material/Chat';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import {AuthContext } from "../../context/authContext";
import { useQuery } from 'react-query';
import axios from 'axios';
import Notifications from '../notifications/notifications'
import { color } from "@mui/system";
const Navbar = ()=>{
    const {currentUser, logout} = useContext(AuthContext);
    const {toggle, darkMode} = useContext(DarkModeContext);
    const [notification,setNotification] = useState(false)
    const [searched , setSearched] = useState(null);
    const HOST = process.env.REACT_APP_HOST;
    const [result,setResult] = useState(null);
    const { isLoading ,  error , data  } = useQuery(['notification'], () => 
    
     axios.get(`${HOST}/api/notification` , {withCredentials:true}).then(res=>{
       //  console.log(res.data)
      // console.log(res);
         return res.data;
     })   

  );

    // console.log(data);
     const handleChange = (e)=>{
         
        setSearched(e.target.value);
        if(searched == '') {setResult(null)}
        
     }
     //console.log(searched);
   
useEffect( ()=> {
    const getData = async ()=>{

try{
  const response = await axios.get(`${HOST}/api/search?searched=` + searched , {withCredentials:true});
  const Dataa = response.data;
    
    //console.log(Dataa.length);
    
     if(Dataa.length  ){ console.log('result set oldu');  setResult(Dataa); }
}
catch(err){console.log('error = ' + err.response.data) }
}

getData();



}, [searched])

//    console.log(result);

    const Logout = async ()=>{
        await logout();


    }
    
        const handleProfileLink = ({res}) => {
            window.location.href = `/profile/${res.id}`;
        } ;
    return(
        <div  >
        <div className ="navbar">
            <div className = "left_navbar">
                <Link to='/' style={{ textDecoration: "none" }}>
                    <span> <img src={logo} alt="chatiram_logo" className="logo" /> </span>
                </Link>
             
                <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' , color: 'inherit' }}>
      <HomeIcon sx={{ fontSize: 24 }} />
    </Link>
              
                {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <Brightness3Icon onClick={toggle} />
        )}
                <div className="results">
                <div className="search">
                <SearchIcon/>
                <input type="text" placeholder="Search..." name='searched'  onChange={handleChange}/>
                
                </div>

                
            {result ? 
                 ( <div className="result">

                  {result ?   result.map( res => (
                    <div className='r'>
                        <img src={res.profilePic} alt="" />
                        
                        <Link to={`/profile/${res.id}`} onClick={handleProfileLink}>
                            <span>{res.username}</span>
                            </Link>
                    </div>   )  )  
                              
                       
                    : ''
                    }    
 
                    </div>  )  :  (
                    <div className="second"> 
                        <div className='r'>
                        <span></span>  </div>  </div>  )     }






                </div>  



            </div>
            <div className ="right_navbar">
                <PersonOutlineIcon/>
                <ChatIcon/>
                
                {isLoading ? "" : data && (data.length  && data.every(noti => noti.isAccepted === 0) ?  <span className="dot" onClick={()=> setNotification(!notification)} >.</span> : '' )}
             

                <CircleNotificationsIcon/>
                <div className="user">
                    <img src={currentUser.profilePic} alt="User picture" className="userPicture" />
                    <span>{currentUser.username}</span>
                    <Link to='/login'  >
                    <button className="logout" onClick={Logout}>logout</button> </Link>
                </div>
            </div>
            
            
           
        </div>
        { isLoading ? "" :  notification ?  data.map( notify => <Notifications notify = {notify} /> ) : "" }
        </div>
    )

}

export default Navbar;
