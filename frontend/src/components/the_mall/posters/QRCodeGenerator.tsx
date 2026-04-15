import React, { useEffect, useState } from 'react'
import QRCode from "qrcode";

const QRCodeGenerator = ({storeSlug}: {storeSlug: string}) => {
    const [dataUrl, setDataUrl] = useState<string>('');
    const storeUrl = `https://themallbeta.com`;

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                const url = await QRCode.toDataURL(storeUrl, { margin: 1, width: 360 });
                setDataUrl(url);
            } catch (error) {
                console.error('Error generating QR code:', error);
            }
        };

        generateQRCode();
    }, [storeUrl]);

    return (
        <div className='text-center border-10'>
            <img 
                src={dataUrl || "https://storage.googleapis.com/the-mall-uploads-giza/stores/690b86f9423e034c4fec9d69/images/qrcode2.png"} 
                alt="" 
                className="border-b-10 ml-[1px]" 
            />
            <p 
                style={{ 
                    //fontFamily: "Bebas Neue", 
                    lineHeight: "1" ,
                    letterSpacing: "5px"
                }} 
                className="font-bold text-[4.5vh] mt-1 py-1"
            >
                themallbeta.com
            </p>
        </div>
    )
}

export default QRCodeGenerator;