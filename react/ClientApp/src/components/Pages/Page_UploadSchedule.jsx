//https://www.youtube.com/watch?v=N42gydeIoQA
//Repo: 
import { useState } from 'react'
import * as XLSX from 'xlsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Page_UploadSchedule() {

  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const navigate = useNavigate();

  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects

  // handle File
  const fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      // console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        }
      }
      else {
        setExcelFileError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else {
      console.log('plz select your file');
    }
  }

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      console.log(data);
      setExcelData(data);

      axios.post("https://localhost:7293/api/Performance/AddPerformances",
        data)
    }
    else {
      setExcelData(null);
    }
  }

  return (
    <div className="container">

      {/* upload file section */}
      <div className='form'>
        <form className='form-group' autoComplete="off"
          onSubmit={handleSubmit}>
          <label><h5>Upload Excel file</h5></label>
          <br></br>
          <input type='file' className='form-control'
            onChange={handleFile} required></input>
          {excelFileError && <div className='text-danger'
            style={{ marginTop: 5 + 'px' }}>{excelFileError}</div>}
          <button id="button" type='submit' className='btn btn-success'
            style={{ marginTop: 5 + 'px' }}>Submit</button>
        </form>
      </div>

      <button id="button" onClick={() => { navigate('/admin') }}>Terug naar admin portaal</button>
    </div>


  );
}

export default Page_UploadSchedule;