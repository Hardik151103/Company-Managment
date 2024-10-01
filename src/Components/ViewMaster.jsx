import React from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'

function ViewMaster(props) {
  return (
    <>
    <div className='d-flex'>
        <div className='sidebar'>
            <Sidebar />
        </div>
        <div className='w-100'>
            {
                !props.hide && <Header />
            }
           
            <div>
                {props.children}
            </div>
        </div>
    </div>
    </>
  )
}

export default ViewMaster;