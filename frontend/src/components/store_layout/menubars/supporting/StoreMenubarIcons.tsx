import { useAppSelector } from "../../../../app/hooks";
import { 
    FaFacebook, 
    FaWhatsapp, 
    FaInstagram, 
    FaLinkedin, 
    FaPinterest, 
    FaYoutube, 
    FaPhone 
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { getBorderStyles } from "../../../../utils/stylingFunctions";

interface StoreMenubarIconsProps {
    style: {
      display: boolean;
      show: string[];
      size: number;
      color: string;
      background: {
        padding: string;
        backgroundColor: string;
        border: {
          width: string;
          style: string;
          color: string;
        };
      };
      iconBackground: {
        padding: string;
        backgroundColor: string;
        border: {
          width: string;
          style: string;
          color: string;
        };
      };
    };
}

const StoreMenubarIcons: React.FC<StoreMenubarIconsProps> = ({style}) => {
    const socials = useAppSelector((state) => state.stores?.currentStore?.socials);

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
                return <FaPhone size={style.size} color={style.color} />;
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

    return (
        <div 
            style={{
                ...getBorderStyles(style.background.border),
                padding: style.background.padding,
                backgroundColor: style.background.backgroundColor,
            }}
            className="w-fit flex flex-row justify-center gap-2 "
        >
            {socials
                ?.filter((social) => style.show.includes(social.platform)) // Filter socials based on `show`
                .map((social) => (
                <div
                    key={social.platform}
                    style={{
                    padding: style.iconBackground.padding,
                    backgroundColor: style.iconBackground.backgroundColor,
                    border: `${style.iconBackground.border.width} ${style.iconBackground.border.style} ${style.iconBackground.border.color}`,
                    }}
                    className="flex items-center justify-between rounded-full"
                    onClick={() => handleRedirect(social.url)}
                >
                    {renderIcon(social.platform)}
                </div>
            ))}
        </div>
    );
}

export default StoreMenubarIcons;
