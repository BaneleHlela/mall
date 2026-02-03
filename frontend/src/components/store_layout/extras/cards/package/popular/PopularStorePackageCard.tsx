import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockLayout } from '../../../../../../major_updates/mockLayout';
import { getBackgroundStyles, getTextStyles } from '../../../../../../utils/stylingFunctions';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import { IoShareSocial } from 'react-icons/io5';
import StorePosterRatingStars from '../../../../../the_mall/basic_store_post/StorePosterRatingStars';
import { RiArrowDownWideFill } from 'react-icons/ri';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';

interface FirstStorePackageCardProps {
  label?: string;
  title: string;
  price: number;
  frequency: string;
  description: string;
  duration: string;
  features: string[];
  isHighlighted?: boolean;
}

const PopularStorePackageCard: React.FC<FirstStorePackageCardProps> = ({
  label,
  title,
  price,
  frequency,
  description,
  duration,
  features,
  isHighlighted = false,
}) => {
  const [showBenefits, setShowBenefits] = useState(false);
  const [showInteractions, setShowInteractions] = useState(false);

  const config = mockLayout.sections.packages.card;
  const { colors, fonts } = mockLayout;

  const isFavorite = true;
  const handleFavoriteClick = () => {};

  return (
    <div
      style={{
        ...getBackgroundStyles(config.background, colors),
        ...getTextStyles(config.text.details, fonts, colors),
      }}
      className={`border text-center flex flex-col relative justify-between ${
        isHighlighted ? 'scale-102' : ''
      }`}
    >
      {/* Label */}
      {label && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-3 py-1">
          {label}
        </div>
      )}

      {/* Header */}
      <div
        style={{
          borderBottom: `${config.border.show && ( showBenefits || window.innerWidth > 476) ? '1px' : '0'} solid ${
            colors[config.border.color as keyof typeof colors] || config.border.color
          }`,
        }}
        className="p-6"
      >
        <h3
          style={getTextStyles(config.text.name, fonts, colors)}
          className="text-xl font-semibold mb-2 line-clamp-1"
        >
          {title}
        </h3>

        <p
          style={getTextStyles(config.text.price, fonts, colors)}
          className="text-3xl font-bold"
        >
          R{price}
        </p>

        <p>{frequency}</p>
        <p className="mt-2">{description}</p>
        <p className="text-xs opacity-60">{duration}</p>

        <button
          style={{
            ...getBackgroundStyles(config.button.style.background, colors),
            ...getTextStyles(config.button.style.text, fonts, colors),
          }}
          className="bg-black text-white px-4 py-2 mt-6 w-full hover:opacity-90"
        >
          Select
        </button>
      </div>

      {/* ================= BENEFITS ================= */}

      {/* Desktop benefits (always visible) */}
      <ul className="hidden md:block p-4 space-y-2 list-none overflow-y-auto hide-scrollbar">
        {features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>

      {/* Mobile benefits toggle */}
      <div className="md:hidden">
        <button
          onClick={() => {
            setShowBenefits(prev => !prev);
            if (showBenefits) setShowInteractions(false);
          }}
          className="w-full py-1 flex items-center justify-center"
        >
          {showBenefits ? (
            <>
             {!showInteractions && <ChevronUp className="text-[3vh]" />} 
            </>
          ) : (
            <>
              <RiArrowDownWideFill className="text-[3vh]" />
            </>
          )}
        </button>

        <AnimatePresence mode="wait">
          {showBenefits && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="p-4 space-y-2 list-none overflow-hidden"
            >
              {features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Mobile interactions toggle (only after benefits) */}
        <AnimatePresence>
          {showBenefits && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <button
                onClick={() => setShowInteractions(prev => !prev)}
                className="w-full py-2 flex items-center justify-center text-[1.7vh] font-semibold"
              >
                {showInteractions ? (
                  <>
                    <ChevronUp className="ml-2 text-[3vh]" />
                  </>
                ) : (
                  <>
                    Show Interactions <ChevronDown className="ml-2 text-[2.5vh]" />
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ================= DESKTOP INTERACTIONS TOGGLE ================= */}
      <button
        onClick={() => setShowInteractions(prev => !prev)}
        className={`hidden md:flex w-full py-2 items-center justify-center
          ${!showInteractions ? '' : ''}`}
      >
        {showInteractions ? (
          <>
            <SlArrowUp className="ml-2 text-[2vh]" />
          </>
        ) : (
          <>
           <SlArrowDown className="ml-2 text-[2vh]" />
          </>
        )}
      </button>

      {/* ================= INTERACTIONS ================= */}
      <AnimatePresence>
        {showInteractions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {/* Likes / Purchases / Share */}
            <div className="flex justify-between w-full h-[4vh] px-[.8vh] border-t pt-1">
              <div className="flex items-center space-x-[1vh]">
                <div className="flex items-center space-x-1">
                  <button onClick={handleFavoriteClick}>
                    {isFavorite ? (
                      <GoHeartFill className="text-[2.5vh]" />
                    ) : (
                      <GoHeart className="text-[2.5vh]" />
                    )}
                  </button>
                  <p className="text-[1.7vh] font-semibold">10 likes</p>
                </div>

                <div className="flex items-center space-x-1">
                  <BiSolidPurchaseTag className="text-[2.5vh]" />
                  <p className="text-[1.7vh] font-semibold">
                    {10 + Math.floor(Math.random() * 100) + 10} purchases
                  </p>
                </div>
              </div>

              <div className="flex items-center cursor-pointer">
                <IoShareSocial className="text-[2.5vh]" />
              </div>
            </div>

            {/* Ratings */}
            <div className="relative flex items-center w-full h-[4.5vh] p-[.6vh] cursor-pointer">
              <div
                style={{
                  borderColor:
                    colors[config.text.details.color as keyof typeof colors] ||
                    config.text.details.color,
                }}
                className="w-full h-full text-[1.6vh] rounded border px-[.5vh] pr-[10vh] flex items-center font-semibold"
              >
                Ratings & Reviews
              </div>

              <div className="absolute right-[.5vh] px-[.5vh]">
                <StorePosterRatingStars rating={3.4} color="" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PopularStorePackageCard;
