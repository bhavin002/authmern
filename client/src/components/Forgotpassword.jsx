import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';

const Forgotpassword = () => {
    const [newpass, setNewPass] = useState('');
    const [passShow, setPassShow] = useState(false);
    const [msg,setmsg] = useState('');
    const {id,token} = useParams();

    const userValid = async () =>{
        const res = await fetch(`/forgotpass/${id}/${token}`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
        })

        const data = await res.json();
        if(data.status === 201){
            console.log("User Validate");
        }else{
            console.log("User not validate");
        }
    }
    useEffect(()=>{
        userValid();
    },[])

    const navigate = useNavigate();
    const inpEvent = (event) => {
        setNewPass(event.target.value);
    }
    const ForgotPass = async (e) => {
        e.preventDefault();
        if (!newpass) {
            toast.error("Please Enter Your New Password")
        } else if (!validator.isStrongPassword(newpass, {
            minLength: 6, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            toast.error("Please Enter The Strong Password like this Abc@1234")
        }else{
            const res = await fetch(`/${id}/${token}`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({newpass})
            })

            const data = await res.json();
        if(data.status === 201){
            setNewPass('');
            setmsg('Your Password Is SuccessFully Updated');
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }else{
            toast.error("Token Expired Generate New Link")
            setTimeout(() => {
                navigate("/reset");
            }, 3000);
        }
        }

    }
    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_hading">
                        <h1>Enter Your New Password</h1>
                        <p style={{'color':'green','fontWeight':'bolder','justifyContent':'center','display':'flex'}}>{msg}</p>
                    </div>
                    <form autoComplete='off'>
                        <div className="form_input">
                            <label htmlFor="password">New Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} value={newpass} name="password" id="password" onChange={inpEvent} placeholder='Enter Your New Password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={ForgotPass}>Update</button>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Forgotpassword;