
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppSupportButtonProps {
    message: string;
    phoneNumber?: string;
    className?: string;
}
  
const WhatsAppSupportButton = ({ message, phoneNumber, className = "" }: WhatsAppSupportButtonProps) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl =  phoneNumber ? `https://wa.me/${phoneNumber}?text=${encodedMessage}` : `https://wa.me/+27823587199?text=${encodedMessage}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg ${className}`}
        >
            <FaWhatsapp className="text-xl" />
            Chat on WhatsApp
        </a>
    );
};
  
export default WhatsAppSupportButton;