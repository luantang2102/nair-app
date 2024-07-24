import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';

import axios from 'axios'

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigateTo = useNavigate();

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(signupState)
    if (signupState['password'] !== signupState['confirm-password']) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
      setLoading(true);
      createAccount();
    }
  }

  const createAccount=()=>{
    const handleFetch = () => {
      let payload = {
        "firstname" : signupState['firstname'],
        "lastname" : signupState['lastname'],
        "email" : signupState['email-address'],
        "password" : signupState['confirm-password']
      }
      axios.post('https://nair-social-media-analytics-production.up.railway.app/api/v1/auth/register',JSON.stringify(payload), {
          headers: {
            'Content-Type': 'application/json'
          },    
      }).then((result) => {
        setSuccessMessage("Confirmation email has been sent. Please check your inbox.");
        setLoading(false);
      }).catch((error) => {
        console.error("Error occurred during signup:", error);
        setLoading(false);
      })    
    }
    handleFetch()
  }

    return(
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map(field =>
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        )}
        {passwordMismatch && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Passwords do not match!</strong>
            <span className="block sm:inline"> Please make sure your passwords match.</span>
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {successMessage}</span>
          </div>
        )}
        <FormAction handleSubmit={handleSubmit} text={loading ? "Signing up..." : "Sign up"} disabled={loading} />
      </div>
    </form>
    )
}