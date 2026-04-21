import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Fade as Hamburger } from "hamburger-react";
import { IoNotificationsOutline, IoSearch } from "react-icons/io5";
import { FiLogOut, FiSettings, FiHelpCircle } from "react-icons/fi";
import { FaChartArea, FaStore, FaCrown } from "react-icons/fa";
import { RiVipCrown2Fill } from "react-icons/ri";
import CreatorsDashboardOverview from "./supporting/CreatorsDashboardOverview";
import CreatorsDashboardStores from "./supporting/CreatorsDashboardStores";
import SearchPostsDashboard from "./supporting/SearchPostsDashboard";

import UserDisplay from "../../components/store_dashboard/menubar/UserDisplay";

const CreatorsDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen w-screen flex flex-row bg-slate-50 overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed h-screen z-50 lg:relative lg:z-auto transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div
          className={`relative min-w-[280px] h-full flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 ${
            isMobileMenuOpen ? "fixed lg:relative top-0 left-0 z-50 w-full lg:w-auto h-full" : "hidden lg:flex"
          }`}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          {/* Mobile close button */}
          {isMobileMenuOpen && (
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden absolute top-4 right-4 z-60 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Header */}
          <div className="relative p-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                TM
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-white font-semibold text-lg truncate">The Mall</h2>
                <p className="text-white/50 text-sm">Creators Dashboard</p>
              </div>
            </div>
          </div>

          {/* Premium Banner */}
          <div className="mx-4 mt-4 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-pink-500/20 border border-amber-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                <FaCrown className="text-white text-lg" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">Admin Access</p>
                <p className="text-white/50 text-xs">Full platform control</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            <div className="mb-2 px-3">
              <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Main</span>
            </div>

            <button
              onClick={() => {
                handleLinkClick();
                navigate("/creators-dashboard");
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive("/creators-dashboard") || location.pathname === "/creators-dashboard"
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <FaChartArea className="text-lg" />
              <span className="font-medium">Overview</span>
            </button>

            <button
              onClick={() => {
                handleLinkClick();
                navigate("/creators-dashboard/stores");
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive("/creators-dashboard/stores")
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <FaStore className="text-lg" />
              <span className="font-medium">Stores</span>
            </button>

            <button
              onClick={() => {
                handleLinkClick();
                navigate("/creators-dashboard/search-posts");
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive("/creators-dashboard/search-posts")
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-lg">🔍</span>
              <span className="font-medium">Search Posts</span>
            </button>
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-white/10">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleLinkClick}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <FiSettings className="text-white/60 group-hover:text-white text-xl transition-colors" />
                <span className="text-white/60 group-hover:text-white text-xs font-medium transition-colors">Settings</span>
              </button>

              <button
                onClick={handleLinkClick}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <FiHelpCircle className="text-white/60 group-hover:text-white text-xl transition-colors" />
                <span className="text-white/60 group-hover:text-white text-xs font-medium transition-colors">Help</span>
              </button>

              <button
                onClick={handleLinkClick}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-colors group"
              >
                <FiLogOut className="text-red-400 group-hover:text-red-300 text-xl transition-colors" />
                <span className="text-red-400 group-hover:text-red-300 text-xs font-medium transition-colors">Exit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col h-screen w-full overflow-hidden">
        {/* Topbar */}
        <div className='bg-gradient-to-r from-slate-50 to-white font-[Outfit] flex flex-row justify-between items-center w-full min-h-[12vh] text-gray-900 px-4 lg:px-8 border-b border-slate-200/80'>
          {/* Left Section - Hamburger & Title */}
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger */}
            <div className="rounded-xl bg-slate-900 text-white flex items-center justify-center lg:hidden shadow-lg shadow-slate-900/20">
              <Hamburger 
                toggled={isMobileMenuOpen} 
                toggle={(toggled) => setIsMobileMenuOpen(toggled ? true : false)} 
                size={24}
              />
            </div>

            {/* Title & Breadcrumb */}
            <div className="hidden lg:flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
                <span>Dashboard</span>
                <span>/</span>
                <span className="text-slate-600">
                  {isActive("/creators-dashboard/stores") ? "Stores" : "Overview"}
                </span>
              </div>
              <h1 className='text-2xl font-bold text-slate-800'>Welcome back! 👋</h1>
            </div>
          </div>

          {/* Center - Searchbar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
              <input 
                type="text" 
                placeholder="Search stores, users, orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 rounded-xl bg-slate-100 border-2 border-transparent 
                        focus:border-slate-300 focus:bg-white placeholder:text-slate-400 
                        pl-11 pr-4 text-sm transition-all duration-200
                        focus:outline-none focus:ring-4 focus:ring-slate-100"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-200 rounded-md text-xs text-slate-500 font-medium">
                ⌘K
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
              <IoNotificationsOutline className='text-xl text-slate-600' />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                3
              </span>
            </button>

            {/* User Display */}
            <UserDisplay />
          </div>
        </div>
        
        {/* Page Content */}
        <main className="flex items-center justify-center h-full w-full overflow-y-auto overflow-x-hidden">
          <Routes>
            <Route path="/" element={<CreatorsDashboardOverview />} />
            <Route path="/stores" element={<CreatorsDashboardStores searchQuery={searchQuery} />} />
            <Route path="/search-posts" element={<SearchPostsDashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default CreatorsDashboard;
