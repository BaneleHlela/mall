
export const defaultPopularProductsSectionConfig = {
    variation: "productsSectionPopular",
    background: {
        image: [],
        color: "white",
        width: {
            mobile: "100%",
            desktop: "80%",
        },
        padding: {
            x: "10px",
            y: "100px",
        }
    },
    text: {
        heading: {
            input: "Our Services",
            fontSize: {
                mobile: "40px",
                desktop: "50px",
            },
            fontWeight: "bold",
            color: "black",
            position: "center",
            underline: {
                show: true,
                color: "black",
                width: "50%",
                style: "solid",
                thickness: "10px",
                marginTop: "10px",
            }
        },
        subheading: {
            show: true,
            animation: "fade",
            input: "We Provide High-Quality Products and Services",
            fontSize: {
                mobile: "20px",
                desktop: "25px",
            },
            fontWeight: "normal",
            color: "black",
            position: "center",
            textAlign: "center",
            underline: {
                show: false,
                color: "black",
                width: "50%",
                style: "solid",
                thickness: "10px",
                marginTop: "10px",
            }
        },
    },
    stack: {
        mobile: "horizontal",
        desktop: "horizontal",
    },
    grid: {
        container: {
            background: {
                position: "center",
                width: {
                    mobile: "100%",
                    desktop: "80%",
                },
            },
            stepIndicator: {
                use: "dots",
                background: {
                    height: {
                        mobile: "2px",
                        desktop: "2px",	
                    }
                },
                text: {},
            },
            toggleButtons: {
                background: {
                    color: "transparent",
                }
            },
        },
        columns: {
            mobile: 1,
            desktop: 3,
        },
        gap: {
            mobile: "5px",
            desktop: "0px",
        },
    },
    categorySelector: {
        show: false,
        text: {
            fontFamily: "Patrick Hand",
            fontSize: {
                mobile: "1.1em",
                desktop: "1.5em",
            },
            color: "#4b5563",
            fontWeight: "bold",
        },
        width: {
            mobile: "100%",
            desktop: "70%",
        }
    },
    card: {
        variaton: "popularProductCard",
        stack: {
            mobile: "column",
            desktop: "row",
        },
        background: {
            color: "white",
            height: {
                mobile: "200px",
                desktop: "250px",
            },
            border: {
                width: "1px",
                color: "black",
                style: "solid",
                radius: "10px"
            }
        },
        image: {
            urls: [],
            height: {
                mobile: "50%",
                desktop: "100%",
            },
            width: {
                mobile: "100%",
                desktop: "50%",
            },
            border: {
                width: "1px",
                color: "black",
                style: "solid",
                radius: "10px"
            }
        },
        markingButton: {
            background: {
                color: "black",
                padding: {
                    x: "10px",
                    y: "5px",
                },
                border: {}
            },
            text: {},
        },
        textAndButton: {
            background: {
                padding: {
                    x: "1rem",
                    y: "1rem",
                }
            },
            text: {
                fontFamily: "Patrick Hand",
                fontSize: {
                    mobile: "1.5rem",
                    desktop: "2rem",
                },
                color: "black",
                fontWeight: "bold",
                underline: {
                    show: true,
                    color: "black",
                    width: "50%",
                    style: "solid",
                    thickness: "2px",
                    marginTop: "10px",
                },
                name: {
                    fontSize: {
                        mobile: "1.5rem",
                        desktop: "2rem",
                    },
                    color: "black",
                    fontWeight: "bold",
                    underline: {
                        show: true,
                        color: "black",
                        width: "50%",
                        style: "solid",
                        thickness: "2px",
                        marginTop: "10px",
                    }
                },
            },
            button: {
                show: {
                    mobile: "never",
                    desktop: "on-hover",
                },
                function: "bookAppointment",
                style: {
                    text: {
                        input: "Book an Appointment",
                        fontFamily: "Open Sans",
                        color: "white",
                        fontSize: ".85em",
                        fontWeight: "bold",
                        letterSpacing: "0px",
                    },
                    background: {
                        height: "",
                        width: "70%",
                        color: "black",
                        shadow: true,
                        border: {
                            width: "0px",
                            style: "solid",
                            color: "black",
                            radius: "0px",
                        },
                        padding: {
                            x: "6px",
                            y: "8px",
                        }
                    }
                },         
            }
        }
    }
}