import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { clearErrors, updateProduct, getProductDetails } from '../../actions/productAction';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { AccountTree, Description, Storage, Spellcheck, AttachMoney } from '@mui/icons-material';
import Sidebar from './Sidebar';
import MetaData from '../layout/MetaData';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { error, product } = useSelector((state) => state.productDetails);
    const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Mobile Phones",
        "Laptops",
        "Computer Mice",
        "Clothing",
    ];

    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(getProductDetails(id));
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
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
            toast.success('Product Updated Successfully');
            navigate('/admin/products');
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, product, id, updateError]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('Stock', Stock);
        images.forEach((image) => {
            formData.append('images', image);
        });
        dispatch(updateProduct(id, formData));
    };

    const updateProductImageHandler = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                    setImages(oldArray => [...oldArray, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };




    return (
        <>
            <MetaData title="Update Product" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        className='createProductForm'
                        encType='multipart/form-data'
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Update Product</h1>
                        <div>
                            <Spellcheck />
                            <input
                                type="text"
                                placeholder='Name'
                                value={name}
                                name='name'
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
                                value={price}
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
                            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
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
                                value={Stock}
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name='avatar'
                                accept="image/*"
                                onChange={updateProductImageHandler}
                                multiple
                            />
                        </div>
                        <div id="createProductFormImage">
                            {oldImages && oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt="Old Product Preview" />
                            ))}
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
                            Update Product
                        </Button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default UpdateProduct
