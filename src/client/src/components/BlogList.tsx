import styled from 'styled-components';
import {BlogType} from '../features/user/userSlice'; // setSearch form userSlice
import BlogListItem from './BlogListItem';
import SearchBox from './SearchBox';
import {nanoid} from 'nanoid';

interface BlogListProps {
    data: BlogType[],
    text: string,
    _id: string,
    updateSearch: Function,
    setPage: Function,
    search: string,
    placeHolderText: string,
    setSearch: Function
}

const BlogList: React.FunctionComponent<BlogListProps> = ({text, data, _id, updateSearch, setPage, search, placeHolderText, setSearch}) => {
    return (
        <Wrapper>
            <h2 style={{borderBottom: '0.5rem solid black'}}>{text}</h2>
            <SearchBox setPage={setPage} search={search} setSearch={setSearch} placeHolderText={placeHolderText} _id={_id} updateSearch={updateSearch}/>
            {data.map(item => {
                return (
                    <BlogListItem key={nanoid()} data={item}/>
                );
            })}
        </Wrapper>
    );
}

const Wrapper = styled.section`
    background-color: lightgray;
    margin-top: 1rem;
    padding: 1rem;
    h2 {
        text-align: center;
    }
`;

export default BlogList;