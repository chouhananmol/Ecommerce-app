import React from 'react';
import "./Sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from '@mui/x-tree-view';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to='/'>
                <img src={logo} alt="Ecommerce" />
            </Link>
            <Link to='/admin/dashboard'>
                <p>
                    <DashboardIcon />Dashboard
                </p>
            </Link>
            <Link>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ImportExportIcon />}
                >
                    <TreeItem className='link-product' nodeId="1" label="Products">
                        <Link className='link-product' to='/admin/products'>
                            <TreeItem nodeId="2" label="All Products" icon={<PostAddIcon />} />
                        </Link>
                        <Link className='link-product' to='/admin/product'>
                            <TreeItem nodeId="3" label="Create Product" icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
            <Link to="/admin/orders">
                <p>
                    <ListAltIcon />Orders
                </p>
            </Link>
            <Link to="/admin/users">
                <p>
                    <PeopleIcon />Users
                </p>
            </Link>
            <Link to="/admin/reviews">
                <p>
                    <RateReviewIcon />Reviews
                </p>
            </Link>


        </div>
    )
}

export default Sidebar;
