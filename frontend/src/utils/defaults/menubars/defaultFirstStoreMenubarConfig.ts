export const defaultFirstStoreMenubarConfig = {
    background: {
        height: {
            mobile: "250px",
            desktop: "450px",
        },
        color: "#f9d195",
        shadow: true,
    },
    cart: {
        variation: "paperbag",
        size: 42,
        color: "#6c4d37",
        background: {
            padding: "0px",
            backgroundColor: "",
            border: {
                width: "0px",
                style: "solid",
                color: "brown",
            }
        },
        count: {
            backgroundColor: "#000",
            color: "#fff",
            border: {
                width: "0px",
                style: "solid",
                color: "brown",
                radius: "0",
            }, 
            scale: 1.3,
        },
        shadow: true,
    },
    hamburger: {
        variation: "rotate",
        size: 32,
        color: "#6c4d37",
        background: {
            padding: "0px",
            backgroundColor: "",
            border: {
                width: "0px",
                style: "solid",
                color: "gray",
                radius: "0px",
            },
        },
        shadow: false,
        direction: "left",
    },
    topbar: {
        logo: {
            desktop: {
                scale: .8,
                width: "150px",
                height: "auto",
                padding: "0px",
                backgroundColor: "",
                border: {
                    width: "0px",
                    style: "solid",
                    color: "brown",
                },
            },
            mobile: {
                scale: 1,
                width: "150px",
                height: "auto",
                padding: "0px",
                backgroundColor: "",
                border: {
                    width: "0px",
                    style: "solid",
                    color: "brown",
                },
            }
        },
        icons: {
            display: true,
            show: ["phone", "twitter", "whatsapp"],
            size: 32,
            color: "#6c4d37",
            background: {
                padding: "0px",
                backgroundColor: "",
                border: {
                    width: "0px",
                    style: "solid",
                    color: "brown",
                },
            },
            iconBackground: {
                padding: "0px",
                backgroundColor: "",
                border: {
                    width: "0px",
                    style: "solid",
                    color: "brown",
                },
            }
        },
        links: {
            text: {
                fontFamily: "Open Sans",
                color: "brown",
                fontSize: "1.2em",
                fontWeight: "bold",
                letterSpacing: "0px",
            },
            background: {
                backgroundColor:  "white",
                border: {
                    width: "5px",
                    style: "solid",
                    color: "lightblue",
                    redius: "0x"
                },
                padding: {
                    x: "5px",
                    y: "0px",
                }
            },
        }
    },
    sidebar: {
        animation: "fade",
        backgroundColor: "#f9d195",
        logo: {
            display: false,       
        },
        links: {
            alignment: "center",
            text: {
                fontFamily: "Patrick Hand",
                color: "brown",
                fontSize: "1.5em",
                fontWeight: "bold",
                letterSpacing: "0px",
            },
            background: {
                padding: "10px",
                border: {
                    width: "0px",
                    style: "solid",
                    color: "brown",
                },
            },
        },
        icons: {
            display: true,
            show: ["phone", "twitter", "whatsapp"],
            size: 32,
            color: "#6c4d37",
            background: {
                padding: "0px",
                backgroundColor: "",
                border: {
                    width: "0px",
                    style: "solid",
                    color: "brown",
                },
            },
            iconBackground: {
                padding: "0px",
                backgroundColor: "",
                border: {
                    width: "0px",
                    style: "solid",
                    color: "brown",
                },
            }
        }
    }
}


