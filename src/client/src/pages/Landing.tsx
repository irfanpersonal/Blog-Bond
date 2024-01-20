import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Landing: React.FunctionComponent = () => {
    return (
        <Wrapper>
            <h1>Blog Bond</h1>
            <p>Step into a world of captivating narratives and insightful perspectives with Blog Bond, where every post is a journey, and every reader becomes part of a community that celebrates the art of storytelling.</p>
            <Link to='/auth'>Register/Login</Link>
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
    h1 {
        text-decoration: underline;
    }
    p {
        padding: 0.5rem;
        background-color: lightgray;
    }
    h1, p, a {
        margin: 1rem 0;
    }
    a {
        padding: 0.5rem 2rem;
        background-color: lightgray;
        border-radius: 1rem;
        text-decoration: none;
        color: black;
        cursor: pointer;
    }
    a:hover, a:active {
        outline: 1px solid black;
    }
`;

export default Landing;