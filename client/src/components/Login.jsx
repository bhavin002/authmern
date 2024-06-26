import React from 'react'
import { useState,useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Mix.css'
import validator from 'validator';
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    useEffect(()=>{
        const item = localStorage.getItem('userAuthToken');
        if(item){
            navigate("/dash")
        }
    },[])
    
    const [passShow,setPassShow] = useState(false);
    const initaialValue = {
        email: '',
        password: '',
    }
    const [inpval, setInpval] = useState(initaialValue);
    const navigate = useNavigate();
    const inpEvent = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    }
    const logIn = async (e) =>{
        e.preventDefault();
        const {email,password} = inpval;
        const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(email === ""){
            toast.error("Please Enter Your Email")
        }else if(!regEx.test(email)){
            toast.error("Please Enter The Valid Email")
        }else if(password === ""){
            toast.error("Please Enter The Password")
        }else if(!validator.isStrongPassword(password, {
            minLength: 6, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
          })){
            toast.error("Please Enter The Strong Password like this Abc@1234");
        }else{
            const data = await fetch('/login',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email,password
                })
            });
            const res = await data.json()
            if(res.status === 201){
                localStorage.setItem("userAuthToken",res.result.token)
                navigate("/dash")
                setInpval({...inpval,email:" ",password:" "});
            }else{
                toast.error("Invalid Email Or PassWord");
            }
        }
    }
    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_hading">
                        <h1>Welcome Back,Log In</h1>
                        <p>Hi, we are you glad you are back. Please login.</p>
                    </div>
                    <form autoComplete='off'>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={inpval.email} placeholder='Enter Your Email Address' onChange={inpEvent} />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} value={inpval.password} name="password" id="password" onChange={inpEvent} placeholder='Enter Your Password Address' />
                                <div className="showpass" onClick={()=>setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={logIn}>Login</button>
                        <p>Don't have an Account? <NavLink to={"/register"}>Sing Up</NavLink></p>
                        <p style={{'color':'black','fontWeight':'bolder'}}>Forgot Password <NavLink to={"/reset"}>Click Here</NavLink></p>
                    </form>
                    <ToastContainer/>
                </div>
            </section>
        </>
    )
}

export default Login;