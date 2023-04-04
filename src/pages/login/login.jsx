import "./login.scss"
import logo from "../../images/chatiram.png"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext} from "../../context/authContext";
import { useContext } from "react";

import { useState } from "react";


const Login = ()=>{

    
    const {login} = useContext(AuthContext);

    const [inputs,setInputs] = useState({
        email_username : "",
        password : ""
    });
    const [err,setErr] = useState(null);


    const navigate = useNavigate();

const handleChange =  (event)=>{
    setInputs((prev) => ({...prev,[event.target.name]: event.target.value})); 
    }


    const handleLogin = async (e)=>{
        e.preventDefault();
        
        try{

           await login(inputs);
           window.location.href = `/`;
           //navigate('/');
        }
     catch(error){
         
         console.log(error.response.data)
        setErr(error.response.data)
     }

    }
    
  // console.log(inputs); 

    return(
        <div className="login">
        
            <div className="card">
                
                <div className="left">
                    <div className="logodiv">
                    <img src={logo} alt="logo" className="logo"/>

                    </div>
                   
            
                    <div className="yazilar">
                        <span>Don't you have an account?</span>
                        <Link to="/register">
                        <button>Register</button>
                        </Link>
                    </div>
                   

                </div>
              
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="email or username" name="email_username" onChange={handleChange}/>
                        <input type= "password" placeholder="password" name="password" onChange={handleChange}/>
                        {err && err}
                        <Link to = '/' >
                        <button onClick={handleLogin}> Login </button>  </Link>

                    </form>

                </div>
                


            </div>
        
        </div>
    )

}

export default Login;
