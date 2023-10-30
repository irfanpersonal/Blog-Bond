import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {loginUser, registerUser} from '../features/user/userThunk';

const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {user, isLoading} = useSelector(store => store.user);
    const [input, setInput] = React.useState({
        name: '',
        email: '',
        password: '',
        wantsToRegister: true
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        if (input.wantsToRegister) {
            dispatch(registerUser(input));
            return;
        }
        dispatch(loginUser({email: input.email, password: input.password}));
    }
    const handleChange = (event) => {
        setInput(currentState => {
            return {...currentState, [event.target.name]: event.target.value};
        });
    }
    const toggleAuthType = () => {
        setInput(currentState => {
            return {...currentState, wantsToRegister: !currentState.wantsToRegister};
        });
    }
    React.useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);
    return (
        <Wrapper>
            <form  onSubmit={handleSubmit}>
                <h1>{input.wantsToRegister ? 'Register' : 'Login'}</h1>
                {input.wantsToRegister && (
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" name="name" value={input.name} onChange={handleChange}/>
                    </div>
                )}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" name="email" value={input.email} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" value={input.password} onChange={handleChange}/>
                </div>
                <p>{input.wantsToRegister ? 'Already have an account?' : `Don't have an account?`} <span onClick={toggleAuthType}>{input.wantsToRegister ? 'Login' : 'Register'}</span></p>
                <button type="submit" disabled={isLoading}>{isLoading ? 'SUBMITTING' : 'SUBMIT'}</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: gray;
    h1 {
        border-bottom: 1px solid black;
        text-align: center;
    }
    form {
        border: 1px solid black;
        padding: 1rem;
        background-color: white;
        width: 50%;
        border-radius: 1rem;
    }
    label, input, button {
        display: block;
        width: 100%;
    }
    label, button {
        margin-top: 1rem;
    }
    input {
        margin-bottom: 1rem;
    }
    input, button {
        padding: 0.5rem;
    }
    p {
        text-align: center;
    }
    span {
        background-color: lightgray;
        padding: 0.25rem 2rem;
        border-radius: 1rem;
        cursor: pointer;
        border: 1px solid black;
    }
`;

export default Auth;