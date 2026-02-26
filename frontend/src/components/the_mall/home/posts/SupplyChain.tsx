import React from 'react'

const SupplyChain = () => {
  return (
    <div>
      <p className="font-normal py-[.7vh]">
        Today's business term: Supply Chain. Where does your business fit, and what value does it bring to the supply chain?
      </p>
      <div className="relative w-full">
        <img
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-08%20125100.png"
          alt="Supply Chain Image"
          className="w-full h-full object-cover"
        />
        <a
          href="https://www.investopedia.com/terms/s/supplychain.asp"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 left-2 font-normal border border-white text-white p-2"
        >
          Read more
        </a>
      </div>
    </div>
  )
}

export default SupplyChain
