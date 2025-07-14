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
      show: string[];
      size: number;
      color: string;
      background: {
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
}

export const socials = [
    { platform: 'whatsapp', url: 'https://wa.me/0797604204', _id: '68502c4db7cdd894b89e9602' },
    { platform: 'phone', url: 'tel:0797604204', _id: '68502c4db7cdd894b89e9603' },
    { platform: 'twitter', url: 'https://x.com/Skipfornow__1', _id: '68502c4db7cdd894b89e9604' },
];


const StoreMenubarIcons: React.FC<StoreMenubarIconsProps> = ({style}) => {
    const socials = useAppSelector((state) => state.stores?.currentStore?.socials);
    const platforms = style.platforms
    
    const renderIcon = (platform: string) => {
        switch (platform) {
            case "facebook":
                return <FaFacebook size={style.size} color={style.color} />;
            case "twitter":
                return <BsTwitterX size={style.size} color={style.color} />;
            case "instagram":
                return <FaInstagram size={style.size} color={style.color} />;
            case "linkedin":
                return <FaLinkedin size={style.size} color={style.color} />;
            case "pinterest":
                return <FaPinterest size={style.size} color={style.color} />;
            case "youtube":
                return <FaYoutube size={style.size} color={style.color} />;
            case "whatsapp":
                return <FaWhatsapp size={style.size + 5} color={style.color} />;
            case "phone":
                return <FaPhoneAlt size={style.size} color={style.color} />;
            case "email":
                return <SiGmail size={style.size} color={style.color} />;
            default:
                return null; 
        }
    };

    const handleRedirect = (url: string) => {
        if (url.startsWith("http") || url.startsWith("https")) {
          window.open(url, "_blank"); // Open external links in a new tab
        } else if (url.startsWith("tel:") || url.startsWith("mailto:")) {
          window.location.href = url; // Handle phone or email links
        }
    };
    const platformOrder = [platforms.first, platforms.second, platforms.third];

    return (
        <div 
            style={{
                ...getBorderStyles(style.background.border),
                padding: style.background.padding,
                ...getBackgroundStyles(style.background)
            }}
            className={`w-fit flex flex-row justify-center gap-2`}
        >
            {platformOrder
            .slice(0, Math.min(style.number, 3)) // ✅ limit the number of icons
            .map((platform) => {
                const social = socials?.find(s => s.platform === platform);
                if (!social) return null;

                return (
                    <div
                        key={platform}
                        style={{
                            ...getBackgroundStyles(style.iconBackground),
                            border: `${style.iconBackground.border.width} ${style.iconBackground.border.style} ${style.iconBackground.border.color}`,
                        }}
                        className="flex items-center justify-between rounded-full cursor-pointer"
                        onClick={() => handleRedirect(social.url)}
                    >
                        {renderIcon(platform)}
                    </div>
                );
            })}
        </div>
    );
}

export default StoreMenubarIcons;
