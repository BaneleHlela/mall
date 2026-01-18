import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io';
import WebFont from 'webfontloader';

const StoreDonationModal = () => {
    const fonts = ["Faculty Glyphic"];
    const amounts = [10, 25, 50, 100, 250, 500];
    const paymentMethods = {
        creditCard: {
            name: "Credit/Debit Card",
            iconUrl: "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/credit-card-alt-1-svgrepo-com.svg",
        },
        googlePay: {
            name: "Google Pay",
            iconUrl: "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/google-pay-svgrepo-com.svg",
        },
        applePay: {
            name: "Apple Pay",
            iconUrl: "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/apple-pay-svgrepo-com.svg",
        },
        snapscan: {
            name: "SnapScan",
            iconUrl: "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/brand-snapscan-svgrepo-com.svg",
        },
    }
    
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    const [donationAmount, setDonationAmount] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [receiveUpdates, setReceiveUpdates] = useState(false);

    const formData = {
        selectedPaymentMethod,
        donationAmount,
        isAnonymous,
        receiveUpdates,
    };

    const handleSubmit = () => {
        // TODO: Send formData to backend
        console.log('Form Data:', formData);
    };
    
    // Load Fonts Dynmically
    useEffect(() => {
        if (fonts) {
        WebFont.load({
            google: {
            families: fonts, 
            },
        });
        }
    }, [fonts]);
    return (
        <div
            style={{
                fontFamily: fonts.join(", "),
            }}
            className='fixed inset-0 flex justify-center w-screen h-screen bg-stone-100 z-100'
        >
            {/* Container */}
            <div className="flex flex-col space-y-[3vh] p-[2vh] pb-[4vh] w-full lg:w-md lg:border border-gray-300 lg:rounded-[3vh] h-full text-center overflow-y-scroll hide-scrollbar bg-white">
                {/* Close Modal & Sign In (if not) Button */}
                <div className="flex items-center justify-between mb-[3vh]">
                    <button className="p-0 text-[2.5vh] w-1/3">
                        <IoIosArrowBack />
                    </button>
                    <div className="bg-black rounded p-1">
                        <img 
                            src="https://storage.googleapis.com/the-mall-uploads-giza/stores/6884a99461cfbcec1883b7dc/images/mall-logo.png" 
                            alt="themall-logo" 
                            className="h-[2.5vh] lg:h-[3vh] object-contain" 
                        />
                    </div>
                    <button className="flex justify-end w-1/3">
                        Sign In
                    </button>
                </div>
                {/* Donation Name and Description */}
                <div className=''>
                    {/* Donation Name */}
                    <p style={{lineHeight: "1"}} className="mt-[50vh] text-[3vh] font-extrabold capitalize">
                        Tithes & Offerings
                    </p>
                    {/* Donation description */}
                    <p className="text-[1.7vh] font-extrabold line-clamp-1 px-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>

                {/* Donation input and buttons with specific amounts */}
                <div className="flex flex-col items-start">
                    <p className="font-bold text-[1.8vh]">Enter your dontation</p>
                    <div 
                        className="flex flex-row justify-between items-center w-full mb-[1vh] px-[1vh] py-[1.5vh] rounded-[1.5vh] text-[1.8vh] border-[.1vh] border-gray-400 font-semibold hover:bg-stone-300"
                    >
                        <div className="w-[15%]">
                            <p style={{lineHeight: "1"}} className="text-[2.2vh]">R</p>
                            <p className="text-[1.2vh] font-normal">Rands</p>
                        </div>
                        <input 
                            type="number" 
                            min="0"
                            step="1"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            className="w-[70%] text-end h-full focus:outline-none text-[3vh]" 
                        />
                        <span className="w-[15%] text-[3vh]">.00</span>
                    </div>
                    <div className="grid grid-cols-3 lg:grid-cols-6 w-full gap-[1vh]">
                        {amounts.map((amount) => (
                            <button 
                                key={amount} 
                                onClick={() => setDonationAmount(amount.toString())}
                                className="p-[1.5vh] rounded-[1.5vh] text-[1.8vh] border-[.1vh] border-gray-400 font-semibold hover:bg-stone-300"
                            >
                                R{amount}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Payment Methods */}
                <div className="flex flex-col items-start w-full">
                    <p className="font-bold text-[1.8vh] mb-[.1vh]">Select payment method</p>
                    <div className="flex flex-col w-full rounded-[1.5vh] border-x-[.1vh] border-t-[.1vh] border-gray-400 overflow-hidden">
                        {Object.entries(paymentMethods).map(([key, method]) => (
                            <button
                                key={key}
                                onClick={() => setSelectedPaymentMethod(key)}
                                className="flex items-center start w-full p-[1.5vh] text-[1.8vh] border-b-[.1vh] font-[500] border-gray-400 hover:bg-stone-300 space-x-[1.5vh]"
                            >
                                {/* Select Circle */}
                                <div className="flex flex-col items-center justify-center h-[2vh] aspect-square rounded-full border-2 border-blue-500 hover:scale-110">
                                    {selectedPaymentMethod === key && <div className="w-[70%] aspect-square bg-blue-600 rounded-full"></div>}
                                </div>
                                <img 
                                    src={method.iconUrl} 
                                    alt={`${method.name}-icon`} 
                                    className="h-[3.5vh] object-contain" 
                                />
                                <span>{method.name}</span>
                                
                            </button>
                        ))}
                    </div>
                </div>
                {/* Remain anonymous and recieve updates on project (if applicable) check options */}
                <div className="flex flex-col w-full space-y-[.3vh]">
                    <label className="flex items-center justify-start space-x-[1.5vh] text-[1.8vh]">
                        <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="h-[5vh] w-[5vh]" />
                        <p className='text-start'>Remain anonymous. Your name and profile will not be visible to the public or the organization.</p>
                    </label>
                    <label className="flex items-center space-x-[1.5vh] text-[1.8vh]">
                        <input type="checkbox" checked={receiveUpdates} onChange={(e) => setReceiveUpdates(e.target.checked)} className="h-[5vh] w-[5vh]" />
                        <p className='text-start'> Receive updates about this project, including progress reports, milestones, and future initiatives.</p>
                    </label>
                </div>
                {/* Summary and pay button */}
                <div className="flex flex-col items-start w-full">
                    <p className="font-bold text-[1.8vh] mb-[.1vh]">Donation Summary</p>
                    <div className="flex flex-row items-center justify-between w-full text-[1.8vh] text-gray-500 mt-[1vh] border-b border-gray-200 pb-[1vh]">
                        <p className="">Your donation</p>
                        <p className="text-[1.7vh]">R{donationAmount || '0'}</p>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full text-[1.8vh] py-[1vh]">
                        <p className="">Total due now</p>
                        <p className="text-[1.7vh]">R{donationAmount || '0'}</p>
                    </div>
                    <button 
                        onClick={handleSubmit} 
                        className="flex flex-row justify-center items-center w-full bg-black text-white rounded-full p-[.5vh] text-[2vh] font-bold hover:bg-blue-700 my-[3vh]"
                    >
                        {selectedPaymentMethod ? (
                            <>

                                <img src={ //@ts-ignore-next-line
                                    paymentMethods[selectedPaymentMethod].iconUrl as keyof typeof paymentMethods} alt="" className="h-[5vh] object-cover" /> &nbsp; | Pay R{donationAmount || '0'}
                            </>
                        ) : (
                            <>Donate</>
                        )}
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default StoreDonationModal;