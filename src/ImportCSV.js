import { useState } from 'react';
import {Importer, ImporterField} from 'react-csv-importer';
import "./App.css"
import {InputField} from "./components/InputField";
import SelectField from "./components/SelectField";
import {
  SaveRegular
} from "@fluentui/react-icons";
import ButtonField from "./components/ButtonField";



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


      <div className='flex flex-row w-full gap-5 px-5 mt-6'>
        <div className="my-4">
          <InputField
              fieldName="Class Number"
              fieldPlaceholder="Enter the Class Number"
          />
        </div>

        <div className="my-4">
          <InputField
              fieldName="1st Round Time"
              fieldPlaceholder="Enter the 1st Round Time"
          />
        </div>

        <div className="my-4">
          <InputField
              fieldName="Jo Round Time"
              fieldPlaceholder="Enter the Jo Round Time"
          />
        </div>
      </div>

      <div className='px-7 mb-6'>
        <SelectField
            label="Competition Type"
        />
      </div>

      <div className='flex flex-row justify-center'>
        <ButtonField
            icon={<SaveRegular />}
            label="Save & Continue"
            onClick={TestExit}
        />

          </div>
    </div>
  )
}
