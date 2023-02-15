//import './App.css'
import React, { useRef } from 'react'


import axios from 'axios';

function CreateStudent() {
    const fname = useRef();
    const lname = useRef();
    const email = useRef();
    const date = useRef();
    const ValidateAndSubmit = ()=>{
        //e.preventDefault();
        let Student = new FormData();
        Student.append('Fname',fname.current.value);
		Student.append('Lname',lname.current.value);
        Student.append('Email',email.current.value);
        Student.append('BirthDate',date.current.value);
        const axiosBaseUrl = "http://127.0.0.1:3000"
        var config = {
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            }
        };
        axios.post(
            axiosBaseUrl+"/api/Create/Student",
            {
                Fname:fname.current.value,
                Lname:lname.current.value,
                Email:email.current.value,
                BirthDate:date.current.value
            },
            config
        ).then(
            response => {
                 console.log( response.data );}
        ).catch(
            err => {
                console.log(err)
            }
        )
    }
  
    return (
    <div className='FormAddStudent'>
        <h1> Create Student </h1>
        <label>   Ferst name :     </label>
        <input ref={fname} type='text' placeholder='Name' />
        <br />
        <label>  Last name :     </label>
        <input  ref={lname} type='text' placeholder='Last Name' />
        <br />
        <label>  Email :     </label>
        <input  ref={email} type='eamil' placeholder='your email' />
        <br />
        <label>  Birth-Day :     </label>
        <input  ref={date} type='date' />
        <br />
        <button
        onClick={()=> ValidateAndSubmit()}
        >  Create </button>
    </div>
  )
}

export default CreateStudent