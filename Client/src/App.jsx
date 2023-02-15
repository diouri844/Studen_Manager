import { useState, useEffect } from 'react'
import './App.css'

import axios from 'axios';
import CreateStudent from './Components/CreateStudent';


function App() {
  const [stdList, setstdList] = useState([]);
  const [popup, setPopup] = useState(false);
  const [messageResponse,setMessageRessponse]= useState("");
  const [createStudent, setCreateStudent ] = useState(false);
  const axiosBaseUrl = "http://127.0.0.1:3000";
  
  const getList = ()=>{
    axios.get(
    axiosBaseUrl+"/api/Students",config
    ).then(
      response => {
        // set the state : 
        setstdList(response.data);
     }
      ).catch(
        error => console.error(error)
      );
  }

  
  var config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
  // fetch data from the api end point :
  useEffect(() => {
        getList();
  }, [])

    const OpenCreateModal = ()=>{
    setCreateStudent(true);
  };

  const dsiplayFormStudent = ( std_target )=>{
    console.log( std_target);
  };

  const DeleteStudent = (std_target)=>{
    // send a delete request to api :
    axios.delete(
      axiosBaseUrl+"/api/delete/Student/"+std_target.Email,
    )
    .then(
      response=> {
        console.log( response.data );
        if ( response.data.acknowledged ){
          // show popup and update list std :
          setMessageRessponse(" Student deleted successufully ");
          setPopup(true);
          setTimeout(
            ()=>{
              setPopup(false);
              setMessageRessponse("");
            },3000
          );
          getList();
        }
      }
    ).catch( err => console.error(err));

  }




  return (
    <div className="App">
      {popup && 
        <div className='PopupMessage'>
          <h3> { messageResponse }</h3>
        </div>
      }


      { createStudent && <CreateStudent />}
      {stdList.length > 0 && <h1>    Student List     :  </h1>}
        { stdList.length > 0  && !createStudent &&  
          stdList.map(
            item => ( 
            <div className='StudentItem' key={item._id}>
              <h5 className='stdName'> {item.Fname} </h5>
              <h5 className='stdName'> {item.Lname} </h5>
              <h5 className='stdMail'> {item.Email} </h5>
              <h5 
              onClick={()=> { dsiplayFormStudent(item)}}
              className='stdbtn'> Edit </h5>
              <h5 
              onClick={ ()=> { DeleteStudent( item )}}
              className='stdbtn'> Delete </h5>
            </div>)
          ) 
       }
      { stdList.length === 0 && !createStudent  && 
        <div>
          <h1> No student founded yet : </h1>
          <span> please create new one :   </span>
          <button 
          onClick={()=> { OpenCreateModal() }}> new student </button>
        </div>
      }
    </div>
  )
}

export default App
