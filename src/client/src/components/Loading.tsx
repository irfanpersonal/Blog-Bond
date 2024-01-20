import styled from 'styled-components';

interface LoadingProps {
    title: string,
    position: 'normal' | 'center',
    marginTop?: string
}

const Loading: React.FunctionComponent<LoadingProps> = ({title, position, marginTop}) => {
    return (
        <Wrapper style={{justifyContent: position === 'center' ? 'center' : 'flex-start', marginTop: marginTop}}>
            <div className="loading"></div>
            <h1>{title}</h1>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    .loading {
        border: 0.5rem solid black;
        border-radius: 50%; 
        width: 3.75rem;
        height: 3.75rem;
        animation: breathe 1.5s infinite alternate; 
        background-color: white;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    }
    @keyframes breathe {
        0% { 
            transform: scale(1); 
        }
        100% { 
            transform: scale(0.8); 
        }
    }
`;

export default Loading;