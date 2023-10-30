import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {updateSearch} from '../features/posts/postsSlice.js';
import {getAllPosts} from '../features/posts/postsThunk.js';

const SearchBox = () => {
    const dispatch = useDispatch();
    const {search} = useSelector(store => store.posts);
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getAllPosts());
    }
    return (
        <Wrapper>   
            <form onSubmit={handleSubmit}>
                <input type="search" name="search" value={search} onChange={(event) => dispatch(updateSearch(event.target.value))}/>
                <button>SEARCH</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    input {
        width: 75%;
    }
    button {
        width: 25%;
    }
    input, button {
        padding: 0.5rem;
    }
`;

export default SearchBox;