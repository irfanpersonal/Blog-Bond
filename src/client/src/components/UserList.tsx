import {type UserType} from '../features/searchUser/searchUserSlice';
import UserListItem from './UserListItem';
import {nanoid} from 'nanoid';

interface IUserListProps {
    data: UserType[]
}

const UserList: React.FunctionComponent<IUserListProps> = ({data}) => {
    return (
        <section style={{backgroundColor: 'white', padding: '1rem', marginTop: '1rem'}}>
            {data.map(item => {
                return (
                    <UserListItem key={nanoid()} data={item}/>
                );
            })}
        </section>
    );
}

export default UserList;