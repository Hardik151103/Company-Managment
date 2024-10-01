import React, { useEffect, useState } from 'react';
import ViewMaster from '../Components/ViewMaster'
import { useDispatch, useSelector } from 'react-redux'
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { updateCompanySetting } from '../Redux/Slice/CompanySettingslice';
import "../CSS/CompanySetting.css"

function CompanySetting() {
  const companyDetails = useSelector(state => state.companySetting.value)
  console.log(companyDetails);
  
    const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const [isDisable, setisDisable] = useState(true)

    useEffect(() => {
      if(companyDetails._id){
        for(let key in companyDetails){
          setValue(key , companyDetails[key])
        }
        setValue('companyStartedDate' , new Date(companyDetails.companyStartedDate))
        console.log(watch('companyStartedDate'))
        console.log(companyDetails)
      }
    }, [companyDetails])
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
  });
    const onSubmit = (data) => {
      console.log(data)
      dispatch(updateCompanySetting(data))
      setisDisable(true)
    }

    
  return (
    <>
      <ViewMaster>
        <div className='container companySetting'>
          <div className='row bg-white rounded p-3 shadow'>
            <h2 className='p-1'>Company Setting</h2>

            <div className='col-3'>
              
              <label htmlFor="companysetting"><img src={companyDetails.companyLogo} alt="" /></label>
              <InputText type='file' className='myInput mb-2 d-none' id='profile' {...register("companyLogo")} disabled={isDisable} onChange={async(e) => {
                let str = await toBase64(e.target.files[0])
                console.log(e.target.files[0])
                setValue('companyLogo', str)
              }} />
            </div>
            <div className='col-9'>
              {
                isDisable &&  <button className='btn btn-warning float-end mb-2' onClick={() => setisDisable(false)}>Edit</button>
              }
             
              <form onSubmit={handleSubmit(onSubmit)}>
                  <InputText className='myInput mb-2' disabled={isDisable} {...register("companyName", { required: true })} />
                  <InputText className='myInput mb-2' disabled={true} {...register("companyEmail", { required: true })} />
                  <InputText type='number' className='myInput mb-2' disabled={isDisable} {...register("companyMobileNumber", { required: true })} />
                  <Calendar className='mb-2 w-100' showIcon  disabled={isDisable} value={watch('companyStartedDate')} {...register("companyStartedDate", { required: true })} />
                  <InputText className='myInput mb-2' disabled={isDisable} {...register("gstNo", { required: true })} />
                  <InputText className='myInput mb-2' disabled={isDisable} {...register("city", { required: true })} />
                  <InputText className='myInput mb-2' disabled={isDisable} {...register("state", { required: true })} />
                  <InputText className='myInput mb-2' disabled={isDisable} {...register("country", { required: true })} />
                  <InputTextarea className='myInput mb-2' disabled={isDisable} {...register("companyAddress1", { required: true })} rows={3} cols={30} />
                  <InputTextarea className='myInput mb-2' disabled={isDisable} {...register("companyAddress2", { required: true })} rows={3} cols={30} />
                  <br />

                  {
                    isDisable == false &&  <button className='btn btn-success mb-2'>Save</button>
                  }
              </form>

            </div>  
          </div>
        </div>
      </ViewMaster>
    </>
  )
}

export default CompanySetting;