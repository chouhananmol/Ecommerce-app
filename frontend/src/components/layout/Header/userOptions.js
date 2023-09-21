import React, {useState} from 'react';
import "./Header.css";
import { SpeedDial, SpeedDialAction, Backdrop } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { logout } from '../../../actions/userAction';
import ProfileImage from "../../../images/Profile.png"


const UserOptions = ({user})=>{

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {cartItems} =useSelector(state => state.cart);


    const orders = ()=>{
        navigate("/orders");
    }

    const account = ()=>{
        navigate("/account");
    }

    const cart = ()=>{
        navigate("/cart");
    }

    const logoutUser = ()=>{
        dispatch(logout());
        toast.success("Logout Successfully");
        navigate("/");
    }

    const dashboard = ()=>{
        navigate("/admin/dashboard");   
    }

    const options = [
        {icon: <ListAltIcon />, name: "Orders", func: orders},
        {icon: <PersonIcon />, name: "Profile", func: account},
        {
            icon: (
                <ShoppingCartIcon
                    style={{color: cartItems.length>0? "tomato":"unset"}}
                    />
            ),
 name: `Cart (${cartItems.length})`, func: cart},
        {icon: <ExitToAppIcon />, name: "Logout", func: logoutUser}
    ];

    if(user.role ==="admin"){
        options.unshift({icon: <DashboardIcon />, name: "Dashboard", func: dashboard});
    }

    return (
        <>
         <Backdrop open={open} style={{zIndex:"10"}} />
         <SpeedDial
           ariaLabel='SpeedDial tooltip'
           onClose={()=>setOpen(false)}
           onOpen={()=>setOpen(true)}
           open={open}
           style={{zIndex:"11"}}
           direction="down"
           className="speedDial"
           icon={<img 
                  className="speedDialIcon"
                  src={user.avatar.url? user.avatar.url : {ProfileImage}}
                  alt="Profile"
                />
                }
           >
            {options.map((item)=> (
              <SpeedDialAction
               key={item.name}
               tooltipTitle={item.name}
               icon={item.icon}
               onClick={item.func}
               tooltipOpen={window.innerWidth <= 600 ? true : false}
               />
            ))}
           </SpeedDial>            
        </>
    )
}


export default UserOptions;