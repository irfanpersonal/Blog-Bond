import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {toggleWantsToRegister} from '../features/user/userSlice';
import {RegisterBox, LoginBox} from '../components';
import {registerUser, loginUser} from '../features/user/userThunk';
import {useNavigate} from 'react-router-dom';

const Auth: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<useDispatchType>();
    const {wantsToRegister, user, authLoading} = useSelector((store: useSelectorType) => store.user);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        const target = event.target as HTMLFormElement;
        if (wantsToRegister) {
            formData.append('name', (target.elements.namedItem('name') as HTMLInputElement).value);
            formData.append('email', (target.elements.namedItem('email') as HTMLInputElement).value);
            formData.append('password', (target.elements.namedItem('password') as HTMLInputElement).value);
            formData.append('bio', (target.elements.namedItem('bio') as HTMLInputElement).value);
            formData.append('location', (target.elements.namedItem('location') as HTMLInputElement).value);
            formData.append('dateOfBirth', (target.elements.namedItem('dateOfBirth') as HTMLInputElement).value);
            formData.append('profilePicture', target.profilePicture.files[0]);
            dispatch(registerUser(formData));
            return;
        }
        formData.append('email', (target.elements.namedItem('email') as HTMLInputElement).value);
        formData.append('password', (target.elements.namedItem('password') as HTMLInputElement).value);
        dispatch(loginUser(formData));
    }
    React.useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);
    return (
        <Wrapper wantsToRegister={wantsToRegister}>
            <form onSubmit={handleSubmit}>
                <h1>{wantsToRegister ? 'Register' : 'Login'}</h1>
                {wantsToRegister ? (
                    <RegisterBox/>
                ) : (
                    <LoginBox/>
                )}
                <p onClick={() => dispatch(toggleWantsToRegister())}>{wantsToRegister ? 'Have an account?' : `Don't have an account?`}</p>
                <button disabled={authLoading} type="submit">{authLoading ? 'SUBMITTING' : 'SUBMIT'}</button>
            </form>
        </Wrapper>
    );
}

interface WrapperProps {
    wantsToRegister: boolean
}

const Wrapper = styled.div<WrapperProps>`
    width: 50%;
    display: ${props => !props.wantsToRegister && 'flex'};
    justify-content: ${props => !props.wantsToRegister && 'center'};
    align-items: ${props => !props.wantsToRegister && 'center'};
    margin: ${props => props.wantsToRegister ? '0' : '6rem'} auto;
    padding: 2rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
    background-color: white;
    form {
        display: flex;
        flex-direction: column;
        h1 {
            text-align: center;
            margin-bottom: 1rem;
            font-weight: bold;
        }
        div {
            margin-bottom: 1.25rem;
            label {
                display: block;
                font-weight: bold;
                margin-bottom: 0.5rem;
            }
            input {
                width: 100%;
                padding: 0.85rem;
                border: 1px solid gray;
                border-radius: 0.75rem;
            }
            textarea {
                border-radius: 0.75rem;
                padding: 0.85rem;
                width: 100%;
                height: 120px;
                resize: none;
            }
        }
        p {
            text-align: center;
            cursor: pointer;
            margin-bottom: 1rem;
        }
        button {
            color: white;
            background-color: rgb(0, 123, 255);
            padding: 1rem;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s ease;
            &:hover {
                background-color: rgb(0, 86, 179);
            }
        }
    }
`;

export default Auth;