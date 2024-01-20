import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {BlogType} from '../features/user/userSlice';
import emptyImage from '../images/empty-image.jpeg';
import moment from 'moment';
 
interface BlogListItemProps {
    data: BlogType
}

const BlogListItem: React.FunctionComponent<BlogListItemProps> = ({data}) => {
    return (
        <Link style={{color: 'black', textDecoration: 'none'}} to={`/blog/${data._id}`}>
            <Wrapper>
                <div>
                    <img style={{width: '50px', height: '50px', borderRadius: '50%', outline: '1px solid black'}} src={data.coverImage ? data.coverImage : emptyImage}/>
                </div>
                <div>
                    <h2>{data.name}</h2>
                </div>
                <div>
                    <h2>{moment(data.createdAt).utc().format('MMMM Do YYYY, h:mm:ss a')}</h2>
                </div>
            </Wrapper>
        </Link>
    );
}

const Wrapper = styled.article`
    &:hover {
        background-color: lightgreen;
    }
    img {
        width: 50px;
        height: 50px;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 3rem;
`;

export default BlogListItem;