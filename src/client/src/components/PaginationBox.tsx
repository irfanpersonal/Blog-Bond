import styled from 'styled-components';
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from "react-icons/fa";
import {nanoid} from 'nanoid';
import {useDispatch} from 'react-redux';
import {type useDispatchType} from '../store';

interface PaginationBoxProps {
    _id?: string,
    numberOfPages: number,
    changePage: Function,
    page: number,
    updateSearch: Function
}

const PaginationBox: React.FunctionComponent<PaginationBoxProps> = ({_id, page, numberOfPages, changePage, updateSearch}) => {
    const dispatch = useDispatch<useDispatchType>();
    const previousPage = () => {
        const newValue = page - 1;
        if (newValue === 0) {
            dispatch(changePage(numberOfPages));
            return;
        }
        dispatch(changePage(newValue));
    }
    const nextPage = () => {
        const newValue = page + 1;
        if (newValue === (numberOfPages + 1)) {
            dispatch(changePage(1));
            return;
        }
        dispatch(changePage(newValue));
    }
    return (
        <Wrapper>
            <span onClick={() => {
                previousPage();
                dispatch(updateSearch(_id));
            }}><FaArrowAltCircleLeft/></span>
            {Array.from({length: numberOfPages}, (_, index) => {
                return (
                    <span style={{backgroundColor: page === index + 1 ? 'lightgreen' : ''}} onClick={() => {
                        dispatch(changePage(index + 1));
                        dispatch(updateSearch(_id));
                    }} key={nanoid()}>{index + 1}</span>
                );
            })}
            <span onClick={() => {
                nextPage();
                dispatch(updateSearch(_id));
            }}><FaArrowAltCircleRight/></span>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
    span {
        border: 1px solid black;
        padding: 0.5rem;
        background-color: gray;
        margin-right: 0.25rem;
        user-select: none;
        cursor: pointer;
    }
    span:hover, span:active {
        background-color: lightgray;
    }
`;

export default PaginationBox;