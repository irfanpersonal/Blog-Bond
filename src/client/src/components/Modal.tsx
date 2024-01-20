import styled from 'styled-components';
import {FaWindowClose} from "react-icons/fa";

interface ModalProps {
    title: string,
    description: string,
    closeModal: () => void,
    handleSubmit: (event: React.FormEvent) => void,
    buttonLoading: boolean
}

const Modal: React.FunctionComponent<ModalProps> = ({title, description, closeModal, handleSubmit, buttonLoading}) => {
    return (
        <Wrapper>
            <div className="modal-menu">
                <div style={{textAlign: 'center', margin: '0 auto'}}>{title}</div>
                <div><FaWindowClose onClick={closeModal} className="close"/></div>
            </div>
            <h3 className="description">{description}</h3>
            <form style={{width: '100%'}} onSubmit={handleSubmit}>
                <div>
                    <input id="password" type="password" name="password"/>
                </div>
                <button style={{width: '100%', marginTop: '1rem', padding: '0.5rem'}} disabled={buttonLoading} type="submit">{buttonLoading ? 'DELETING' : 'DELETE'}</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    .modal-menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.5rem;
        border-bottom: 1px solid black;
    }
    .close:hover, .close:hover {
        cursor: pointer;
        color: rgb(255, 0, 77);
    }
    width: 50%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid black;
    padding: 1rem;
    .description {
        margin: 1rem 0;
    }
`;

export default Modal;