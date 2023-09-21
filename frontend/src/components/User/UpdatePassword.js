import React, { useState, useEffect, Fragment } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const payload = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
        };
        dispatch(updatePassword(payload));
    };

    useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearErrors());
        }
        if (isUpdated) {
          toast.success("Password updated successfully");
            navigate("/account");
            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, error, isUpdated, navigate]);

  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title={"Password Update"} />
        <div className="updatePasswordContainer">
          <div className="updatePasswordBox">
           <h2 className="updatePasswordHeading">Change Password</h2>
            <form className="updatePasswordForm" onSubmit={updatePasswordSubmit}>
              <div className="loginPassword">
                  <VpnKeyIcon />
                  <input 
                      type="password"
                      placeholder="Old Password"
                      required
                      value={oldPassword}
                      onChange={(e)=> setOldPassword(e.target.value)}
                      />
              </div>
              
              <div className="loginPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={newPassword}
                  onChange={(e)=> setNewPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockIcon />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e)=> setConfirmPassword(e.target.value)}
                />
              </div>
              <input type="submit" value="Change" className="updatePasswordBtn" />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default UpdatePassword
