import styled from 'styled-components';
import {useRouteError, Link} from 'react-router-dom';

const Error = () => {
    const error = useRouteError();
    if (error.status === 404) {
        return (
            <Wrapper>
                <h1>404 Page Not Found</h1>
                <p>Oopsies, it looks like you don't know where you're going. How about Home?</p>
                <Link to='/'>Home</Link>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <h1>Something went wrong, try again later!</h1>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: lightcoral;
    h1, p, a {
        margin-bottom: 1rem;
    }
    a {
        display: block;
        padding: 0.5rem 2rem;
        border-radius: 1rem;
        text-decoration: none;
        background-color: white;
        color: black;
    }
    a:hover {
        background-color: black;
        color: white;
    }
`;

export default Error;