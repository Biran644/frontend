import {useEffect, useState} from "react";

import 'react-csv-importer/dist/index.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        <button onClick={ImportCSV} className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500">
          <span className="absolute -start-full transition-all group-hover:start-4">
            <svg
              className="size-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
    
          <span className="text-sm font-medium transition-all group-hover:ms-4"> Open CSV Importer </span>
        </button>
        
        <button onClick={deleteAll}>Delete All</button>
  
        


        
          


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
