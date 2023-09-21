import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import { MailOutline, Person, VerifiedUser } from '@mui/icons-material';
import Sidebar from './Sidebar';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import { getUserDetails, updateUser, clearErrors } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const { loading, error, user } = useSelector(state => state.userDetails);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector(state => state.profile);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        if (user && user._id !== id) {
            dispatch(getUserDetails(id));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            toast.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success('User updated successfully');
            navigate('/admin/users');
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, error, updateError, isUpdated, user, id, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(`user Details: name-${name} \n email-${email} \n role- ${role}`);
        dispatch(updateUser(id, { name, email, role }));
    };

    return (
        <>
            <MetaData title={'Update User'} />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {loading ? <Loader /> : (
                        <form className="createProductForm" onSubmit={submitHandler}>
                            <h1>Update User</h1>
                            <div>
                                <Person />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <MailOutline />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <VerifiedUser />
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Choose Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            <Button type="submit" variant="contained" color="primary"
                                id="createProductBtn"
                                disabled={updateLoading ? true : false || role === "" ? true : false}
                            >
                                Update
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}

export default UpdateUser
