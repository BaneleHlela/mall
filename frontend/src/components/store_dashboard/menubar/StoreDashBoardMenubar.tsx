import {
  RiQuestionAnswerLine
} from "react-icons/ri";
import {
  FaUserCheck,
  FaUsers,
  FaHandsHelping,
  FaChartArea,
  FaRegImages,
} from "react-icons/fa";
import {
  PiPackageBold,
  PiShoppingBagBold,
  PiClockBold,
} from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { LuFileImage } from "react-icons/lu"; // replace only if needed
import DashboardLink from "./DashboardLink";
import type { Store } from "../../../types/storeTypes";
import { IoMdClose } from "react-icons/io";
import StorePosterRatingStars from "../../the_mall/basic_store_post/StorePosterRatingStars";
import { useNavigate } from "react-router-dom";
import { MdOutlineCleaningServices } from "react-icons/md";
import { FaKey } from "react-icons/fa";

interface Props {
  store: Store;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

const StoreDashBoardMenubar = ({
  store,
  isMobileMenuOpen = false,
  setIsMobileMenuOpen,
}: Props) => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    if (isMobileMenuOpen && setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div
      className={`relative pl-2 pr-2 pb-10 min-w-[18vw] h-full shadow-sm bg-white flex flex-col justify-between lg:justify-start ${
        isMobileMenuOpen ? "flex lg:flex" : "hidden lg:flex"
      } ${
        isMobileMenuOpen
          ? "fixed lg:relative top-0 left-0 z-50 w-full lg:w-auto h-full lg:h-full lg:bg-white"
          : ""
      }`}
    >
      {/* Mobile close button */}
      {isMobileMenuOpen && (
        <button
          onClick={() => setIsMobileMenuOpen?.(false)}
          className="bg-black lg:hidden absolute top-4 right-4 z-60 rounded-[.45vh] text-white hover:text-gray-800 text-2xl"
        >
          <IoMdClose size={32} />
        </button>
      )}

      {/* Store name */}
      <div className="flex items-end justify-between lg:items-center w-full h-[12%] pb-4 lg:pb-0 font-[500] text-center border-b-1 border-gray-300">
        <p style={{ lineHeight: "1" }} className="line-clamp-1 text-[3vh]">
          {store.name}
        </p>
        <div className="mb-1">
          <StorePosterRatingStars
            rating={store.rating ? store.rating.averageRating : 0}
            color="text-black"
          />
        </div>
      </div>

      {/* Links */}
      <div className="lg:mt-[5vh] text-[2vh]">

        <DashboardLink
          linkTo={`/dashboard/${store.slug}`}
          icon={<FaChartArea className="text-[1.8vh]" />}
          text="Overview"
          onClick={handleLinkClick}
        />

        <DashboardLink
          linkTo={`/dashboard/${store.slug}/team`}
          icon={<FaUsers className="text-[1.8vh]" />}
          beta={true}
          text="Team"
          onClick={handleLinkClick}
        />

        {store.trades.includes("products") && (
          <DashboardLink
            linkTo={`/dashboard/${store.slug}/orders`}
            icon={<PiClockBold className="text-[1.8vh]" />}
            text="Orders"
            onClick={handleLinkClick}
          />
        )}

        {store.trades.includes("services") && (
          <DashboardLink
            linkTo={`/dashboard/${store.slug}/bookings`}
            icon={<MdOutlineCleaningServices className="text-[1.8vh]" />}
            text="Bookings"
            onClick={handleLinkClick}
          />
        )}

        {store.trades.includes("packages") && (
          <DashboardLink
            linkTo={`/dashboard/${store.slug}/subscriptions`}
            icon={<FaUserCheck className="text-[1.8vh]" />}
            text="Subscriptions"
            onClick={handleLinkClick}
          />
        )}

        {store.trades.includes("products") && (
          <DashboardLink
            linkTo={`/dashboard/${store.slug}/products`}
            icon={<PiShoppingBagBold className="text-[1.8vh]" />}
            text="Products"
            onClick={handleLinkClick}
          />
        )}

        {store.trades.includes("services") && (
          <DashboardLink
            linkTo={`/dashboard/${store.slug}/services`}
            icon={<FaHandsHelping className="text-[1.8vh]" />}
            text="Services"
            onClick={handleLinkClick}
          />
        )}

        {store.trades.includes("packages") && (
          <DashboardLink
            linkTo={`/dashboard/${store.slug}/packages`}
            icon={<PiPackageBold className="text-[1.8vh]" />}
            text="Packages"
            onClick={handleLinkClick}
          />
        )}

        {store.trades.includes("rentals") && (
          <DashboardLink
            linkTo={`/dashboard/${store.slug}/rentals`}
            icon={<FaKey className="text-[1.8vh]" />}
            text="Rentals"
            onClick={handleLinkClick}
          />
        )}

        <DashboardLink
          linkTo={`/dashboard/${store.slug}/donations`}
          icon={<FaHandsHelping className="text-[1.8vh]" />}
          text="Donations"
          onClick={handleLinkClick}
        />

        <DashboardLink
          linkTo={`/dashboard/${store.slug}/layouts`}
          icon={<RxDashboard className="text-[1.8vh]" />}
          text="Layouts"
          onClick={handleLinkClick}
        />

        <DashboardLink
          linkTo={`/dashboard/${store.slug}/posters`}
          icon={<LuFileImage className="text-[1.8vh]" />}
          text="Posters"
          onClick={handleLinkClick}
        />

        <DashboardLink
          linkTo={`/dashboard/${store.slug}/images`}
          icon={<FaRegImages className="text-[1.8vh]" />}
          text="Images"
          onClick={handleLinkClick}
        />
      </div>

      {/* Tools Buttons */}
      <div className="w-full flex justify-evenly lg:absolute lg:bottom-[2vh] lg:left-1 ">
        <div
          onClick={() => navigate(`/dashboard/${store.slug}/settings`)}
          className="flex flex-col items-center justify-evenly w-[10vh] aspect-square bg-gray-200 p-3 rounded"
        >
          <IoSettingsOutline className="text-[3vh]" />
          <p style={{ lineHeight: "1" }} className="font-[500]">
            Settings
          </p>
        </div>

        <div
          onClick={() => navigate(`/dashboard/${store.slug}/store-help`)}
          className="flex flex-col items-center justify-evenly w-[10vh] aspect-square bg-gray-200 p-3 rounded"
        >
          <RiQuestionAnswerLine className="text-[3vh]" />
          <p style={{ lineHeight: "1" }} className="font-[500]">
            Help
          </p>
        </div>

        <div
          onClick={() => {}}
          className="flex flex-col items-center justify-evenly w-[10vh] aspect-square bg-red-200 p-3 rounded text-red-600"
        >
          <FiLogOut className="text-[3vh]" />
          <p style={{ lineHeight: "1" }} className="font-[500]">
            Exit
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreDashBoardMenubar;
