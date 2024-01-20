import styled from 'styled-components';

const About: React.FunctionComponent = () => {
    return (
        <Wrapper>
            <h1>About</h1>
            <h2>Welcome to Blog Bond!</h2>
            <p>At Blog Bond, we believe in the power of words and the magic of shared experiences. This isn't just a platform; it's your canvas to paint the vibrant tapestry of your thoughts, stories, and ideas. Say hello to a community that celebrates the beauty of expression and the joy of connection.</p>
            <h2>What is Blog Bond?</h2>
            <p>Blog Bond is more than just a blogging platform; it's your personal haven for creative expression. Whether you're a seasoned writer or someone with a story to tell, we provide the perfect space to share your voice with the world. Here's what sets us apart:</p>
            <h3>Seamless Blogging Experience:</h3>
            <p>Experience a user-friendly interface designed for bloggers of all levels. Write, edit, and publish your posts effortlessly with our intuitive tools.</p>
            <h3>Connect and Follow</h3>
            <p>Dive into a world of diverse perspectives by connecting with fellow bloggers. Follow your favorite writers, discover new voices, and build a network of like-minded individuals.</p>
            <h3>Personalized User Feed</h3>
            <p>Tailor your content consumption with a personalized feed. See posts from those you follow, ensuring every scroll is filled with content that resonates with you.</p>
            <h3>Beautiful Design</h3>
            <p>Blog Bond is crafted with you in mind. Enjoy a visually pleasing and responsive design that adapts to your device, ensuring a seamless experience across platforms.</p>
            <h2>Join the Bond, Share the Joy</h2>
            <p>Blog Bond is more than a platform; it's a community that thrives on the diversity of voices. Join us on this journey of self-expression and connection. Together, let's build a space where every story finds its audience and every writer discovers the power of their words.</p>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    text-align: center;
    width: 80%;
    margin: 0 auto;
    padding: 1rem;
    background-color: white;
    h1 {
        background-color: black;
        color: white;
        padding: 0.5rem;
    }
    h2, h3 {    
        margin: 1rem 0;
    }
    p {
        color: gray;
        line-height: 1.6;
    }
`;

export default About;