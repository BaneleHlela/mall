import React from "react";
import { motion } from "framer-motion";
import { sections } from "../../utils/businessPlanContent";

const BusinessPlan: React.FC = () => {

  return (
    <div className="h-screen overflow-y-scroll hide-scrollbar bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      <header className="text-center py-[6vh] lg:py-[8vh] bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-md">
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

      <main className="max-w-5xl mx-auto px-[.8vh] lg:px-[2vh] py-[2vh] space-y-[2vh]">
        {/* Introduction and Background */}
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[2vh] shadow-sm p-[2vh]  hover:shadow-md transition-shadow duration-300 space-y-[1.5vh]"
          >
            {/* Title */}
            <h2 className="text-[2.8vh] mt-1 md:text-3xl font-bold text-indigo-600 border-l-4 border-indigo-500 pl-3">
              {sections[0].title}
            </h2>
            {/* Overview */}
            <p className="font-bold text-[2.3vh] mt-[4vh]">Overview & Situation Analysis :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
              {sections[0].overview}
            </div>
            {/* Purpose */}
            <p className="font-bold text-[2.3vh] mt-[4vh]">Purpose & Motivation :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
              {sections[0].purpose}
            </div>
            {/* Establishment & Structure */}
            <p className="font-bold text-[2.3vh] mt-[4vh]">Establishment & Structure :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
              {sections[0].establishment}
            </div>
            {/* Finanancing */}
            <p className="font-bold text-[2.3vh] mt-[4vh]">Financing :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
              {sections[0].financing}
            </div>
            {/* Milestones & Progress */}
            <p className="font-bold text-[2.3vh] mt-[4vh]">Milestones & Progress :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[0].milestones}
            </div>
            {/* Current Stages */}
            <p className="font-bold text-[2.3vh] mt-[4vh]">Current Stage  & Timeframe :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[0].currentStage}
            </div>
            {/* Challenges & Resolutions */}
            <p className="font-bold text-[2.3vh] mt-[4vh]">Challenges & Resolutions :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[0].challenges}
            </div>
        </motion.section>

        {/* Product */}
        <motion.section
            key="product"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[2vh] shadow-sm p-[2vh]  hover:shadow-md transition-shadow duration-300 space-y-[1.5vh]"
          >
            <h2 className="text-[2.8vh] mt-1 md:text-3xl font-bold text-indigo-600 mb-4 border-l-4 border-indigo-500 pl-3">
              3. Product
            </h2>
            {/* What is the Mall */}
            <p className="font-bold text-[2.3vh] mt-[3vh]">What is the mall ?</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
              {sections[2].definition}
            </div>
            {/* About the Current Prototype (The MVP) */}
            <p className="font-bold text-[2.3vh] mt-[4vh]">About the Current Prototype (The MVP) :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[2].mvp}
            </div>
        </motion.section>

        {/* Vision */}
        <motion.section
            key="vision"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[2vh] shadow-sm p-[2vh]  hover:shadow-md transition-shadow duration-300 space-y-[1.5vh]"
        >
            <h2 className="text-[2.8vh] mt-1 md:text-3xl font-bold text-indigo-600 mb-4 border-l-4 border-indigo-500 pl-3">
              4. Vision
            </h2>

            <div className="text-gray-700 leading-relaxed text-[17px]">
              {sections[3].content}
            </div>    
        </motion.section>
        {/* Mission Statement */}
        <motion.section
            key="mission"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[2vh] shadow-sm p-[2vh]  hover:shadow-md transition-shadow duration-300 space-y-[1.5vh]"
        >
            <h2 className="text-[2.8vh] mt-1 md:text-3xl font-bold text-indigo-600 mb-4 border-l-4 border-indigo-500 pl-3">
              5. Mission Statement
            </h2>

            <div className="text-gray-700 leading-relaxed text-[17px]">
              {sections[4].content}
            </div>
        </motion.section>
        {/* Market */}
        <motion.section
            key="market"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[2vh] shadow-sm p-[2vh]  hover:shadow-md transition-shadow duration-300 space-y-[1.5vh]"
        >
            <h2 className="text-[2.8vh] mt-1 md:text-3xl font-bold text-indigo-600 mb-4 border-l-4 border-indigo-500 pl-3">
              6. Market
            </h2>
            {/* Target Audience */}
            <p className="font-bold text-[2.3vh] mt-[4vh]">Target Audience :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
            {sections[5].targetAudience}
            </div>
            {/* Value Proposition */}
            <p className="font-bold text-[2.3vh] mt-[4vh]">Value Proposition :</p>
            <div className="text-gray-700 leading-relaxed text-[17px]">
                {sections[5].valueProposition}
            </div>
        </motion.section>
        
      </main>

      <footer className="text-center py-8 text-gray-600 text-sm border-t mt-16">
        © {new Date().getFullYear()} The Mall — Concept by Banele Hlela.
      </footer>
    </div>
  );
};

export default BusinessPlan;
