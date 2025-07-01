import { Description } from "@headlessui/react";

export const defaultFirstStoreProductModal = {
    exitButton: {
        color: "brown",
        background: {
            color: "white",
            shadow: true,
        },
        
    },
    text: {
        productName: {
            fontFamily: "Patrick Hand",
            fontSize: {
                mobile: "2em",
                desktop: "2.5em",	
            },
            color: "brown",
            fontWeight: "600",
        },
        description: {
            fontFamily: "Patrick Hand",
            fontSize: "1.1em",
            color: "brown",
            fontWeight: "600",
        },
        rest: {
            fontFamily: "Patrick Hand",
            fontSize: "1.1em",
            color: "brown",
            fontWeight: "600",
        },  
        textCenter: false,
        addToCartBtn: {
            fontFamily: "Patrick Hand",
            fontSize: "22px",
            color: "white",
            fontWeight: "600",
        },
    },
    messageBox: {
        show: true,
        titleInput: "Special request",
        placeholder: "Sozama ngokusemandleni",
        border: {
            width: "2px",
            style: "solid",
            color: "brown",
        },
    },  
    cartUpdator: {
        color: "brown",
        border: {
            width: "2px",
            style: "solid",
            color: "brown",
            radius: "0px"
        },
    },
    addToCartBtn: {
        border: {
            style: "solid",
            color: "brown",
            radius: "0px"
        },
        backgroundColor: "#3bbdf5",
    }
};