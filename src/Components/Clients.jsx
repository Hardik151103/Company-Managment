import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { addClientApi, getClientApi, editClientApi, deleteClientApi } from '../Redux/Slice/ClientSlice';
import ViewMaster from './ViewMaster';

const Client = () => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.clientForm.value);
    const loading = useSelector((state) => state.clientForm.loading);
    const error = useSelector((state) => state.clientForm.error);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        dispatch(getClientApi());
    }, [dispatch]);

    const openModal = (client = null) => {
        if (client) {
            Object.keys(client).forEach(key => setValue(key, client[key]));
        } else {
            reset();
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        reset();
    };

    const onSubmit = async (formData) => {
        try {
            formData.companyId = formData.companyId || localStorage.getItem('companyId');

            if (formData._id) {
                await dispatch(editClientApi(formData));
            } else {
                await dispatch(addClientApi(formData));
            }
        } catch (error) {
            console.error("Error saving client:", error);
        } finally {
            closeModal();
        }
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteClientApi(id));
        } catch (error) {
            console.error("Error deleting client:", error);
        }
    };

    return (
        <ViewMaster>
            <div className="client_bg_color">
                {loading && <div>Loading...</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="client-container">
                    <div className="client-header">
                        <h2 className='p-1'>Clients</h2>
                        <Button variant="warning" onClick={() => openModal()} className="add-new-button">
                            <FaPlus className='icon' /> Add New Client
                        </Button>
                    </div>
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Email</th>
                                    <th>Mobile Number</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Country</th>
                                    <th>Gender</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ? (
                                    data.map((element) => (
                                        <tr key={element._id}>
                                            <td>{element.name}</td>
                                            <td>{element.surname}</td>
                                            <td>{element.email}</td>
                                            <td>{element.mobileNo}</td>
                                            <td>{element.city}</td>
                                            <td>{element.state}</td>
                                            <td>{element.country}</td>
                                            <td>{element.gender}</td>
                                            <td>
                                                <button className='btn btn-warning py-0 mb-1' onClick={() => openModal(element)}>EDIT</button>
                                                <button className='btn btn-danger py-0' onClick={() => handleDelete(element._id)}>DELETE</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" style={{ fontSize: '20px' }}>No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Modal show={showModal} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{setValue._id ? 'Edit Client' : 'Add New Client'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-100 mx-auto p-4 round fw-bold form_bg'>
                                <div className="p-field">
                                    <label htmlFor="name">Name</label>
                                    <InputText {...register('name', { required: 'Name is required' })} />
                                    {errors.name && <span className='text-danger'>{errors.name.message}</span>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="surname">Surname</label>
                                    <InputText {...register('surname', { required: 'Surname is required' })} />
                                    {errors.surname && <span className='text-danger'>{errors.surname.message}</span>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="email">Email</label>
                                    <InputText {...register('email', { required: 'Email is required' })} />
                                    {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="mobileNo">Mobile Number</label>
                                    <InputText type='number' {...register('mobileNo', { required: 'Mobile Number is required' })} />
                                    {errors.mobileNo && <span className='text-danger'>{errors.mobileNo.message}</span>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="city">City</label>
                                    <InputText {...register('city', { required: 'City is required' })} />
                                    {errors.city && <span className='text-danger'>{errors.city.message}</span>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="state">State</label>
                                    <InputText {...register('state', { required: 'State is required' })} />
                                    {errors.state && <span className='text-danger'>{errors.state.message}</span>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="country">Country</label>
                                    <InputText {...register('country', { required: 'Country is required' })} />
                                    {errors.country && <span className='text-danger'>{errors.country.message}</span>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="gender">Gender</label>
                                    <InputText {...register('gender', { required: 'Gender is required' })} />
                                    {errors.gender && <span className='text-danger'>{errors.gender.message}</span>}
                                </div>
                                <Button type="submit" variant="warning">{setValue._id ? 'Edit Client' : 'Add New Client'}</Button>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </ViewMaster>
    );
};

export default Client;
