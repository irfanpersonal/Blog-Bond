import {type UserType} from '../features/searchUser/searchUserSlice';
import {Link} from 'react-router-dom';
import moment from 'moment';

interface IUserListItemProps {
    data: UserType
}

const UserListItem: React.FunctionComponent<IUserListItemProps> = ({data}) => {
    return (
        <Link style={{textDecoration: 'none', color: 'black'}} to={`/user/${data._id}`}>
            <article style={{border: '1px solid black', padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                    <img style={{width: '50px', height: '50px', border: '1px solid black'}} src={data.profilePicture}/>
                </div>
                <h1>{data.name}</h1>
                <h1>{moment(data.createdAt).utc().format('MMMM Do YYYY, h:mm:ss a')}</h1>
            </article>
        </Link>
    );
}

export default UserListItem;