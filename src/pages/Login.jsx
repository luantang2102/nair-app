import {useEffect} from 'react';
import Header from "../components/Header"
import Login from "../components/Login"
import { useNavigate } from 'react-router-dom';

export default function LoginPage(){
    const navigateTo = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")) navigateTo("/nair-web")    
    }, [])

    if (localStorage.getItem("token")) return null;

    return(
        <>
            <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/nair-web/signup"
            />
            <Login/>
        </>
    )
}
