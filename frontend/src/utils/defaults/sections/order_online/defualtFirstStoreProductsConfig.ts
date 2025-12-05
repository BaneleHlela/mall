import { defaultFirstStoreProductModal } from "../../extras/defaultFirstStoreProductModal";

export const defaultFirstStoreProductsConfig = {
    variation: "firstStoreProducts",
    background: {
        color: "white",
        width: {
            mobile: "100%",
            desktop: "80%",
        }
    },
    image: {
        display: true,
        url: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100115.png"],
    },
    title: {
        input: "Order Online",
        position: "center",
        fontSize: {
            mobile: "2rem",
            desktop: "3rem",
        },
        fontWeight: "bold",
        fontFamily: "Patrick Hand",
        color: "#1f2937",
    },
    shortDescription: {
        input: "You can order online! Browse our menu items and choose what you’d like to order from us.",
        position: "center",
        fontSize: {
            mobile: "1.1rem",
            desktop: "1.35rem",
        },
        color: "#4b5563",
        fontFamily: "Patrick Hand",
    },
    acceptingOrdersButton: {
        position: "center",
        text: {
            fontFamily: "Patrick Hand",
            color: "black",
            fontSize: "1rem",
        },
        background: {
            color: "white",
        },
    },
    productsDisplay: {
        grid: {
            columns: {
                mobile: 2,
                desktop: 5,
            },
            gap: {
                mobile: "5px",
                desktop: "30px",
            },
        }
    },
    categorySelector: {
        show: true,
        text: {
            fontFamily: "Patrick Hand",
            fontSize: "1.5rem",
            color: "#4b5563",
            fontWeight: "bold",
        },
        width: {
            mobile: "100%",
            desktop: "70%",
        },
        alignment: "center",
        underlineColor: "secondary",
        selectedColor: "secondary",
        unselectedColor: "primary",
    },
    productCard: {
        text: {
            productName: {
                position: "center",
                fontFamily: "Patrick Hand",
                weight: "bold",
                color: "brown",
                fontSize: {
                    mobile: "1.1rem",
                    desktop: "1.35rem",
                },
            },
            productDescription: {
                position: "center",
                fontFamily: "Patrick Hand",
                weight: "normal",
                color: "#4b5563",
                fontSize: {
                    mobile: "1rem",
                    desktop: "1.15rem",
                },
            },
            productPrice: {
                position: "center",
                fontFamily: "Patrick Hand",
                weight: "bold",
                color: "brown",
                fontSize: {
                    mobile: "1.1rem",
                    desktop: "1.35rem",
                },
            }
        },
        background: {
            color: "white",
            border: {
                width: "1px",
                style: "solid",
                color: "lightgrey",
            },
        },
    },
    productModal: defaultFirstStoreProductModal,
}