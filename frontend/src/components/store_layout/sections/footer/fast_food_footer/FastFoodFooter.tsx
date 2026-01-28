import React from 'react'
import { mockLayout } from '../../../../../major_updates/mockLayout'
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';
import StoreMenubarLogo from '../../../menubars/shared_menubar_components/StoreMenubarLogo';
import { useAppSelector } from '../../../../../app/hooks';
import { formatOperationTimes } from '../with_store_details_form_and_button/helpers/FormattedOperationTimes';
import { formatPhoneNumber } from '../with_store_details_form_and_button/helpers/footerHelpers';

const FastFoodFooter = () => {
    const config =  useAppSelector(state => state.layoutSettings.sections.footer)|| mockLayout.sections.about;
    const { colors, fonts } = useAppSelector(state => state.layoutSettings) || mockLayout;
    const store = useAppSelector((state) => state.stores.currentStore);

    return (
        <div
            id="footer"
            className='items-center w-full h-full flex flex-col py-[3vh] lg:py-[5vh]'
            style={{
                ...getBackgroundStyles(config.background, colors),
            }}
        >
            {/* Logo */}
            <div className="flex flex-col items-center">
                <StoreMenubarLogo
                    use={config.logo?.use}
                    logoText={config.logo.style.text?.input}
                    logoUrl={config.logo?.logoUrl}
                    style={{
                        text: {
                            color: colors[config.logo.style.text?.color as keyof typeof colors],
                            fontSize: config.logo.style.text?.fontSize,
                            fontWeight: config.logo.style.text?.weight,
                            letterSpacing: config.logo.style.text?.letterSpacing,
                            textDecoration: config.logo.style.text?.textDecoration,
                        },
                        background: config.logo?.style.background,
                    }}
                />
            </div>

            {/* Freestyle text */}
            <p
                className="py-[2vh] lg:maw-w-[70%]"
                style={{
                    ...getTextStyles(config.text.header, fonts, colors),
                }}
            >
                {config.text.header.input}
            </p>
            {/* Address */}
            <div
                style={{
                    ...getTextStyles(config.text.address, fonts, colors),
                    ...getTextStyles(config.text.details, fonts, colors),
                }}
                className="text-wrap rich-text py-[2vh] text-center"
                dangerouslySetInnerHTML={{ __html: config.text.address.input }}
            />
            {/* Opening Hours, Social Links, contact */}
            <div
                style={{
                    ...getTextStyles(config.text.details, colors),
                }}
                className="w-full max-w-[80%] flex flex-col items-center lg:items-start text-center lg:flex-row justify-between">
                {/* Opening Hours */}
                {config.show?.operationTimes !== false && (
                    <div className="">
                        {// @ts-ignore-next-line
                            formatOperationTimes(store?.operationTimes, config.text.details)}
                    </div>
                )}
                {/* Socials */}
                {config.show?.socials !== false && (
                    <div className="leading-tight my-[2vh]">
                        <p onClick={() => window.open("https://www.facebook.com/", "_blank")} className="m-0">Facebook</p>
                        <p onClick={() => window.open("https://www.instagram.com/", "_blank")} className="m-0">Instagram</p>
                        <p onClick={() => window.open("https://www.youtube.com/", "_blank")} className="m-0">Youtube</p>
                    </div>
                )}
                {/* Contact */}
                {config.show?.contact !== false && (
                    <div className="my-[2vh]">
                        <p className="">{store?.contact.email}</p>
                        <p className="">{formatPhoneNumber(store?.contact.phone ?? 'N/A')}</p>
                    </div>
                )}
            </div>
            {/* Copyright */}
            <footer className="w-full text-center py-8 text-gray-600 text-sm border-t mt-6">
                © {new Date().getFullYear()} The Mall — Concept by The Mall Team.
            </footer>
        </div>
    )
}

export default FastFoodFooter;