import React, {Fragment , useState, useEffect} from 'react';
import "./ForgotPassword.css";
import Loader from '../layout/Loader/Loader';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearErrors } from '../../actions/userAction';
import MetaData from '../layout/MetaData';

const ForgotPassword = () => {
    const dispatch = useDispatch();

    const {error, message, loading}= useSelector(state => state.forgotPassword);
    const [email, setEmail] = useState('');
    const forgotPasswordSubmit =(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.set('email', email);
        dispatch(forgotPassword(formData));
    };
    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(message){
            toast.success(message);
        }
    }, [dispatch, error, message]);

  return (
   <Fragment>
    {loading? <Loader /> :(
        <Fragment>
            <MetaData title='Forgot Password' />
            <div className="forgotPasswordContainer">
                <div className="forgotPasswordBox">
                    <h2 className="forgotPasswordHeading">Forgot Password</h2>
                    <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
                        <div className="forgotPasswordEmail">
                            <MailOutlineIcon />
                            <input 
                                type="email"
                                placeholder="Enter Email"
                                required
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="forgotPasswordBtn">Send Email</button>
                        
                    </form>
                </div>
            </div>
        </Fragment>
    )}
   </Fragment>
  )
}

export default ForgotPassword;
