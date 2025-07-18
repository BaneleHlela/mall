import type { X } from "lucide-react";

export const defaultSingleProductSectionConfig = {
    variation: "firstSingleProductSection",
    background: {
        color: "orange",
        width: {
            mobile: "100%",
            desktop: "80%",
        },
        padding: {
            x: {
                desktop: "100px",
                mobile: "30px",
            },
            y: {
                mobile: "20px",
                desktop: "120px",
            },  
        }
    },
    images: {
        background: {
            color: "orange",
            width: {
                mobile: "100%",
                desktop: "100%",
            },
            height: {
                mobile: "100%",
                desktop: "100%"
            }
        }
    },
    details: {
        background: {
            color: "white",
            height: {
                mobile: "50vh",
                desktop: "80vh"
            },
            padding: {
                x: {
                    desktop: "100px",
                    mobile: "30px",
                },
                y: {
                    mobile: "20px",
                    desktop: "120px",
                },  
            },
        },
        nameAndPrice: {
            background: {
                spacing: {
                    y: {
                        mobile: "1vh",
                        desktop: "40vh",
                    },
                    x: {
                        mobile: "1vh",
                        desktop: "2.8vh",
                    }
                },
                height: {
                    mobile: "10%",
                    desktop: "20%",
                }
            }
        },
        variationSelector: {
            text: {
                input: "Color",
            }
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
        quantityUpdator: {
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
            color: "#3bbdf5",
        }
    }
}