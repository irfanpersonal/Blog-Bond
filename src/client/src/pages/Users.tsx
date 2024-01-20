import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {type useDispatchType, type useSelectorType} from '../store';
import {getAllUsers} from '../features/searchUser/searchUserThunk';
import {Loading, SearchBox, UserList, PaginationBox} from '../components';
import {setSearch, setPage} from '../features/searchUser/searchUserSlice';

const Users: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {search, getAllUsersLoading, users, totalUsers, totalNumberOfPagesForUsers, page} = useSelector((store: useSelectorType) => store.searchUser);
    React.useEffect(() => {
        dispatch(getAllUsers());
    }, []);
    return (
        <Wrapper>
            <h1 style={{textAlign: 'center', backgroundColor: 'black', padding: '0.5rem', color: 'white'}}>Search Users</h1>
            <SearchBox setPage={setPage} placeHolderText='Search All Users...' search={search} setSearch={setSearch} _id={''} updateSearch={getAllUsers}/>
            {getAllUsersLoading ? (
                <Loading title='Loading All Users' position='normal' marginTop='1rem'/>
            ) : (
                <>
                    <h1 style={{margin: '1rem 0', borderBottom: '1px solid black'}}>{totalUsers} User{totalUsers! > 1 && 's'} Found...</h1>
                    {totalUsers! >= 1 && (
                        <UserList data={users}/>
                    )}
                    {totalNumberOfPagesForUsers! > 1 && (
                        <PaginationBox updateSearch={getAllUsers} changePage={setPage} page={page} numberOfPages={totalNumberOfPagesForUsers!}/>
                    )}
                </>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`

`;

export default Users;