import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setInitialLayout } from '../../features/layouts/layoutSettingsSlice';
import Menubar from '../../components/store_layout/menubars/StoreMenubar';
import { Route, Routes } from 'react-router-dom';
import StoreHome from '../store/supporting/home/StoreHomePage';
import StorePackages from '../store/supporting/packages/StorePackagesPage';
import StoreServices from '../store_dashboard/supporting_pages/StoreServices';


const WebsitePreview = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.layoutSettings) {
        dispatch(setInitialLayout(event.data.layoutSettings));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [dispatch]);

  return (
    <div className='h-screen w-screen bg-stone-200 p-3'>
      <Menubar />
      <Routes>
        <Route path="/" element={<StoreHome/>} />
        <Route path="/services" element={<StoreServices />} />
        <Route path="/packages" element={<StorePackages />} />  
      </Routes>
    </div>
  );
};

export default WebsitePreview;
