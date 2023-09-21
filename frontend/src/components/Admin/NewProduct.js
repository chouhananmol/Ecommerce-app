import React, { useEffect, useState } from 'react';
import "./newProduct.css";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createProduct } from '../../actions/productAction';
import { toast } from 'react-hot-toast';
import MetaData from '../layout/MetaData';
import { Button } from '@mui/material';
import { AccountTree, Description, Storage, Spellcheck, AttachMoney } from '@mui/icons-material';
import Sidebar from './Sidebar';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate } from 'react-router-dom';


const NewProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector(state => state.newProduct);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Mobile Phones",
        "Laptops",
        "Computer Mice",
        "Clothing",
    ];

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success('Product created successfully');
            navigate('/admin/dashboard');
            dispatch({ type: NEW_PRODUCT_RESET });
        }

    }, [dispatch, error, success, navigate]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('Stock', Stock);
        images.forEach(image => {
            formData.append('images', image);
        });
        dispatch(createProduct(formData));
    };

    const createProductImageHandler = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <>
            <MetaData title="New/Create Product" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        className='createProductForm'
                        encType='multipart/form-data'
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product</h1>
                        <div>
                            <Spellcheck />
                            <input
                                type="text"
                                placeholder='Name'
                                name='name'
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />

                        </div>
                        <div>
                            <AttachMoney />
                            <input
                                type="number"
                                placeholder='Price'
                                name='price'
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <Description />
                            <textarea
                                type="text"
                                placeholder='Product Description'
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                                required
                            ></textarea>
                        </div>
                        <div>
                            <AccountTree />
                            <select onChange={(e) => setCategory(e.target.value)} required>
                                <option value="">Choose Category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Storage />
                            <input
                                type="number"
                                placeholder='Stock'
                                name='stock'
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name='avatar'
                                accept="image/*"
                                onChange={createProductImageHandler}
                                multiple
                            />
                        </div>
                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>
                        <Button
                            type='submit'
                            id="createProductBtn"
                            disabled={loading ? true : false}
                        >
                            Create Product
                        </Button>
                    </form>
                </div>
            </div>

        </>
    );
}

export default NewProduct
