import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './contextProvider/Context';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState();
    const [firstLetter,setFirstLetter] = useContext(LoginContext);
    const DashboardValid = async () => {
        let token = localStorage.getItem('userAuthToken')
        const data = await fetch("/validuser", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const res = await data.json();
        if (res.status === 401 || !res) {
            navigate("*");
        } else {
            const { fname } = res.ValiduserOne;
            setUserData(fname);
            setFirstLetter(fname[0].toUpperCase());
            navigate("/dash")
        }

    }
    useEffect(() => {
        DashboardValid();
    }, [])
    return (
        <>
            <div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center' }}>
                <img src="./man.jpg" alt="NoImage" style={{ 'marginTop': '50px', 'borderRadius': '10px' }} />
                <h1 style={{ 'marginTop': '25px' }}>Hello,{userData ? userData : ""}</h1>
            </div>
        </>
    )
}

export default Dashboard;