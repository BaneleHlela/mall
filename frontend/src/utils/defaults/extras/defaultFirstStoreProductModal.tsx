import { Description } from "@headlessui/react";

export const defaultFirstStoreProductModal = {
    exitButton: {
        color: "brown",
        backgroundColor: "white",
    },
    text: {
        productName: {
            mobile: {
                fontFamily: "Patrick Hand",
                fontSize: "2em",
                color: "brown",
                fontWeight: "600",
            },
            desktop: {
                fontFamily: "Patrick Hand",
                fontSize: "2.5em",
                color: "brown",
                fontWeight: "600",
            }
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
        titleInput: "Special request",
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