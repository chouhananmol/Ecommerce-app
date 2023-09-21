import React, { useState, useEffect } from 'react';
import "./ResetPassword.css";
import Loader from '../layout/Loader/Loader';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../../actions/userAction';
import MetaData from '../layout/MetaData';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import { useParams, useNavigate } from 'react-router-dom';


const ResetPassword = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const {token} = useParams();

        const {error, success, loading} = useSelector(state => state.forgotPassword);

        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');

        const resetPasswordSubmit = (e) => {
            e.preventDefault();
            const data = {
                password: password,
                confirmPassword: confirmPassword,
              };
              dispatch(resetPassword(token, data));
        }

        useEffect(()=>{
            if(error){
                toast.error(error);
                dispatch(clearErrors());
            }
            if(success){
                toast.success('Password updated successfully');
                navigate('/login');
            }
        }, [dispatch, error, success, navigate]);

        return(
            <>
            {loading ? <Loader/> : (
                <>
                <MetaData title={'Reset Password'} />
                <div className="resetPasswordContainer">
                    <div className="resestPasswordBox">
                        <h2 className="resetPasswordHeading">Reset Password</h2>
                        <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
                            <div>
                                <LockOpenIcon />
                                <input 
                                    type="password"
                                    placeholder="Enter new password"
                                    required
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                            <div className="loginPassword">
                                <LockIcon />
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e)=>setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="resetPasswordBtn">Reset Password</button>
                         </form>
                    </div>
                </div>
                </>
            )}
            </>
        )
};

export default ResetPassword;