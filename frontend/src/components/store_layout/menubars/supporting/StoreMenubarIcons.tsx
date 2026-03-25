import { 
    FaFacebook, 
    FaWhatsapp, 
    FaInstagram, 
    FaLinkedin, 
    FaPinterest, 
    FaYoutube, 
    FaPhoneAlt 
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";
import { getBackgroundStyles, getBorderStyles } from "../../../../utils/stylingFunctions";
import { useAppSelector } from "../../../../app/hooks";

interface StoreMenubarIconsProps {
    style: {
      number: number;
      display: boolean;
      platforms: any;
      //show: string[];
      size: string;
      color: string;
      background: {
        padding?: {
            x: string;
            y: string;
        };
        color: string;
        border: {
          width: string;
          style: string;
          color: string;
        };
      };
      iconBackground: {
        padding: {
            x: string;
            y: string;
        };
        color: string;
        border: {
          width: string;
          style: string;
          color: string;
        };
      };
    };
    asFloat?: boolean;
}

// export const socials = [
//     { platform: 'whatsapp', url: 'https://wa.me/27697604204', _id: '68502c4db7cdd894b89e9602' },
//     { platform: 'phone', url: 'tel:+27697604204', _id: '68502c4db7cdd894b89e9603' },
//     { platform: 'twitter', url: 'https://x.com/Skipfornow__1', _id: '68502c4db7cdd894b89e9604' },
// ];


const StoreMenubarIcons: React.FC<StoreMenubarIconsProps> = ({ style, asFloat }) => {
    // Safeguard against missing style object
    if (!style) return null;

    const socials = useAppSelector((state) => state.stores?.currentStore?.socials);
    const platforms = style?.platforms || {};
    const colors = useAppSelector((state) => state.layoutSettings.colors);
    
    const renderIcon = (platform: string) => {
        const iconSize = style?.size || "20";
        const iconColor = colors?.[style?.color as keyof typeof colors] || colors?.primary || "#000";
        switch (platform) {
            case "facebook":
                return <FaFacebook size={iconSize} color={iconColor} />;
            case "twitter":
                return <BsTwitterX size={iconSize} color={iconColor} />;
            case "instagram":
                return <FaInstagram size={iconSize} color={iconColor} />;
            case "linkedin":
                return <FaLinkedin size={iconSize} color={iconColor} />;
            case "pinterest":
                return <FaPinterest size={iconSize} color={iconColor} />;
            case "youtube":
                return <FaYoutube size={iconSize} color={iconColor} />;
            case "whatsapp":
                return <FaWhatsapp size={iconSize} color={iconColor} className="scale-108"/>;
            case "phone":
                return <FaPhoneAlt size={iconSize} color={iconColor} />;
            case "email":
                return <SiGmail size={iconSize} color={iconColor} />;
            default:
                return null;
        }
    };

    const handleRedirect = (url: string, platform: string) => {
        if ((url.startsWith("http") || url.startsWith("https")) && platform !== "whatsapp") {
          window.open(url, "_blank"); // Open external links in a new tab
        } if (platform === "whatsapp") {
            if (url) {
                // Extract number from URL
                let number = url.replace("https://wa.me/", "").trim();

                // Remove any spaces or non-digit characters
                number = number.replace(/\D/g, "");

                // Convert SA local format to international
                if (number.startsWith("0")) {
                number = "+27" + number.slice(1);
                } else if (!number.startsWith("27")) {
                number = "+27" + number;
                } else {
                number = "+" + number;
                }

                const formattedUrl = `https://wa.me/${number}`;
                window.open(formattedUrl, "_blank")
            }
        }
        else if (url.startsWith("tel:") || url.startsWith("mailto:")) {
          window.location.href = url; // Handle phone or email links
        }
    };
    const platformOrder = [platforms?.first, platforms?.second, platforms?.third].filter(Boolean);
    return (
        <div
            style={{
                ...getBorderStyles(style?.background?.border || {}),
                ...getBackgroundStyles(style?.background || {})
            }}
            className={`w-fit flex ${ asFloat ? "flex-col" : "flex-row" } justify-center gap-2 z-200`}
        >
            {platformOrder
            .slice(0, Math.min(style?.number || 3, 3)) // ✅ limit the number of icons
            .map((platform) => {
                const social = socials?.find(s => s.platform === platform);
                if (!social) return null;

                return (
                    <div
                        key={platform}
                        style={{
                            ...getBackgroundStyles(style?.iconBackground || {}),
                        }}
                        className="flex items-center justify-between rounded-full cursor-pointer hover:scale-110"
                        onClick={() => handleRedirect(social.url, platform)}
                    >
                        {renderIcon(platform)}
                    </div>
                );
            })}
        </div>
    );
}

export default StoreMenubarIcons;
