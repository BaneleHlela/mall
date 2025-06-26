export const defaultPupularStoreMenubarConfig = {
    variation: "popular",
    extras: {
        include: "icons",
        button: {
            function: "bookNow",
        },
        icons: {
            number: 3,
            platforms: {
                first: "whatsapp",
                second: "phone",
                third: "twitter",
            }
        }
    },
    include: "button",
    background: {
        height: {
            mobile: "110px",
            desktop: "120px", // Sometimes without responsive handlers
        },
        width: {
            mobile: "110px",
            desktop: "120px",
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
            x: "1px",
            y: "1px",
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
        icons: {
            show: ["phone", "twitter", "whatsapp"],
        },
        desktop: {
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
                        redius: "0x"
                    },
                    padding: {
                        y: "15px",
                        x: "0px",
                    }
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
        display: "icons",
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
                padding: {
                    x: "10px",
                    y: "10px"
                },
                border: {
                    width: "0px",
                    style: "solid",
                    color: "brown",
                },
            },
        },
        icons: {
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
    }
}


