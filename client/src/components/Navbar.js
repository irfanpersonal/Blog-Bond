import styled from 'styled-components';
import {NavLink, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {BsDoorOpenFill} from 'react-icons/bs';
import {logout} from '../features/user/userSlice.js';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(store => store.user);
    return (
        <Wrapper>
            <h1>Blog</h1>
            <div>
                <NavLink to='/'>Home</NavLink>
                {user ? (
                    <>
                        <NavLink to='/add-post'>Add Post</NavLink>
                        <NavLink to='/profile'>Profile</NavLink>
                        <button title="Logout" onClick={() => {
                            dispatch(logout());
                            navigate('/');
                        }}><BsDoorOpenFill/></button>
                    </>
                ) : (
                    <>
                        <NavLink to='/auth'>Login/Register</NavLink>
                    </>
                )}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: lightgray;
    border-bottom: 1px solid black;
    a, button {
        text-decoration: none;
        color: black;
        margin-left: 1rem;
    }
    .active {
        border-bottom: 1px solid black;
    }
    button {
        border: none;
        background-color: lightgray;
        cursor: pointer;
    }
    button:hover {
        font-size: 1.1rem;
    }
`;

export default Navbar;