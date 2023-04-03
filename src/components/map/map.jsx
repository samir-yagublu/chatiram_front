import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useContext } from "react";
import {AuthContext } from "../../context/authContext";

function Map({ustaID}) {
  const HOST = process.env.REACT_APP_HOST;
  const {currentUser} = useContext(AuthContext);
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);

  // const queryClient = useQueryClient();

   // axios.post("http://localhost:8800/api/locations", {latitude: locationData[0].latitude , longitude : locationData[0].longitude , userID : currentUser.id} , {withCredentials:true})
  //  axios.put("http://localhost:8800/api/locations", {latitude: locationData[0].latitude , longitude : locationData[0].longitude , userID : currentUser.id} , {withCredentials:true})
  
  const location = async ()=>{

    const location = await axios.get(`${HOST}/api/locations?userID=` + ustaID , {withCredentials:true})
    return location.data;

  }
  const getLocation = async () => {
    const locationData = await location();
     console.log(locationData[0])
    if (locationData.length) {    
      console.log('xeritede')
      
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: locationData[0].latitude, lng: locationData[0].longitude },
        zoom: 15,
      });

      const marker = new window.google.maps.Marker({
        icon: {
          url: 'https://cdn-icons-png.flaticon.com/512/1839/1839314.png',
          scaledSize: new window.google.maps.Size(40, 40)
        },
        position: { lat: locationData[0].latitude, lng: locationData[0].longitude },
        map: map,
      });

      
    }
  };
  
  // const showLocation = async ()=>{
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition( async (position) => {
  //       const { latitude, longitude } = position.coords;
  //       console.log('useEffect icinde')
  //       const locationData = await location();
  //       console.log(locationData.length)
  //         if(locationData.length) {
  
  //           axios.put("http://localhost:8800/api/locations", {latitude, longitude, userID: currentUser.id}, { withCredentials: true })
  //           .then((response) => {
  //             console.log(response.data);
  //           })
  //           .catch((error) => {
  //             console.error(error);
  //           });
  //           await getLocation();
          
  //       } else {
  //         axios.post("http://localhost:8800/api/locations", {latitude, longitude, userID: currentUser.id}, { withCredentials: true })
  //         .then((response) => {
  //           console.log(response.data);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //         await getLocation();
  //       } 
      
      
  //     });  
  //   } else {
  //     console.log('Location is not supported')
  //   }


  // }

 

 

useEffect(() => {
  const show = async ()=>{
    
    await getLocation();
    

  }
  show();
  
}, []);


  //console.log(locationData[0]);
  
 

  return <div id="map" style={{ height: "400px", }}></div>;
}

export default Map;
