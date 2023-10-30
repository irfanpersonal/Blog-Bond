import {Outlet} from 'react-router-dom';
import {Navbar} from '../components';

const Layout = () => {
    return (
        <>
            <Navbar/>
            <section style={{padding: '1rem'}}>
                <Outlet/>
            </section>
        </>
    );
}

export default Layout;