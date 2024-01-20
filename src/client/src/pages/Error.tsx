import styled from 'styled-components';
import {useRouteError, Link} from "react-router-dom";

interface IError {
    status: number
}

const Error: React.FunctionComponent = () => {
    const error = useRouteError() as IError;
    if (error.status === 404) {
        return (
            <Wrapper>
                <h1>404 Page Not Found</h1>
                <p>Oopsies! Looks like you don't know where your going. How about home?</p>
                <Link to='/'>Back Home</Link>
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
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    h1, p, a {
        margin: 1rem 0;
    }
    a {
        background-color: white;
        color: black;
        padding: 0.5rem 2rem;
        border-radius: 1rem;
        text-decoration: none;
    }
    a:hover, a:active {
        background-color: black;
        color: white;
        outline: 1px solid black;
    }
`;

export default Error;