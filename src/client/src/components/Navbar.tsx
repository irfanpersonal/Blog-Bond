import styled from 'styled-components';
import {Link, NavLink} from 'react-router-dom';
import {FaNewspaper, FaHome, FaInfoCircle, FaSearch, FaUser, FaPlusCircle} from "react-icons/fa";
import {PiPlusMinusFill} from "react-icons/pi";
import {useSelector} from 'react-redux';
import {type useSelectorType} from '../store';

const Navbar: React.FunctionComponent = () => {
    const {user} = useSelector((store: useSelectorType) => store.user);
    return (
        <Wrapper>
            <Link to='/'><h1 style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', userSelect: 'none'}}><FaNewspaper style={{marginRight: '1rem'}}/> Blog Bond</h1></Link>
            <div>
                <NavLink title="Home" to='/'><span><FaHome/></span></NavLink>
                <NavLink title="About" to='/about'><span><FaInfoCircle/></span></NavLink>
                <NavLink title="Blogs" to='/blog'><span><FaNewspaper/></span></NavLink>
                {user && (
                    <NavLink title="Add Blog" to='/add-blog'><span><FaPlusCircle/></span></NavLink>
                )}
                <NavLink title="Search" to='/user'><span><FaSearch/></span></NavLink>
                {user ? (
                    <NavLink title="Profile" to='/profile'><span><FaUser/></span></NavLink>
                ) : (
                    <NavLink title="Register/Login" to='/auth'><span><PiPlusMinusFill/></span></NavLink>
                )}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.nav`
    color: white;
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    a {
        color: white;
        text-decoration: none;
    }
    .active {
        color: rgb(187, 171, 140);
    }
    div > a {
        margin-left: 1rem;
        font-size: 1.25rem;
    }
`;

export default Navbar;