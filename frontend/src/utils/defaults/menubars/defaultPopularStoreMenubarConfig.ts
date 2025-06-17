export const defaultPupularStoreMenubarConfig = {
    background: {
        height: {
            mobile: "110px",
            desktop: "120px",
        },
        color: "white",
        shadow: true,
        bottomBorder: {
            width: "3px",
            style: "solid",
            color: "black",
        }
    },
    cart: {
        variation: "shoppingbagsolid",
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
    topbar: {
        icons: {
            show: ["phone", "twitter", "whatsapp"],
        },
        desktop: {
            order: [ "logo", "links", "icons", ],
            logo: {
                scale: .5,
                width: "250px",
                height: "auto",
                padding: "0px",
                backgroundColor: "",
                border: {
                    width: "0px",
                    style: "solid",
                    color: "brown",
                },
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
                    backgroundColor:  "",
                    border: {
                        width: "0px",
                        style: "solid",
                        color: "lightblue",
                        redius: "0x"
                    },
                    padding: {
                        y: "15px",
                        x: "0px",
                    }
                },
            },
            icons: {
                display: true,
                show: ["phone", "twitter", "whatsapp"],
                size: 22,
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
            iconsCart: {
                iconsFirst: false,
                spaceX: "10px"
            },
            iconsFirst: false,
        },
        mobile: {
            hamburgerFirst: true,
            logo: {
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
            icons: {
                display: false,
                show: ["phone", "twitter", "whatsapp"],
                size: 22,
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
        },
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


