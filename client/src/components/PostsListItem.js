import styled from 'styled-components';
import moment from 'moment';
import {Link} from 'react-router-dom';

const PostsListItem = ({data}) => {
    const {_id: id, name, coverImage, createdAt, createdBy: {name: author}} = data;
    const humanReadableDate = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
    return (
        <Link to={`/post/${id}`} style={{textDecoration: 'none', color: 'black'}}>
            <Wrapper>
                <h1>{name}</h1>
                <h1>by: {author}</h1>
                <h1>{humanReadableDate}</h1>
                <img src={coverImage} alt={name}/>
            </Wrapper>
        </Link>
    );
}

const Wrapper = styled.article`
    padding: 1rem 0;
    border: 1px solid black;
    text-align: center;
    background-color: lightgray;
    margin: 1rem 0;
    img {
        margin: 1rem 0;
        width: 25%;
        height: 25%;
    }
`;

export default PostsListItem;