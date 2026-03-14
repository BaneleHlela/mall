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
      <div className='relative flex items-center justify-center w-full h-full overflow-y-scroll p-8'>
        {/* Design Resources Section */}
        <div className="backdrop-blur-md rounded-2xl p-8 mb-8 border border-purple-100 shadow-sm z-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Design Your Own Poster</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            The mall currently sources designs from <strong>Canva</strong>. If you'd like to design your own poster, menu, or marketing material, 
            we recommend using <strong>Canva</strong> to select a template that suits your needs. Once you've chosen a template, 
            visit the Mall Graphic Designs store to have our team create a custom design for you.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://www.canva.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-500 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Go to Canva
            </a>
            <a 
              href="/stores/mall-graphic-design" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-400 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg line-clamp-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Go to Mall Graphic Designs
            </a>
          </div>
        </div>
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202026-03-14%20112418.png" 
            alt="mall theme image" 
            className="w-full h-full object-cover"
          />
        </div>
          <Routes>
            <Route path="*" element={
              posters.map((poster, index) => (
              <div key={index} className="mb-4"> {/* Add a unique key and spacing between posters */}
                <RenderDigitalPoster config={poster} />
              </div>
            ))} 
            />
            <Route path="/create" element={<CreatePosterModal />} />
            <Route path="/view/:posterId" element={
                <div className='w-full'>
                  <RenderDigitalPoster config={posters[3]}/>
                </div>
              } 
            />
          </Routes>
      </div>
    )
}

export default StoreDashboardPosters;