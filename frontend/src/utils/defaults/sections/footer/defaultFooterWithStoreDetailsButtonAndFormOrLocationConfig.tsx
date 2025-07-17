export const defaultFooterWithStoreDetailsButtonAndFormOrLocationConfig = {
    variation: "footerWithStoreDetailsButtonAndFormOrLocation",
    show: "location",
    background: {
        width: {
            mobile: "80%",
            desktop: "80%",
        },
        height: {
            mobile: "100%",
            desktop: "100%",
        },
        color: "#f9d195",
    },
    button: {
        show: true,
        function: "buyNow",
        style: {
            text: {
                input: "Buy Now",
                fontFamily: "Open Sans",
                color: "brown",
                fontSize: "1.2em",
                fontWeight: "bold",
                letterSpacing: "0px",
            },
            background: {
                height: "10px",
                width: "190px",
                color: "#f9d195",
                shadow: true,
                border: {
                    width: "3px",
                    style: "solid",
                    color: "black",
                    radius: "0px",
                },
                padding: {
                    x: "0.8rem",
                    y: "50px",
                }
            }
        }
    },
    title: {
        text: {
            input: "Xhumana Nathi",
            fontFamily: "Open Sans",
            fontSize: {
                mobile: "2.2em",
                desktop: "2.8em",
            },
            color: "white",
            fontWeight: "normal",
            fontStyle: "normal",
        },
        position: "left",
    },
    inputs: {
        address: "i-Address",
        contact: "ezinkundleni",
        openingHours: "Operating Times"
    },
    detailsTitle: {
        fontFamily: "Open Sans",
        fontSize: {
            mobile: "1.6em",
            desktop: "2em",
        },
        color: "black",
        fontWeight: "normal",
        fontStyle: "normal",
    },
    detailsText: {
        fontFamily: "Open Sans",
        fontSize: {
            mobile: "1em",
            desktop: "1.2em",
        },
        color: "black",
        fontWeight: "normal",
        fontStyle: "normal",
    },
    sendEmailText: {
        fontFamily: "Open Sans",
        fontSize: "1em",
        color: "green",
        fontStyle: "normal",
    },
    sendEmailBorder: {
        width: "2px",
        style: "solid",
        color: "#d1d5db",
        radius: "0",
    },
    sendEmailForm: {
        variation: "elegant",
        background: {
            color: "white",
            shadow: true,
            border: {
                width: "3px",
                style: "solid",
                color: "black",
                radius: "0px",
            },
            width: {
                mobile: "100%",
                desktop: "80%",
            },
            height: {
                mobile: "100%",
                desktop: "fit-content",
            },
            padding: {
                x: "1rem",
                y: "1rem",
            },
            senderInfo:{
                border: {
                    width: "1px",
                    style: "solid",
                    color: "black",
                    radius: "0px",
                }
            }
        },
        text: {
            title: {
                show: false,
                input: "Send Us An Email",
                position: "end",
                fontFamily: "Open Sans",
                fontSize: {
                    mobile: "1.6em",
                    desktop: "2em",
                },
                color: "black",
                fontWeight: "bold",
                fontStyle: "normal",
            },
            senderInfo: {
                position: "center",
                fontFamily: "Open Sans",
                fontSize: "15px",
                color: "grey",
            }
        },
        submitButton: {
            position: "end",
            text: {
                input: "Submit",
                fontFamily: "Open Sans",
                color: "brown",
                fontSize: "1.2em",
                fontWeight: "bold",
                letterSpacing: "0px",
            },
            background: {
                height: "",
                width: "50%",
                color: "#f9d195",
                shadow: true,
                border: {
                    width: "3px",
                    style: "solid",
                    color: "black",
                    radius: "0px",
                },
                padding: {
                    x: "0.8rem",
                    y: "5px",
                }
            }
        }
    },
    location: {
        height: {
            mobile: "100%",
            desktop: "80%",
        },
        width: {
            mobile: "100%",
            desktop: "100%",
        }
    }
};