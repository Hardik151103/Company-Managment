import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import { AddProjectApi, EditProjectApi, DeleteProjectApi, setValue as setProjectValue } from '../Redux/Slice/ProjectSlice';
import { FaPlus } from 'react-icons/fa';
import moment from 'moment';
import axios from 'axios';
import ViewMaster from './ViewMaster';

const Projects = () => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.projectForm.value);
    const loading = useSelector((state) => state.projectForm.loading);
    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        let token = localStorage.getItem('token');
        axios.get('https://employee-system-nodejs.vercel.app/api/project/getAllProject', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            dispatch(setProjectValue(res.data.data));
        });
    }, [dispatch]);

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        reset();
        setFormData({});
    };

    const onSubmit = async (formData) => {
        try {
            formData.startDate = moment(formData.startDate).format('YYYY-MM-DD');
            formData.endDate = moment(formData.endDate).format('YYYY-MM-DD');
            console.log('Form data:', formData);

            if (formData._id) {
                await dispatch(EditProjectApi(formData));
            } else {
                await dispatch(AddProjectApi(formData));
            }
        } catch (error) {
            console.error("Error saving project:", error);
        } finally {
            closeModal();
        }
    };

    const editData = (element) => {
        setValue('_id', element._id);
        setValue('name', element.name);
        setValue('startDate', moment(element.startDate).format('YYYY-MM-DD'));
        setValue('endDate', moment(element.endDate).format('YYYY-MM-DD'));
        setValue('status', element.status);
        setValue('description', element.description);
        openModal();
    };

    const deleteData = async (id) => {
        await dispatch(DeleteProjectApi(id));
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
            <div className='project_bg_color'>
                {loading && <LoadingScreen />}
                <div className="project-container">
                    <div className="project-header">
                        <h2 className='p-1'>Projects</h2>
                        <Button variant="warning" onClick={openModal} className="add-new-button">
                            <FaPlus className='icon' />
                            Add New Project
                        </Button>
                    </div>
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Status</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ? (
                                    data.map((element, index) => (
                                        <tr key={index}>
                                            <td>{element.name}</td>
                                            <td>{moment(element.startDate).format('DD-MM-YYYY')}</td>
                                            <td>{moment(element.endDate).format('DD-MM-YYYY')}</td>
                                            <td>{element.status}</td>
                                            <td>{element.description}</td>
                                            <td>
                                                <button className='btn btn-warning py-0' onClick={() => editData(element)}>EDIT</button>
                                                <button className='btn btn-danger py-0 ms-2' onClick={() => deleteData(element._id)}>DELETE</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ fontSize: '20px' }}>No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Modal show={showModal} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{formData._id ? 'Edit Project' : 'Add New Project'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-100 mx-auto p-4 round fw-bold form_bg'>
                                <div className="p-field">
                                    <label htmlFor="name">Name</label>
                                    <InputText {...register('name', { required: 'Name is required' })} />
                                    {errors.name && <span className='text-danger'>{errors.name.message}</span>}
                                </div>

                                <div className="p-field">
                                    <label htmlFor="startDate">Start Date</label>
                                    <input
                                        type="date"
                                        {...register('startDate', { required: 'Start Date is required' })}
                                        defaultValue={watch('startDate') ? moment(watch('startDate')).format('YYYY-MM-DD') : ''}
                                    />
                                    {errors.startDate && <span className='text-danger'>{errors.startDate.message}</span>}
                                </div>

                                <div className="p-field">
                                    <label htmlFor="endDate">End Date</label>
                                    <input
                                        type="date"
                                        {...register('endDate', { required: 'End Date is required' })}
                                        defaultValue={watch('endDate') ? moment(watch('endDate')).format('YYYY-MM-DD') : ''}
                                    />
                                    {errors.endDate && <span className='text-danger'>{errors.endDate.message}</span>}
                                </div>

                                <div className="p-field">
                                    <label htmlFor="status">Status</label>
                                    <select {...register('status', { required: 'Status is required' })} className="form-select custom-select">
                                        <option value="">Select a status</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Not Started">Not Started</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                    {errors.status && <span className='text-danger'>{errors.status.message}</span>}
                                </div>

                                <div className="p-field">
                                    <label htmlFor="description">Description</label>
                                    <InputText {...register('description', { required: 'Description is required' })} />
                                    {errors.description && <span className='text-danger'>{errors.description.message}</span>}
                                </div>

                                <Button type="submit" variant="primary">
                                    {formData._id ? 'Update Project' : 'Add Project'}
                                </Button>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </ViewMaster>
    );
};

export default Projects;
