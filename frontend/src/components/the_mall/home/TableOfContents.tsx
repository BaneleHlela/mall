import React from "react";
import { motion } from "framer-motion";

interface TOCItem {
  title: string;
  subItems?: string[];
  id: string;
}

const tableOfContents: TOCItem[] = [
  { title: "Executive Summary", id: "executive-summary" },
  {
    title: "Introduction and Background",
    id: "introduction",
    subItems: [
      "Overview & Situation Analysis",
      "Purpose & Motivation",
      "Establishment & Structure",
      "Financing",
      "Milestones & Progress",
      "Current Stage & Timeframe",
      "Challenges & Resolutions",
    ],
  },
  {
    title: "Product",
    id: "product",
    subItems: ["What is The Mall?", "About the Current Prototype (The MVP)"],
  },
  { title: "Vision", id: "vision" },
  { title: "Mission Statement", id: "mission" },
  {
    title: "Market",
    id: "market",
    subItems: ["Target Audience", "Value Proposition"],
  },
  {
    title: "Competition",
    id: "competition",
    subItems: ["Shopify", "Wix", "Amazon", "Yoco", "Social Platforms"],
  },
  {
    title: "Marketing Strategy",
    id: "marketing",
    subItems: [
      "Core Principle: Market The Mall through Vendors",
      "Consumer Attraction",
    ],
  },
];

const TableOfContents: React.FC = () => {
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white mx-auto shadow-md p-5 border border-gray-100"
    >
      <h2 className="text-[4vh] font-bold text-indigo-700 mb-3">
        Table of Contents
      </h2>
      <ul className="space-y-2 text-gray-700 text-[2.5vh]">
        {tableOfContents.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleScroll(item.id)}
              className="text-left w-full hover:text-indigo-600 font-semibold transition-colors"
            >
              {item.title}
            </button>
            {item.subItems && (
              <ul className="ml-4 mt-1 space-y-1 text-[2.3vh] text-gray-600 text-start">
                {item.subItems.map((sub, i) => (
                  <li key={i}>
                    <button
                      onClick={() => handleScroll(item.id)}
                      className="hover:text-indigo-600 transition-colors text-start"
                    >
                      - {sub}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default TableOfContents;
