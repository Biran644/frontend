import { useState } from 'react';
import {Importer, ImporterField} from 'react-csv-importer';
import "./App.css"

export default function ImportCSV() {
  const [data, setData] = useState([]);
  const [classNumber, setClassNumber] = useState('');
  const [firstRoundTime, setFirstRoundTime] = useState('');
  const [joRoundTime, setJoRoundTime] = useState('');
  const [competition, setCompetition] = useState('');

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const columns = [
    {
      title: 'Competition',
      dataIndex: 'competition',
      key: 'competition',
    },
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number'
    },
    {
      title: 'Horse',
      dataIndex: 'horse',
      key: 'horse',
    },
    {
      title: 'Rider',
      dataIndex: 'rider',
      key: 'rider',
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Time 1',
      dataIndex: 'time1',
      key: 'time1',
    },
    {
      title: 'Faults 1',
      dataIndex: 'faults1',
      key: 'faults1',
    },
    {
      title: 'JO Time',
      dataIndex: 'jo_time',
      key: 'jo_time',
    },
    {
      title: 'JO Faults',
      dataIndex: 'jo_faults',
      key: 'jo_faults',
    },
  ];

  const sendToMain = () => {
    // Add input values to each item in data
    const updatedData = data.map(item => ({
      ...item,
      class: classNumber,
      time1: firstRoundTime,
      jo_time: joRoundTime,
      competition: competition,
    }));
    console.log('sending to main');
    console.log(updatedData);
    window.electron.ipcRenderer.send('dataImported', updatedData);
    console.log('sent to main');
  };


  const TestExit = () => {
    window.electron.ipcRenderer.send('exitTestMode');
  }
  
  return (
    <div className='bg-gray-900' style={{
      minHeight: '100vh'
    }}>
      <Importer
              dataHandler={async (rows) => {
                  // required, receives a list of parsed objects based on defined fields and user column mapping;
                  // may be called several times if file is large
                  // (if this callback returns a promise, the widget will wait for it before parsing more data)
                  console.log("received batch of rows", rows);
                    setData(rows);

                  // mock timeout to simulate processing
                  await new Promise((resolve) => setTimeout(resolve, 500));
              }}
              skipEmptyLines={true} // optional, skips empty lines in the file
              chunkSize={10000} // optional, internal parsing chunk size in bytes
              defaultNoHeader={false} // optional, keeps "data has headers" checkbox off by default
              restartable={false} // optional, lets user choose to upload another file when import is complete
              onStart={({ file, fields }) => {
                  // optional, invoked when user has mapped columns and started import
                  console.log("starting import of file", file, "with fields", fields);
              }}
              onComplete={({ file, fields }) => {
                  // optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
                  console.log("finished import of file", file, "with fields", fields);
                  sendToMain();
              }}
              onClose={() => {
                  // optional, invoked when import is done and user clicked "Finish"
                  // (if this is not specified, the widget lets the user upload another file)
                  console.log("importer dismissed");
              }}
          >
              <ImporterField name="number" label="Number" />
              <ImporterField name="horse" label="Horse"  />
              <ImporterField name="rider" label="Rider" />
              <ImporterField name="owner" label="Owner" optional />
              <ImporterField name="year" label="Year" optional/>
              <ImporterField name="city" label="City" optional/>
          </Importer>
      
        

        <div className='flex flex-row w-full gap-5 px-5 my-6'>
          <label
            for="Class"
            className="import-label"
          >
            <input
              type="text"
              id="Class"
              className="peer import-input"  
              placeholder="Class"
            />

            <span
              className="import-span"
            >
              Class Number
            </span>
          </label>


          <label
            for="1stRoundTime"
            className="import-label"
          >
            <input
              type="text"
              id="1stRoundTime"
              className="peer import-input"
              placeholder="1st Round Time"
            />

            <span
              className="import-span"
            >
              1st Round Time
            </span>
          </label>

          <label
            for="JoRoundTime"
            className="import-label"
          >
            <input
              type="text"
              id="JoRoundTime"
              className="peer import-input"
              placeholder="Jo Round Time"
            />

            <span
              className="import-span"
            >
              Jo Round Time
            </span>
          </label>

        </div>
          

        <div className='px-5 my-6'>
          <label for="HeadlineAct" class="block font-medium text-white text-center text-xl">  Competition Type </label>

          <select
            name="HeadlineAct"
            id="HeadlineAct"
            className="import-select"
          >
            <option value="">Please select</option>
            <option value="JM">John Mayer</option>
            <option value="SRV">Stevie Ray Vaughn</option>
            <option value="JH">Jimi Hendrix</option>
            <option value="BBK">B.B King</option>
            <option value="AK">Albert King</option>
            <option value="BG">Buddy Guy</option>
            <option value="EC">Eric Clapton</option>
          </select>
        </div>
  

          {/* <button onClick={sendToMain} style={{marginTop:'10px'}}>Send to Main</button> */}

          <div className='flex flex-row justify-center'>
            <button
              onClick={TestExit}
              className="group flex items-center justify-between gap-4 rounded-full border border-current px-5 py-3 text-gray-900 transition-colors bg-white hover:bg-gray-900 hover:border-white focus:outline-none focus:ring active:bg-indigo-500"
            >
              <span class="font-medium transition-colors group-hover:text-white"> Save & Continue </span>

              <span
                class="shrink-0 rounded-full border border-gray-900 bg-white p-2 group-active:border-indigo-500"
              >
                <svg
                  class="size-5 rtl:rotate-180"
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
            </button>
          </div>
    </div>
  )
}
