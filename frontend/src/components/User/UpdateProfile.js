import React, { useState, useEffect, Fragment } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import {  useNavigate } from "react-router-dom";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import ProfileImage from "../../images/Profile.png";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user }= useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(ProfileImage);
   
    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: name,
            email: email,
            avatar: avatar,
        };
        dispatch(updateProfile(payload));
    };

    const updateProfileDataChange = (e) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            const file = e.target.files[0];
            if (file) {
              reader.readAsDataURL(e.target.files[0]);
            }
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("Profile updated successfully");
            dispatch(loadUser());
            navigate("/account");
            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error, isUpdated, navigate, user]);


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Update Profile"} />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
             <h2 className="updateProfileHeading">Update Profile</h2>
              <form className="updateProfileForm" encType="multipart/form-data" onSubmit={updateProfileSubmit}>

                <div className="profile-pic" id="updateProfileImage">
                  <label className="-label" for="file">
                  <CameraAltIcon className="icon"/>

                  </label>
                  <input
                  id="file"
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                  <img src={avatarPreview} alt="Avatar Preview" />
              </div>

                <div className="updateProfileName">
                    <FaceIcon />
                    <input 
                        type="text"
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        />
                </div>
                
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input type="submit" value="Update" className="updateProfileBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default UpdateProfile;
