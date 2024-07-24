import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    };

    const navigateTo = useNavigate();

    const authenticateUser = () => {
        const handleFetch = () => {
            setLoading(true); // Set loading state to true before making the API call
            let payload = {
                "email": loginState['email-address'],
                "password": loginState['password']
            };
            axios.post('https://nair-social-media-analytics-production.up.railway.app/api/v1/auth/login', JSON.stringify(payload), {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((result) => {
                localStorage.setItem("token", JSON.stringify(result.data.accessToken))
                navigateTo("/")
                window.location.reload()
                
            }).catch((error) => {
                setLoading(false); // Set loading state to false if there's an error
                if (error.response && error.response.status === 400) {
                    setError("Invalid email or password")
                } else {
                    console.error("An error occurred:", error.message);
                }
            });
        };
        handleFetch();
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

            <div className="-space-y-px">
                {fields.map(field =>
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={loginState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                    />
                )}
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    {error}
                </div>
            )}

            <FormExtra />

            <FormAction handleSubmit={handleSubmit} text={loading ? "Logging in..." : "Login"} disabled={loading} />

        </form>
    );
}
