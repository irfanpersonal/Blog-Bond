import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Home: React.FunctionComponent = () => {
    return (
        <Wrapper>
            <h1 className="title">Home</h1>
            <h1>Get Started</h1>
            <p>To get started, begin by creating an account at the <Link to='/auth'>authorization</Link> page. Once you've successfully registered, head over to the <Link to='/blog'>blogs</Link> page where you can explore random blogs. Search for topics that pique your interest, find the most relevant blog, and delve into its content. Additionally, check if the user linked to that blog has other posts discussing similar topics, and consider following that user for more content aligned with your preferences.</p>
            <h1>Create A Blog!</h1>
            <p>The most efficient method to make a quick contribution is by creating a post. Head over to the "add blog" page after registering or logging in. This initial step sets the stage for active participation and fosters a sense of community among users. Craft a meaningful and insightful piece when you arrive on the "add blog" page. Your written contributions play a crucial role in building a thriving community, creating a valuable experience for every participant involved.</p>
            <h1>Edit your Profile</h1>
            <p>Swiftly navigate to the profile page to customize details such as your username, bio, and location. These small but significant pieces of information allow you to share more about yourself, providing your followers with a clearer understanding of who you are.</p>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    text-align: center;
    .title {
        font-size: 1.5rem;
        background-color: black;
        color: white;
        padding: 0.5rem;
        margin: 0;
    }
    h1, p {
        margin: 1rem 0;
    }
    p {
        background-color: lightgray;
        padding: 0.5rem;
    }
`;

export default Home;