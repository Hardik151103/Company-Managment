import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import { AddManagerApi, EditManagerApi, DeleteManagerApi, setValue as setManageValue } from '../Redux/Slice/ManagerSlice';
import { FaPlus } from 'react-icons/fa';
import moment from 'moment';
import axios from 'axios';
import ViewMaster from './ViewMaster';

const Manager = () => {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const data = useSelector((state) => state.managerForm.value);
    const loading = useSelector((state) => state.managerForm.loading);
    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        let token = localStorage.getItem('token');
        axios.get('https://employee-system-nodejs.vercel.app/api/manager/getAllManager', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            dispatch(setManageValue(res.data.data))
        })
    }, [dispatch]);

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        reset();
        setFormData({});
    };

    const onSubmit = async (formData) => {
        try {
            formData.birthDate = moment(formData.birthDate).format('YYYY-MM-DD');
            console.log('Form data:', formData);

            if (formData._id) {
                await dispatch(EditManagerApi(formData));
            } else {
                await dispatch(AddManagerApi(formData));
            }
        } catch (error) {
            console.error("Error saving manager:", error);
        } finally {
            closeModal();
        }
    };


    const editData = (element) => {
        setValue('_id', element._id);
        setValue('name', element.name);
        setValue('surname', element.surname);
        setValue('email', element.email);
        setValue('mobileNo', element.mobileNo);
        setValue('birthDate', moment(element.birthDate, 'YYYY-MM-DD').format('YYYY-MM-DD'));
        setValue('position', element.position);
        setValue('projects', element.projects);
        setValue('gender', element.gender);
        setValue('address', element.address);
        openModal();
    };

    const deleteData = async (id) => {
        await dispatch(DeleteManagerApi(id));
    };

    const LoadingScreen = () => (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
        }}>
            <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    return (
        <ViewMaster>
            <div className='manager_bg_color'>
                {loading && <LoadingScreen />}
                <div className="manager-container">
                    <div className="manager-header">
                        <h2 className='p-1'>Manager</h2>
                        <Button variant="info" onClick={openModal} className="add-new-button">
                            <FaPlus className='icon' />
                            Add New Manager
                        </Button>
                    </div>
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Mobile Number</th>
                                    <th>Email</th>
                                    <th>Birth Date</th>
                                    <th>Gender</th>
                                    <th>Position</th>
                                    <th>Projects</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ? (
                                    data.map((element, index) => (
                                        <tr key={index}>
                                            <td>{element.name}</td>
                                            <td>{element.surname}</td>
                                            <td>{element.mobileNo}</td>
                                            <td>{element.email}</td>
                                            <td>{moment(element.birthDate, 'YYYY-MM-DD').format('DD-MM-YYYY')}</td>
                                            <td>{element.gender}</td>
                                            <td>{element.position}</td>
                                            <td>{element.projects}</td>
                                            <td>{element.address}</td>
                                            <td>
                                                <button className='btn btn-warning py-0 mb-1' onClick={() => editData(element)}>EDIT</button>
                                                <button className='btn btn-danger py-0 ' onClick={() => deleteData(element._id)}>DELETE</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10" style={{ fontSize: '20px' }}>No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Modal show={showModal} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{formData._id ? 'Edit Manager' : 'Add New Manager'}</Modal.Title>
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
                                    <label htmlFor="mobileNo">Mobile Number</label>
                                    <InputText type='number' {...register('mobileNo', { required: 'Mobile Number is required' })} />
                                    {errors.mobileNo && <span className='text-danger'>{errors.mobileNo.message}</span>}
                                </div>

                                <div className="p-field">
                                    <label htmlFor="email">Email</label>
                                    <InputText {...register('email', { required: 'Email is required' })} />
                                    {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                                </div>

                                <div className="p-field">
                                    <label htmlFor="birthDate">Birth Date</label>
                                    <input
                                        type="date"
                                        {...register('birthDate', { required: 'Birth Date is required' })}
                                        defaultValue={watch('birthDate') ? moment(watch('birthDate')).format('YYYY-MM-DD') : ''}
                                    />
                                    {errors.birthDate && <span className='text-danger'>{errors.birthDate.message}</span>}
                                </div>

                                <div className="p-field">
                                    <label htmlFor="position">Position</label>
                                    <select {...register('position', { required: 'Position is required' })} className="form-select custom-select">
                                        <option value="">Select a position</option>
                                        <option value="Project Manager">Project Manager</option>
                                        <option value="Systems Analyst">Systems Analyst</option>
                                    </select>
                                    {errors.position && <span className='text-danger'>{errors.position.message}</span>}
                                </div>

                                <div className="p-field">
                                    <label htmlFor="gender">Gender</label>
                                    <div>
                                        <label>
                                            <input type="radio" {...register('gender', { required: 'Gender is required' })} value="Male" /> Male
                                        </label>
                                        <label className="ms-3">
                                            <input type="radio" {...register('gender', { required: 'Gender is required' })} value="Female" /> Female
                                        </label>
                                        {errors.gender && <span className='text-danger d-block mt-2'>{errors.gender.message}</span>}
                                    </div>
                                </div>

                                <div className="p-field">
                                    <label htmlFor="projects">Projects</label>
                                    <InputText type='number' {...register('projects', { required: 'Projects is required' })} />
                                    {errors.projects && <span className='text-danger'>{errors.projects.message}</span>}
                                </div>

                                <div className="p-field">
                                    <label htmlFor="address">Address</label>
                                    <InputText {...register('address', { required: 'Address is required' })} />
                                    {errors.address && <span className='text-danger'>{errors.address.message}</span>}
                                </div>

                                <Button type="submit" variant="primary">
                                    {formData._id ? 'Update Manager' : 'Add Manager'}
                                </Button>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </ViewMaster>
    );
};

export default Manager;
