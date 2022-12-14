import React, { useContext } from 'react'
import './Header.css';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './contextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate,Link } from 'react-router-dom';
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Header = () => {
  const [firstLetter, setFirstLetter] = useContext(LoginContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userLogOut = async () => {
    let token = localStorage.getItem('userAuthToken');
    const data = await fetch("/logout", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
        Accept: 'application/json'
      },
      credentials: 'include'
    });
    const res = await data.json();
    console.log(res);
    if (res.status === 201) {
      toast.success("User LogOut SuccessFully");
      localStorage.removeItem('userAuthToken');
      setFirstLetter(false);
      navigate("/");
    } else {
      console.log("error");

    }
  }

  const goError = () => {
    toast.error("Please First To LogIn.");
  }
  return (
    <>
      <header>
        <nav>
          <Link style={{'textDecoration':'none'}} to={"/"}><h1>Authentication</h1></Link>
          <div className="avtar">
            {
              firstLetter ? <Avatar onClick={handleClick} style={{ 'background': 'black' }}>{firstLetter}</Avatar> : <PersonIcon onClick={handleClick} style={{ fontSize: 'xxx-large' }} />
            }
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {
              firstLetter ? (
                <div>
                  <MenuItem onClick={() => {
                    navigate("/dash");
                    handleClose();
                  }}>Profile</MenuItem>
                  <MenuItem onClick={() => {
                    userLogOut();
                    handleClose();
                  }}>Logout</MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem onClick={() => {
                    goError();
                    handleClose();
                  }}>Profile</MenuItem>
                </div>
              )
            }

          </Menu>
        </nav>
      </header>
      <ToastContainer/>
    </>
  )
}

export default Header;