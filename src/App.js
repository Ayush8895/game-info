import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import { MDBCol, MDBContainer, MDBRow, MDBTable, MDBTableBody, MDBTableHead,MDBBtn, MDBBtnGroup} from 'mdb-react-ui-kit';

function App(){
  const[data, setData]= useState([]);
  const[value,setValue] = useState("");

  useEffect(() => {
    loadeUsersData();
  },[]);

  const loadeUsersData = async ()=> {
    return await axios
    .get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json")
    .then((response)=> setData(response.data))
    .catch((err)=> console.log(err));
  };
  console.log("data", data);

  const handleReset = () => {
      loadeUsersData();
     };
     const handleSearch = async (e)=>{
      e.preventDefault();
      return await axios
      .get(`https://s3-ap-southeast-1.amazonaws.com/?s=${value}/he-public-data/gamesarena274f2bf.json`)
      .then((response) => {
        setData(response.data);
        setValue("");
      })
      .catch((err)=> console.log(err));
    };

  return(<>
    <MDBContainer>
    <form style={{
      margin: "auto",
      padding: "15px",
      maxWidth: "400px",
      alignContent: "center",
    }}
    className=" d-flex input-group w-auto"
    onSubmit={handleSearch}
    >
      <input 
      type= "text"
      className="form-control"
      placeholder= "working on it"
      value={value}
      onChange={(e)=> setValue(e.target.value)}
      />
      <MDBBtnGroup>
         <MDBBtn type="submit" color="dark">Search</MDBBtn>
         <MDBBtn className="mx-2" color="info" onClick={() => handleReset()}>Reset</MDBBtn>
          </MDBBtnGroup>

          </form>
   <div style={{margineTop: "100px"}}>
    <h2>Game Info</h2>
    <MDBRow>
      <MDBCol size="12">
        <MDBTable>
          <MDBTableHead dark>
          <tr>
              <th scope="col">title</th>
              <th scope="col">Platform</th>
              <th scope="col">Score</th>
              <th scope="col">Gener</th>
              <th scope="col">editors_choise</th>
            </tr>
          </MDBTableHead>
          {data.length === 0 ? (
            <MDBTableBody className='align-center mb-0'>
              <tr>
                <td colSpan={8} className="text-center mb-0">No Data</td>
                </tr>
            </MDBTableBody>
          ): (
            data.map((item, index) =>(
              <MDBTableBody key={index}>
                <tr>
                  <th scope= "row">{index}</th>
                  <td>{item.title}</td>
                  <td>{item.platform}</td>
                  <td>{item.score}</td>
                  <td>{item.gener}</td>
                  <td>{item.editors_choice}</td>
                </tr>
              </MDBTableBody>
              ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
       </div>
       </MDBContainer>
    
        </>
  );
}
export default App;
