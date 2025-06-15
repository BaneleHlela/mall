import { defaultFirstStoreProductModal } from "../../extras/defaultFirstStoreProductModal";

export const defaultFirstStoreOrderOnlineCongig = {
    variation: "firstOrderOnline",
    backgroundColor: "white",
    image: {
        display: true,
        url: "https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100115.png",
    },
    title: {
        input: "Order Online",
        style: {
            mobile: {
                fontSize: "2rem",
                fontWeight: "bold",
                fontFamily: "Patrick Hand",
                color: "#1f2937",
            },
            desktop: {
                fontSize: "2.5rem",
                fontWeight: "bold",
                fontFamily: "Patrick Hand",
                color: "#1f2937",
            },
        },
    },
    shortDescription: {
        input: "You can order online! Browse our menu items and choose what you’d like to order from us.",
        style: {
            mobile: {
                fontSize: "1.1rem",
                color: "#4b5563",
                fontFamily: "Patrick Hand",
            },
            desktop: {
                fontSize: "1.35rem",
                color: "#4b5563",
                fontFamily: "Patrick Hand",
            },
        },
    },
    acceptingOrdersButton: {
        fontFamily: "Patrick Hand",
    },
    categorySelector: {
        fontFamily: "Patrick Hand"
    },
    productCard: {
        border: {
            width: "2px",
            color: "grey",
        },
        fontFamily: "Patrick Hand",
        textCenter: false
    },
    productModal: defaultFirstStoreProductModal,
}