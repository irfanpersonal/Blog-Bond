import {useDispatch, useSelector} from "react-redux";
import {updatePage} from "../features/posts/postsSlice.js";
import styled from 'styled-components';
import {getAllPosts} from "../features/posts/postsThunk.js";

const PaginationBox = () => {
    const dispatch = useDispatch();
    const {page, numberOfPages} = useSelector(store => store.posts);
    return (
        <Wrapper>
            {Array.from({length: numberOfPages}, (_, index) => {
                return (
                    <button style={{backgroundColor: page === index + 1 && 'rgb(255, 223, 223)'}} onClick={() => {
                        dispatch(updatePage(index + 1));
                        dispatch(getAllPosts());
                    }} key={index}>{index + 1}</button>
                );
            })}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    text-align: center;
    button {
        margin-right: 0.25rem;
        padding: 1rem;
        border: 1px solid black;
    }
`;  

export default PaginationBox;