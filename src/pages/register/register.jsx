import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss"
import logo from '/home/kali/Desktop/chatiram_project/chatiram/src/images/chatiram.png'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useEffect } from "react";
//const axios = require('axios');
import axios from 'axios'
import {body, validationResult} from 'express-validator';
    


const Register = ()=>{
    const HOST = process.env.REACT_APP_HOST;
    const [Phone, setPhone] = useState(null);

    const [inputs,setInputs] = useState({
        account_type : "",
        name : "",
        email : "",
        username : "",
        password : "",
        phone : "",
        job : ""


    });
           

    const [type, setType] = useState(null);

    const [err, setErr] = useState(null);

    useEffect(()=>{
        setInputs((prev)=>({
            account_type : prev.account_type ,
            name: prev.name,
            email : prev.email,
            username : prev.username,
            password : prev.password,
            phone : Phone,
            job: prev.job
            
               
          }) )


    } , [Phone])



    const handleChange =  (event)=>{
        setInputs((prev) => ({...prev,[event.target.name]: event.target.value}));
        
     
    }

    const handleChangeType = (event)=>{
              
             if(event.target.value == 'personal'){ 
            setInputs((prev)=>({
                account_type : event.target.value ,
                name: prev.name,
                email : prev.email,
                username : prev.username,
                password : prev.password,
                phone : null,
                job: null
                
                   
              }) )
            }
             if(event.target.value == 'usta'){
                setInputs((prev)=>({
                    account_type : event.target.value ,
                    name: prev.name,
                    email : prev.email,
                    username : prev.username,
                    password : prev.password,
                    phone : null,
                    job: "car"
                    
                       
                  }) )
                }
       
        setType(event.target.value);

    }
    const handleClick = async (e)=>{
        e.preventDefault();
        // const errors = [];
        // if(inputs.name.length <3 || inputs.name.length >15 ){
        //     errors.push(<div> Name should be 3 and 15 </div>);
        // }
        // if(inputs.password.length < 8){
        //     errors.push(<div>password should be minimum 8 character</div>)
        // }

        // if(errors == null){
        try{
          await axios.post(`${HOST}/api/auth/register`,inputs);
          window.location.href = `/login`;
        }
        catch(err){
            setErr(err.response.data)
        } 
    // }
    // else{
    //     setErr(errors)
    // }
    }
            
   // console.log(err);

    //console.log(inputs);
    
    return(
        <div className="register">
        
            <div className="card">
                
                <div className="left">
                    <div className="logodiv">
                    <img src={logo} alt="logo" className="logo"/>

                    </div>
                   
            
                    <div className="yazilar">
                        <span>Do you have an account?</span>
                        <Link to="/login">
                        <button>Login</button>
                        </Link>
                       

                    </div>
                   

                </div>
              
                <div className="right">
                    <h1 >Register</h1>
                    <div className="account">
                        
                        <div className="usta">
                            
                            <input type="radio" value='usta' name="account_type" onChange={handleChangeType}  />
                            <label >Usta </label>
                        </div>
                        <div className="personal">
                            
                            <input type="radio" value='personal' name="account_type" onChange={handleChangeType}   />
                            <label >Personal </label>
                        </div>


                    </div>
                       
                        
                        <div>
                            {(() => {
                                if (type == 'usta') {
                                return (
                                    

  
                                    <form>
                                        <input type="text" placeholder="Full Name" name="name" onChange={handleChange} />
                                        <input type="text" placeholder="email" name="email" onChange={handleChange} />
                                        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                                        <input type="password" placeholder="password" name="password" onChange={handleChange} />
                                        <PhoneInput 
                                        name = 'phone'
                                        onChange={setPhone}
                                         country= {'az'} 
                                         value = {Phone}
                                         
                                        
                                            />
                                          
                                     

                                        <div className="jobs">
                                        <label for="job">Choose a job:</label>

                                            <select name="job" id="job" onChange={handleChange} >
                                            <option value="car">Car Mechanic</option>
                                            <option value="rac">Repair and Construction</option>
                                            <option value="household">Household Appliance</option>
                                            <option value="electronic">Electronic</option>
                                            <option value="fan">Furniture and Interior </option>
                                            <option value='other'>Other</option>
                                            </select> 
                                        </div>
                                       {err}
                                        <button onClick={handleClick} >Register</button>

                                    </form>
                                )
                                } 
                                else if(type == 'personal') {
                                return (
                                    <form>
                                        <input type="text" placeholder="Full Name" name="name" onChange={handleChange} />
                                        <input type="text" placeholder="email" name="email" onChange={handleChange} />
                                        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                                        <input type="password" placeholder="password" name="password" onChange={handleChange} />
                                        {err && err}
                                        <button onClick={handleClick} >Register</button>
                                        </form>
                                )
                                }
                            })()}
                            </div>
                        

                       

              

                </div>
                


            </div>
        
        </div>
    )

}

export default Register;