import { Description } from "@headlessui/react";

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
    text: {
        exit: {
            background: {}
        },
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
        },
        toggleButton: {
            text: {},
            background: {}
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
                    desktop: "0px",
                },  
            },
        },
        text: {
            labels: {
                color: "red",
                position: "center"
            },
        },
        nameAndPrice: {
            background: {
                height: {
                    mobile: "10%",
                    desktop: "20%",
                },
                position: "center"
            },
            name: {
                fontFamily: "Open Sans",
                fontSize: {
                    mobile: "10px",
                    desktop: "20px"
                },
                underline: {
                    show: false,
                    color: "black",
                    width: "50%",
                    style: "solid",
                    thickness: "10px",
                    marginTop: "10px",
                }
            },
            price: {
                fontFamily: "Open Sans",
                fontSize: {
                    mobile: "10px",
                    desktop: "20px"
                },
                underline: {
                    show: false,
                    color: "black",
                    width: "50%",
                    style: "solid",
                    thickness: "10px",
                    marginTop: "10px",
                }
            }
        },
        variationSelector: {
            text: {
                label: {
                    input: "Color",
                },
                dropdown: {
                    color: "red",
                },
            },
            background: {
                container: {
                    padding: {
                        x: {
                            desktop: "20px",
                            mobile: "10px",
                        },
                        y: {
                            mobile: "10px",
                            desktop: "10px",
                        },  
                    },
                },
                button: {
                    color: "white"
                },
                dropdown: {
                    color: "orange"
                }
            }
        },
        messageBox: {
            show: true,
            text: {
                color: "blue",
            },
            titleInput: {
                input: "Special Request",
            },
            placeholder: { 
                textArea: "Sozama ngokusemandleni",
            },
            background: {
                container: {
                    padding: {
                        x: {
                            desktop: "20px",
                            mobile: "10px",
                        },
                        y: {
                            mobile: "10px",
                            desktop: "10px",
                        },  
                    },
                },
                box: {
                    border: {
                        width: "2px",
                        style: "solid",
                        color: "brown",
                    },
                },
            },
            
        },
        quantityUpdater: {
            text: {
                color: "brown",
                fontSize: "2.5vh",
            },
            background: {
                container: {
                    position: "start",
                    padding: {
                        x: {
                            desktop: "20px",
                            mobile: "10px",
                        },
                        y: {
                            mobile: "10px",
                            desktop: "10px",
                        },  
                    },
                },
                button: {
                    color: "orange",
                    padding: {
                        x: "10px",
                        y: "10px",
                    }
                }
            },
        },
        addToCartBtn: {
            position: "start",
            style: {
                background: {
                    color: "orange",
                    width: {
                        mobile: "50%",
                        desktop: "50%"
                    },
                    padding: {
                        x: "10px",
                        y: "10px",
                    }
                },
                text: {
                    fontSize: "2.5vh",
                    color: "white",
                },
            }
        },
        description: {
            background: {
                color: "pink",
            },
            text: {
                fontSize: "2.5vh"
            }
        }
    }
}