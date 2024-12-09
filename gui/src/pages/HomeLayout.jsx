import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomeLayout = () => {
  return (<>
    <Navbar />
    <div style={{ height: '90vh' }} className='container mx-auto'><Outlet /></div>

  </>
  )
}

export default HomeLayout