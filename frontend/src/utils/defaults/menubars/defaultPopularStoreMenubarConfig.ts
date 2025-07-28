import { defaultStoreAlertDivConfig } from "../extras/defaultStoreAlertDivConfig";

export const defaultPupularStoreMenubarConfig = {
    variation: "popular",
    alertDiv: defaultStoreAlertDivConfig,
    background: {
        height: {
            mobile: "8vh",
            desktop: "8vh",
        },
        color: "white",
        shadow: true,
        border: {
            width: "3px",
            style: "solid",
            color: "black",
            radius: "0px",
        },
        padding: {
            x: {
                mobile: "0px",
                desktop: "0px",
            },
            y: {
                mobile: "0px",
                desktop: "0px",
            }
        }
    },
    cart: {
        variation: "shoppingbagsolid",
        size: 42,
        color: "black",
        background: {
            padding: {
                x: "0px",
                y: "0px" 
            },
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
    },
    topbar: {
        sticky: true,
        desktop: {
            position: "sticky",
            order: [ "logo", "links", "icons", ],
            logo: {
                use: "logo",
                background: {
                    width: "180px",
                    height: "auto",
                    padding: {
                        x: "0px",
                        y: "0px",
                    },
                    color: "",
                    border: {
                        width: "0px",
                        style: "solid",
                        color: "brown",
                    },
                },
                text: {
                    input: "Popular Store",
                    fontFamily: "Open Sans",
                    color: "brown",
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    letterSpacing: "0px",
                }
            },
            links: {
                text: {
                    position: "center",
                    fontFamily: "Open Sans",
                    color: "brown",
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    letterSpacing: "0px",
                },
                background: {
                    color:  "",
                    border: {
                        width: "0px",
                        style: "solid",
                        color: "lightblue",
                        radius: "0x"
                    },
                    padding: {
                        x: {
                            mobile: "0px",
                            desktop: "0px",
                        },
                        y: {
                            mobile: "15px",
                            desktop: "15px",
                        }
                    }
                },
                allLinksBackground: {
                    color:  "",
                    border: {
                        width: "0px",
                        style: "solid",
                        color: "lightblue",
                        radius: "0x"
                    },
                    padding: {
                        x: {
                            mobile: "0px",
                            desktop: "0px",
                        },
                        y: {
                            mobile: "15px",
                            desktop: "15px",
                        }
                    }
                }
            },
            extras: {
                include: "icons",
                button: {
                    function: "bookNow",
                    style: {
                        text: {
                            input: "Get a quote",
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
                                x: {
                                    mobile: "0px",
                                    desktop: "0px",
                                },
                                y: {
                                    mobile: "15px",
                                    desktop: "15px",
                                }
                            }
                        }
                    }
                },
                icons: {
                    number: 3,
                    platforms: {
                        first: "whatsapp",
                        second: "phone",
                        third: "twitter",
                    },
                    size: "3.5vh",
                    color: "#6c4d37",
                    background: {
                        color: "",
                        border: {
                            width: "0px",
                            style: "solid",
                            color: "brown",
                        },
                    },
                    iconBackground: {
                        padding: {
                            x: "0px",
                            y: "0px"
                        },
                        backgroundColor: "",
                        border: {
                            width: "0px",
                            style: "solid",
                            color: "brown",
                        },
                    }
                }
            },
            icons: {
                display: true,
                show: ["phone", "twitter", "whatsapp"],
                size: 22,
                color: "#6c4d37",
                background: {
                    color: "",
                    border: {
                        width: "0px",
                        style: "solid",
                        color: "brown",
                    },
                },
                iconBackground: {
                    padding: {
                        x: "0px",
                        y: "0px"
                    },
                    backgroundColor: "",
                    border: {
                        width: "0px",
                        style: "solid",
                        color: "brown",
                    },
                }
            },
            iconsCart: {
                iconsFirst: true,
                spaceX: "10px"
            },
            iconsFirst: false,
        },
        mobile: {
            position: "sticky",
            hamburgerFirst: true, 
            display: "extras",
            logo: {
                use: "logo",
                background: {
                    width: "180px",
                    height: "auto",
                    padding: {
                        x: "0px",
                        y: "0px",
                    },
                    color: "",
                    border: {
                        width: "0px",
                        style: "solid",
                        color: "brown",
                    },
                },
                text: {
                    input: "Popular Store",
                    fontFamily: "Open Sans",
                    color: "brown",
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    letterSpacing: "0px",
                }
            },
            extras: {
                include: "icons",
                button: {
                    function: "bookNow",
                    style: {
                        text: {
                            input: "Get a quote",
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
                icons: {
                    number: 3,
                    platforms: {
                        first: "whatsapp",
                        second: "phone",
                        third: "twitter",
                    },
                    size: 22,
                    color: "#6c4d37",
                    background: {
                        color: "",
                        border: {
                            width: "0px",
                            style: "solid",
                            color: "brown",
                        },
                    },
                    iconBackground: {
                        padding: {
                            x: "0px",
                            y: "0px"
                        },
                        backgroundColor: "",
                        border: {
                            width: "0px",
                            style: "solid",
                            color: "brown",
                        },
                    }
                },
            },
            hamburger: {
                variation: "rotate",
                size: 32,
                color: "black",
                background: {
                    padding: {
                        x: "0px",
                        y: "0px",
                    },
                    color: "",
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
                border: {
                    width: "0px",
                    style: "solid",
                    color: "brown",
                },
            },
        },
        extras: {
            include: "icons",
            button: {
                function: "bookNow",
                style: {
                    text: {
                        input: "Get a quote",
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
                    }
                }
            },
            icons: {
                number: 3,
                platforms: {
                    first: "whatsapp",
                    second: "phone",
                    third: "twitter",
                },
                size: 22,
                color: "#6c4d37",
                background: {
                    color: "",
                    border: {
                        width: "0px",
                        style: "solid",
                        color: "brown",
                    },
                },
                iconBackground: {
                    padding: {
                        x: "0px",
                        y: "0px"
                    },
                    backgroundColor: "",
                    border: {
                        width: "0px",
                        style: "solid",
                        color: "brown",
                    },
                }
            },
        },
    }
}


