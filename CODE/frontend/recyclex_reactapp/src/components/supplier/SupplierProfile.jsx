import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/supplierStyles/SupplierProfile.module.css';

const SupplierProfile = () => {
    const [supplierData, setSupplierData] = useState({});
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('/default.jpg');
    const [editing, setEditing] = useState(false);
    const id = sessionStorage.getItem('supplierId');
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchSupplierData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/supplier/getSupplierById/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = response.data.data;
                setSupplierData({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    mobileNumber: data.mobile_number,
                    state: data.state,
                    city: data.city,
                    pincode: data.pincode,
                    supplierType: data.type,
                    password: data.password,
                    imageName: data.imageName
                });

                if (data.imageName) {
                    setPreviewImage(`http://localhost:3000/images/${data.imageName}`);
                }
            } catch (error) {
                console.error("Error fetching supplier data:", error);
            }
        };
        fetchSupplierData();
    }, [id, token]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleImageUpload = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post(`http://localhost:5000/supplier/uploadimg/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Image uploaded:", response.data);
            setPreviewImage(`http://localhost:5000/images/${response.data.data.image}`);
            setSupplierData({ ...supplierData, imageName: response.data.data.image });
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleInputChange = (e) => {
        setSupplierData({ ...supplierData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/supplier/update/${id}`, supplierData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log("Profile updated:", response.data);
            setEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.imageContainer}>
                <img src={previewImage} alt="Profile" className={styles.profileImage} onClick={() => document.getElementById('imageInput').click()} />
                <input type="file" id="imageInput" style={{ display: 'none' }} onChange={handleImageChange} />
            </div>

            <div className={styles.formContainer}>
                <form>
                    <div className={styles.twoColumns}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" id="firstName" name="firstName" value={supplierData.firstName || ''} onChange={handleInputChange} disabled={!editing} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" value={supplierData.lastName || ''} onChange={handleInputChange} disabled={!editing} />
                        </div>
                    </div>
                    <div className={styles.twoColumns}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="mobileNumber">Mobile Number:</label>
                            <input type="text" id="mobileNumber" name="mobileNumber" value={supplierData.mobileNumber || ''} onChange={handleInputChange} disabled={!editing} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" value={supplierData.password || ''} onChange={handleInputChange} disabled={!editing} />
                        </div>
                    </div>

                    <div className={styles.oneColumn}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="state">State:</label>
                            <input type="text" id="state" name="state" value={supplierData.state || ''} onChange={handleInputChange} disabled={!editing} />
                        </div>
                    </div>
                    <div className={styles.oneColumn}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="city">City:</label>
                            <input type="text" id="city" name="city" value={supplierData.city || ''} onChange={handleInputChange} disabled={!editing} />
                        </div>
                    </div>
                    <div className={styles.oneColumn}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="pincode">Pincode:</label>
                            <input type="text" id="pincode" name="pincode" value={supplierData.pincode || ''} onChange={handleInputChange} disabled={!editing} />
                        </div>
                    </div>
                    <div className={styles.oneColumn}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="supplierType">Supplier Type:</label>
                            <input type="text" id="supplierType" name="supplierType" value={supplierData.supplierType || ''} onChange={handleInputChange} disabled={!editing} />
                        </div>
                    </div>

                    <div className={styles.buttonGroup}>
                        {editing ? (
                            <>
                                <button type="button" onClick={handleUpdate} className={styles.saveButton}>Save</button>
                                <button type="button" onClick={() => setEditing(false)} className={styles.cancelButton}>Cancel</button>
                            </>
                        ) : (
                            <button type="button" onClick={() => setEditing(true)} className={styles.editButton}>Edit Profile</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SupplierProfile;