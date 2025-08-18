import { Routes, Route } from 'react-router-dom';
import CreatePosterModal from '../../../components/store_dashboard/modals/CreatePosterModal';
import RenderDigitalPoster from '../../../components/store_dashboard/extras/RenderDigitalPoster';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchPostersByStore } from '../../../features/posters/posterSlice';
import { useEffect } from 'react';

const StoreDashboardPosters = () => {
    const dispatch = useAppDispatch();
    const store = useAppSelector((state) => state.storeAdmin.store);
    const posters = useAppSelector((state) => state.posters.posters);
    const isLoading = useAppSelector((state) => state.posters.isLoading);

    const fetchStorePosters = () => {
      if (store?._id) {
        dispatch(fetchPostersByStore(store._id));
      }
    };

    useEffect(() => {
      fetchStorePosters();
    }, [store?._id]);


    return (
      <div className='w-full h-full'>
          <Routes>
            <Route path="*" element={
              <div className='w-full'>
                <RenderDigitalPoster config={posters[0]}/>
              </div>
              } 
            />
            <Route path="/create" element={<CreatePosterModal />} />
            <Route path="/view/:posterId" element={
              <div className='w-full'>
                <RenderDigitalPoster config={posters[-1]}/>
              </div>
              } 
            />
          </Routes>
      </div>
    )
}

export default StoreDashboardPosters;