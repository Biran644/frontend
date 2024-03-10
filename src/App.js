import {useEffect, useState} from "react";

import 'react-csv-importer/dist/index.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@fluentui/react-components';
import {Placeholder} from "./Placeholder";


function App() {


  // const notify = () => toast.success('Completed', {
  //                                     position: "bottom-right",
  //                                     autoClose: 5000,
  //                                     hideProgressBar: false,
  //                                     closeOnClick: true,
  //                                     pauseOnHover: true,
  //                                     draggable: true,
  //                                     progress: undefined,
  //                                     theme: "dark",
  //                                     });

 




  const deleteAll = () => {
    console.log('sending to main');
    window.electron.ipcRenderer.send('deleteAll');
    console.log('sent to main');
  }

  const ImportCSV = () => {
    console.log('Importing CSV');
    window.electron.ipcRenderer.send('ImportCSV');
    console.log('CSV imported');
  }


  // const New = () => {
  //   console.log('Creating a new day');
  //   window.electron.ipcRenderer.send('New');
  //   console.log('New day created');
  // }



  return (
      <div>

        <Button onClick={ImportCSV} appearance="primary">Get started</Button>
        <button onClick={deleteAll}>Delete All</button>



          <div className="my-4">
              <Placeholder
                  fieldName="First Round Time"
                  fieldPlaceholder="Enter the first round time"
              />
          </div>



          <Placeholder
              fieldName="Jump Off Round Time"
              fieldPlaceholder="Enter the Jump Off Round Time"
          />

        
          


          {/* {
            data && data.length > 0 ? <div>
              <h1>Preview</h1>
              <Table dataSource={data} columns={columns}
                     bordered={true}
                     loading={false}
                     pagination={false}
                     sticky={true}
                     size="small"
              />
             
            </div> : <div>Vide</div>
          } */}


        <ToastContainer/>

      </div>
  );
}

export default App;
