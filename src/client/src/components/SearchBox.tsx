import {FaSearch} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {type useDispatchType} from "../store";

interface SearchBoxProps {
    placeHolderText: string,
    search: string,
    setSearch: Function,
    _id: string,
    updateSearch: Function,
    setPage: Function
}

const SearchBox: React.FunctionComponent<SearchBoxProps> = ({placeHolderText, search, setSearch, _id, updateSearch, setPage}) => {
    const dispatch = useDispatch<useDispatchType>();
    return (
        <div style={{border: '1px solid black', width: '50%', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', marginTop: '1rem', borderRadius: '1rem'}}>
            <input type="search" name="search" style={{marginRight: '1rem', padding: '0.5rem', width: '100%'}} placeholder={placeHolderText} value={search} onChange={(event) => dispatch(setSearch(event.target.value))}/>
            <FaSearch onClick={() => {
                dispatch(setPage(1));
                dispatch(updateSearch(_id));
            }} style={{cursor: 'pointer'}}/>
        </div>
    );
}

export default SearchBox;