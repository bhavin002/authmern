import React from 'react'
import './Header.css';
import PersonIcon from '@mui/icons-material/Person';
const Header = () => {
  return (
    <>
        <header>
            <nav>
                <h1>Authentication</h1>
                <div className="avtar">
                    <PersonIcon style={{fontSize:'xxx-large'}}/>
                </div>
            </nav>
        </header>
    </>
  )
}

export default Header;