import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./productList.css";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar';
import { getAllUsers, deleteUser, clearErrors } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';
import { useNavigate } from 'react-router-dom';


const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, users } = useSelector(state => state.allUsers);
  const { error: deleteError, isDeleted, message } = useSelector(state => state.profile);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success(message);
      navigate('/admin/users');
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted, navigate, message]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    { field: "name", headerName: "User Name", minWidth: 150, flex: 0.5 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    {
      field: "role", headerName: "Role", type: "number", minWidth: 100, flex: 0.3,
      renderCell: (params) => {
        return params.row.role === 'admin' ? <div style={{ color: "green" }} >{params.row.role}</div>
          : <div style={{ color: "red" }}>{params.row.role}</div>;
      }
    },
    {
      field: "actions", headerName: "Actions", minWidth: 150, flex: 0.3, sortable: false, type: "number",
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.row.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      }
    },
  ];
  const rows = [];
  users && users?.forEach((person) => {
    rows.push({
      id: person._id,
      name: person.name,
      email: person.email,
      role: person.role,
    });
  });

  return (
    <>
      <MetaData title={'All Products --Admin'} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">All Users</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            className="productListTable"
            autoHeight />
        </div>
      </div>
    </>
  )
}

export default UserList;
