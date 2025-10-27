import React from "react";
import { motion } from "framer-motion";
import { sections } from "../../../utils/businessPlanContent";
import TableOfContents from "./TableOfContents";

const BusinessPlan: React.FC = () => {

  return (
    <div className="h-screen overflow-y-scroll hide-scrollbar bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      <header className="text-center px-[.5vh] py-[3vh] lg:py-[8vh] bg-gradient-to-r from-indigo-700 to-indigo-800 text-white shadow-md">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[4vh] md:text-[4.5vh] font-bold mb-[1vh]"
        >
          The Mall — Business Plan
        </motion.h1>
        <p className="lg:max-w-[80%] mx-auto text-[2.5vh] opacity-90">
          Transforming the informal sector through digital empowerment, visibility,
          and community-driven growth.
        </p>
      </header>
      

      <main className="relative max-w-5xl mx-auto py-[2vh] space-y-[2vh]">
        <TableOfContents />
        {/* Executive Summary */}
        <motion.section
            key="executive-summary"
            id="executive-summary"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[1.2vh] shadow-sm p-[2vh] lg:px-[4vh]  hover:shadow-md transition-shadow duration-300 space-y-[1.5vh]"
          >
            {/* Title */}
            <h2 className="text-[2.8vh] mt-1 md:text-3xl font-bold text-indigo-600 border-l-4 border-indigo-500 pl-3 rounded bg-[#38728111] py-[1vh]">
              {sections[1].title}
            </h2>
            {/* Content */}
            <div className="text-gray-700 leading-relaxed text-[17px]">
              {sections[1].content}
            </div>
        </motion.section>
        {/* Introduction and Background */}
        <motion.section
            key="introduction-background"
            id="introduction"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[1.2vh] shadow-sm p-[2vh] lg:px-[4vh]  hover:shadow-md transition-shadow duration-300 space-y-[1.5vh]"
          >
            {/* Title */}
            <h2 className="text-[2.8vh] mt-1 md:text-3xl font-bold text-indigo-600 border-l-4 border-indigo-500 pl-3 rounded bg-[#38728111] py-[1vh]">
              {sections[0].title}
            </h2>
            {/* Overview */}
            <p className="font-bold text-[2.6vh] mt-[4vh] text-indigo-600">Overview & Situation Analysis :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
              {sections[0].overview}
            </div>
            {/* Purpose */}
            <p className="font-bold text-[2.6vh] mt-[4vh] text-indigo-600">Purpose & Motivation :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
              {sections[0].purpose}
            </div>
            {/* Establishment & Structure */}
            <p className="font-bold text-[2.6vh] mt-[4vh] text-indigo-600">Establishment & Structure :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
              {sections[0].establishment}
            </div>
            {/* Finanancing */}
            <p className="font-bold text-[2.6vh] mt-[4vh] text-indigo-600">Financing :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
              {sections[0].financing}
            </div>
            {/* Milestones & Progress */}
            <p className="font-bold text-[2.6vh] mt-[4vh] text-indigo-600">Milestones & Progress :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[0].milestones}
            </div>
            {/* Current Stages */}
            <p className="font-bold text-[2.6vh] mt-[4vh] text-indigo-600">Current Stage  & Timeframe :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[0].currentStage}
            </div>
            {/* Challenges & Resolutions */}
            <p className="font-bold text-[2.6vh] mt-[4vh] text-indigo-600">Challenges & Resolutions :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[0].challenges}
            </div>
        </motion.section>

        {/* Product */}
        <motion.section
            key="product"
            id="product"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[1.2vh] shadow-sm p-[2vh] lg:px-[4vh]  hover:shadow-md transition-shadow duration-300 space-y-[1.5vh]"
        >
            <h2 className="text-[2.8vh] mt-1 md:text-3xl font-bold text-indigo-600 border-l-4 border-indigo-500 pl-3 rounded bg-[#38728111] py-[1vh]">
              3. Product
            </h2>
            {/* What is the Mall */}
            <p className="font-bold text-[2.6vh] mt-[3vh] text-indigo-600">What is the mall ?</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
              {sections[2].definition}
            </div>
            {/* About the Current Prototype (The MVP) */}
            <p className="font-bold text-[2.6vh] mt-[4vh] text-indigo-600">About the Current Prototype (The MVP) :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[2].mvp}
            </div>
        </motion.section>

        {/* Vision */}
        <motion.section
            key="vision"
            id="vision"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[1.2vh] shadow-sm p-[2vh] lg:px-[4vh]  hover:shadow-md transition-shadow duration-300 space-y-[1.5vh]"
        >
            <h2 className="text-[2.8vh] mt-1 md:text-3xl font-bold text-indigo-600 border-l-4 border-indigo-500 pl-3 rounded bg-[#38728111] py-[1vh]">
              4. Vision
            </h2>

            <div className="text-gray-700 leading-relaxed text-[17px]">
              {sections[3].content}
            </div>    
        </motion.section>
        {/* Mission Statement */}
        <motion.section
            key="mission"
            id="mission"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[1.2vh] shadow-sm p-[2vh] lg:px-[4vh]  hover:shadow-md transition-shadow duration-300 space-y-[1.5vh]"
        >
            <h2 className="text-[2.8vh] mt-1 md:text-3xl font-bold text-indigo-600 border-l-4 border-indigo-500 pl-3 rounded bg-[#38728111] py-[1vh]">
              5. Mission Statement
            </h2>

            <div className="text-gray-700 leading-relaxed text-[17px]">
              {sections[4].content}
            </div>
        </motion.section>
        {/* Market */}
        <motion.section
            key="market"
            id="market"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[1.2vh] shadow-sm p-[2vh] lg:px-[4vh]  hover:shadow-md transition-shadow duration-300 space-y-[1.5vh]"
        >
            <h2 className="text-[2.8vh] mt-1 md:text-3xl font-bold text-indigo-600 border-l-4 border-indigo-500 pl-3 rounded bg-[#38728111] py-[1vh]">
              6. Market
            </h2>
            {/* Target Audience */}
            <p className="font-bold text-[2.6vh] mt-[4vh] text-indigo-600">Target Audience :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
            {sections[5].targetAudience}
            </div>
            {/* Value Proposition */}
            <p className="font-bold text-[2.6vh] mt-[4vh] text-indigo-600">Value Proposition :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[5].valueProposition}
            </div>
        </motion.section>
        {/* Competition */}
        <motion.section
            key="competition"
            id="competition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[1.2vh] shadow-sm p-[2vh] lg:px-[4vh]  hover:shadow-md transition-shadow duration-300 space-y-[1.5vh]"
        >
            <h2 className="text-[2.8vh] mt-1 md:text-3xl font-bold text-indigo-600 border-l-4 border-indigo-500 pl-3 rounded bg-[#38728111] py-[1vh]">
              7. Competition
            </h2>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[6].introduction}
            </div>
            {/* Shopify */}
            <p className="font-bold text-[2.6vh] mt-[4vh] text-indigo-600">Shopify</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[6].shopify}
            </div>
            {/* Wix */}
            <p className="font-bold text-[2.6vh] mt-[4vh] text-indigo-600">Wix</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[6].wix}
            </div>
            {/* Amazon */}
            <p className="font-bold text-[2.6vh] mt-[4vh] text-indigo-600">Amazon</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[6].amazon}
            </div>
            {/* Yoco */}
            <p className="font-bold text-[2.6vh] mt-[4vh] text-indigo-600">Yoco</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[6].yoco}
            </div>
            {/* Social Platforms */}
            <p className="font-bold text-[2.6vh] mt-[4vh] text-indigo-600">Social Platforms (Facebook Marketplace, Instagram Shops, WhatsApp Business)</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[6].socialPlatforms}
            </div>
        </motion.section>
        {/* Marketing Strategy */}
        <motion.section
            key="markerting"
            id="marketing"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[1.2vh] shadow-sm p-[2vh] lg:px-[4vh]  hover:shadow-md transition-shadow duration-300 space-y-[1.5vh]"
        >
            <h2 className="text-[2.8vh] mt-1 md:text-3xl font-bold text-indigo-600 border-l-4 border-indigo-500 pl-3 rounded bg-[#38728111] py-[1vh]">
              8. Marketing Strategy
            </h2>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[7].introduction}
            </div>
            {/* Core Principle */}
            <p className="font-bold text-[2.6vh] mt-[4vh]">Core Principle: Market The Mall through Vendors</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[7].corePrinciple}
            </div>
            {/* Consumer Attraction */}
            <p className="font-bold text-[2.6vh] mt-[4vh]">Consumer Attraction :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[7].consumerAttraction}
            </div>
        </motion.section>
        {/* Scroll Back Up button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed aspect-square bottom-8 right-8 bg-indigo-600 text-white rounded-full shadow-lg p-[2vh] hover:bg-indigo-700 transition-colors"
        >
          Here
        </button>
      </main>

      <footer className="text-center py-8 text-gray-600 text-sm border-t mt-16">
        © {new Date().getFullYear()} The Mall — Concept by Banele Hlela.
      </footer>
    </div>
  );
};

export default BusinessPlan;
