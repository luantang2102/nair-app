import {useEffect} from 'react';
import Header from "../components/Header";
import Signup from "../components/Signup";
import { useNavigate } from 'react-router-dom';

export default function SignupPage(){
    const navigateTo = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")) navigateTo("/")    
    }, [])

    if (localStorage.getItem("token")) return null;

    return(
        <>
            <Header
                heading="Sign up to create an account"
                paragraph="Already have an account? "
                linkName="Login"
                linkUrl="/signin"
            />
            <Signup/>
        </>
    )
}