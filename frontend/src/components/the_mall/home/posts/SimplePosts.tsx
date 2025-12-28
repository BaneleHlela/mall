import { FaCircleDollarToSlot } from "react-icons/fa6"
import { GrFlagFill } from "react-icons/gr";
import { IoIosFlag } from "react-icons/io";

export const WelcomeToTheMall = () => {
    return (
        <div className="w-full bg-white">
            <p>
                Welcome to The Mall! We're thrilled to have you here. This is a place where you can start or discover and shop from a variety of stores, all in one convenient location. Enjoy your shopping experience!
            </p>
        </div>
    )
}

export const MallStillBeta = () => {
    return (
      <div className="w-full bg-white">
        <p>
          This is the first version of The Mall, so it may still be limited and
          buggy, with missing features such as in-store chat and video support.
          Please report any issues you encounter to help us improve the
          experience.
        </p>
      </div>
    );
  };
  

export const YouCanInvest = () => {
    return (
      <div className="w-full bg-white font-normal">
        <p>
          You can invest in some of the stores on The Mall. Just look for the 
          invest{" "}
          <span className="inline-flex items-center">
            (<FaCircleDollarToSlot className="text-green-500" />)
          </span>{" "}
          icon on the store's page. Invest responsibly! 
        </p>
      </div>
    );
};
  

export const LookOutForRedFlags = () => {
    return (
      <div className="w-full bg-white">
        <p>
          Look out for the red flag{" "}
          <span className="inline-flex items-center">
            (<IoIosFlag className="text-red-600"/>)
          </span>{" "}
          icon when buying from stores. It helps indicate if a store may be
          selling counterfeit items, offering unrealistic terms, or showing
          other warning signs.
        </p>
      </div>
    );
  };
  
  
  

export const Diversify = () => {
    return (
        <div className="w-full bg-white">
            <p>
                Diversify your portfolio by investing in multiple stores. This can help reduce risk and increase potential returns.
            </p>
        </div>
    )
}

export const WhyInvest = () => {
    return (
        <div className="w-full bg-white">
            <p>
                Investing in stores on The Mall can be a great way to support local businesses and potentially earn a return on your investment.
            </p>
        </div>
    )
}


export const ImageConsentNotice = () => {
    return (
      <div className="w-full bg-white font-normal">
        <p>
            Respect individuals’ rights by using photos of people only with their consent, particularly when promoting your product.
        </p>
      </div>
    );
};
  
// Bundle all together

