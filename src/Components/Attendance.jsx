import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../CSS/Attendance.css"
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ViewMaster from '../Components/ViewMaster';
import { TabView, TabPanel } from 'primereact/tabview';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { baseUrl, headers } from '../Constant';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
const localizer = momentLocalizer(moment);

const Attendance = () => {

  const CustomToolbar = (props) => {
    const { onNavigate, label } = props;

    return (
      <div className="rbc-toolbar">
        <span className="">
          <span>{label}</span>
        </span>
      </div>
    );
  };

  const managers = useSelector(state => state.managerForm.value)
  const employees = useSelector(state => state.employeeForm.value)
  const [visible, setVisible] = useState(false)
  const [visibleAttendance, setVisibleAttendance] = useState(false)
  const [events, setevents] = useState([])
  const [obj, setobj] = useState({})


  const selectUser = (id) => {
    setobj({ ...obj, userId: id })
    axios.get(`${baseUrl}/attendance/getAttendance?userId=${id}`, headers).then((res) => {
      setVisible(true)

      let data = res.data.data.map((x) => {
        if (x.isPresent) {
          return {
            'title': x.hour + ':' + x.minute,
            'start': new Date(x.date),
            'end': new Date(x.date)
          }
        }
      }).filter(x => x)
      setevents([...data])
    })
  }
  const selectDay = (startDate) => {
    setVisibleAttendance(true)
    setobj({ ...obj, date: startDate })
  }

  const saveAttendance = () => {
    let year = new Date(obj.date).getFullYear();
    let month = new Date(obj.date).getMonth() + 1;
    let date = new Date(obj.date).getDate();
    obj.date = `${year}-${month <= 9 ? ('0' + month.toString()) : month}-${date <= 9 ? ('0' + date.toString()) : date}T00:00:00.000Z`;
    axios.post(`${baseUrl}/attendance/submitAttendance`, obj, headers).then((res) => {
      setVisible(false)
      setVisibleAttendance(false)
    })
  }

  return (
    <>
      <ViewMaster >
        <div className='p-20px'>
          <h2 className='p-1'>Attendance</h2>

          <div className="card">
            <TabView>
              <TabPanel header="Employee">
                <DataTable value={employees} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}>
                  <Column field="name" header="Name"></Column>
                  <Column field="surname" header="Surname"></Column>
                  <Column field="email" header="Email"></Column>
                  <Column field="managerName" header="Manager Name"></Column>
                  <Column field="mobileNo" header="Mobile No."></Column>
                  <Column field="gender" header="Gender"></Column>
                  <Column field="position" header="Position"></Column>
                  <Column field="projects" header="Projects"></Column>
                  <Column header="Birth Date" body={(rowData) => moment(rowData.birthDate).format('DD/MM/YYYY')}></Column>
                  <Column field="address" header="Address"></Column>
                  <Column header="Action" body={(rowData) => <>
                    <button className='btn btn-warning py-1 me-2' onClick={() => selectUser(rowData._id)}>Open</button>
                  </>}></Column>
                </DataTable>
              </TabPanel>
              <TabPanel header="Manager">
                <DataTable value={managers} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}>
                  <Column field="name" header="Name"></Column>
                  <Column field="surname" header="Surname"></Column>
                  <Column field="email" header="Email"></Column>
                  <Column field="mobileNo" header="Mobile No."></Column>
                  <Column field="gender" header="Gender"></Column>
                  <Column field="position" header="Position"></Column>
                  <Column field="projects" header="Projects"></Column>
                  <Column header="Birth Date" body={(rowData) => moment(rowData.birthDate).format('DD/MM/YYYY')}></Column>
                  <Column field="address" header="Address"></Column>
                  <Column header="Action" body={(rowData) => <>
                    <button className='btn btn-warning py-1 me-2' onClick={() => selectUser(rowData._id)}>Open</button>
                  </>}></Column>
                </DataTable>
              </TabPanel>
            </TabView>
          </div>

          <Dialog header="Header" visible={visible} style={{ width: '70vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
            <div style={{ height: 700, width: '100%' }} className='bg-white p-3 shadow rounded'>
              <Calendar
                localizer={localizer}
                defaultView="month" // Specify the default view
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%', width: '100%' }}
                events={events}
                onSelectSlot={({ start }) => selectDay(start)}
                selectable
                components={{
                  toolbar: CustomToolbar // Use the custom toolbar component here
                }}
              />
            </div>
          </Dialog>


          <Dialog header="Header" visible={visibleAttendance} style={{ width: '70vw' }} onHide={() => { if (!visibleAttendance) return; setVisibleAttendance(false); }}>
            <div className='bg-white p-3 shadow rounded'>
              <InputText className='myInput mb-2' placeholder='Hour' onChange={(e) => setobj({ ...obj, hour: e.target.value })} />
              <InputText className='myInput mb-2' placeholder='Minute' onChange={(e) => setobj({ ...obj, minute: e.target.value })} />
              <InputTextarea className='myInput mb-2' placeholder='Comment' rows={3} cols={30} onChange={(e) => setobj({ ...obj, comment: e.target.value })} />

              <button type='button' onClick={() => saveAttendance()}>Save</button>
            </div>
          </Dialog>
        </div>
      </ViewMaster>
    </>
  );
};

export default Attendance;
