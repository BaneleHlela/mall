import React, { useEffect, useState } from 'react';
import FirstStoreServiceCard from '../../../extras/cards/service/first/FirstStoreServiceCard';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import CategorySelector from '../../../extras/category_selector/CategorySelector';
import type { Service } from '../../../../../types/serviceTypes';
import { fetchStoreServices } from '../../../../../features/services/servicesSlice';
import BookWithCalendar from '../../book_with_calender/BookWithCalendar';
import { IoMdClose } from 'react-icons/io';

const FirstServices = () => {
  const dispatch = useAppDispatch();
  const style = useAppSelector(state => state.layoutSettings.services);
  const store = useAppSelector((state) => state.stores.currentStore);
  const storeId = store ? store._id : null;
  const screenWidth = window.innerWidth;

  const services = useAppSelector((state) => state.services.services)

  
  const selectedCategory = useAppSelector((state) => state.categories.selectedCategory);
  const [selectedService, setSelectedService] = useState<Service | null>(null); // State to track the selected Service;
  const [showPopup, setShowPopup] = useState(false); // State to toggle popup visibility

  const handleServiceClick = (service: Service) => {
    setSelectedService(service); 
    setShowPopup(true); 
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
  };

  useEffect(() => {
    if (storeId) {
      if (selectedCategory === "all") {
        dispatch(fetchStoreServices({ storeId }));
      } else {
        dispatch(fetchStoreServices({ storeId, category: selectedCategory }));
      }
    }
  }, [storeId, selectedCategory, dispatch]);


  return (
    <div 
      className="min-h-screen w-full flex flex-row justify-center bg-[#d1dfc7]"
    >
      <div 
        style={{
          ...getBackgroundStyles(style.background),
        }}
        className="">
        {/* Header */}
        <h1 
          style={{
            ...getTextStyles(style.header.text),
          }}
          className="w-full text-center p-4 pb-8"
        >{style.header.text.input || "Our Services" }</h1>
        {/* Categories */}
        <div className="w-full pb-4 flex flex-row justify-center">
            <CategorySelector categories={store?.categories.services || []} style={style.categorySelector} />
        </div>
        <div 
          style={{
            gap: getResponsiveDimension(style.servicesDisplay.grid.gap, screenWidth),
          }} 
          className={`grid 
              ${style.servicesDisplay.grid.columns.mobile === 1 && "grid-cols-1"}
              ${style.servicesDisplay.grid.columns.mobile === 2 && "grid-cols-2"}
              ${style.servicesDisplay.grid.columns.desktop === 3 && "lg:grid-cols-3"}
              ${style.servicesDisplay.grid.columns.desktop === 4 && "lg:grid-cols-4"} 
              ${style.servicesDisplay.grid.columns.desktop === 5 && "lg:grid-cols-5"} 
              sm:grid-cols-2`
            }
          >
          {services.map((service) => (
            <FirstStoreServiceCard
              key={service._id}
              title={service.name}
              duration={service.duration}
              price={service.price}
              style={style.serviceCard}
              onClick={() => handleServiceClick(service)}
            />
          ))}
        </div>
      </div>
      {/* Popup for BookWithCalendar */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div
            className="relative bg-white rounded-md shadow-lg z-52"
            style={{
              width: "65%",
              height: "80%",
            }}
          >
            <button
              className="absolute top-1 right-1 text-black shadow-md rounded-full p-1 hover:scale-102"
              onClick={handleClosePopup} // Close popup
            >
              <IoMdClose size={22}/>
            </button>
            <BookWithCalendar service={selectedService}/>
            
          </div>
          <div className="fixed inset-0 h-screen w-screen bg-black opacity-30 z-49"></div>
        </div>
      )}
      
    </div>
  );
};

export default FirstServices;
