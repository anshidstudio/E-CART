import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

const Header = () => {
    return (
        <header className=' flex justify-between px-20 py-10'>
            <h1 className=' text-2xl font-bold'>Brand</h1>
            <nav className=' flex gap-12'>
                <ul><li><Link to={"/"}>Home</Link></li></ul>
                <ul><li><Link to={"/about"}>About</Link></li></ul>
                <ul><li><Link to={"/login"}>Login</Link></li></ul>
                <ul><li><Link to={"/register"}>Register</Link></li></ul>                
                <ul><li><Link to={"/products"}>Products</Link></li></ul>                


                
            </nav>
            <div className='flex gap-7'>

                <button className=''><Link to={"/cart"}>Cart</Link></button>
                <button className=' bg-yellow-400  px-5 py-2'>Enquire</button>
                <button><Link to={"/profile"}>User Profile</Link></button>

            </div>
            
        

            
            
        </header>
        
    )
}

export default Header

