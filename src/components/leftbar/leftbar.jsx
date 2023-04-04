import "./leftbar.scss"
import car_mechanic from '../../images/car_mechanic.png'
import temir from '../../images/temir.png'
import washing from '../../images/washing.png'
import pc from '../../images/pc.png'
import furniture from '../../images/furniture.png'
import { Link } from 'react-router-dom';
const leftbar = ()=>{

    return(

        <div className="leftbar">

        <div className="container">

            <Link to='/category/car' style={{textDecoration:"none", color:'inherit'}}>
            <div className="field">
             
                <img src={car_mechanic} alt="" />
            
             <span>Car Mechanic</span>  
                
            </div>  </Link>
            <Link to='/category/rac' style={{textDecoration:"none", color:'inherit'}}>
            <div className="field">
                <img src={temir} alt="" />
                <span>Repair and Construction</span>
            </div> </Link>
            
            <Link to='/category/household' style={{textDecoration:"none", color:'inherit'}} >
            <div className="field">
                <img src={washing} alt="" />
                <span>Household Appliance</span>
            </div>  </Link>

            <Link to='/category/electronic' style={{textDecoration:"none", color:'inherit'}}>
            <div className="field">
                <img src={pc} alt="" />
                <span>Electronic </span>
            </div>  </Link>

            <Link to='/category/fan' style={{textDecoration:"none", color:'inherit'}}>
            <div className="field">
                <img src={furniture} alt="" />
                <span>Furniture and Interior </span>
            </div>
            </Link>
        </div>

        </div>

    )



}

export default leftbar;
