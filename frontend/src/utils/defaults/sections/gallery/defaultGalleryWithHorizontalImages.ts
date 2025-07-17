export const defaultGalleryWithHorizontalImagesConfig = {
    variation: "galleryWithHorizontalImages",
    sliderVariation: "stopAndGo",
    background: {
        color: "blue",
        width: {
            mobile: "50vw",
            desktop: "50vw",
        },
        height: {
            mobile: "50vh",
            desktop: "60vh",
        },
        padding: {
            x: "10px",
            y: "100px",
        },
        margin: {
            mobile: "0",
            desktop: "0",
        }
    },
    heading: {
        show: false,
        position: "center",
        input: "Gallery",
        fontFamily: "Open Sans",
        fontSize: {
            mobile: "20px",
            desktop: "28px",
        },
        color: "white",
        fontWeight: "normal",
        fontStyle: "normal",
        marginBottom: "50px",
        background: {}
    },
    subheading: {
        show: false,
        position: "center",
        input: "Gallery",
        fontFamily: "Open Sans",
        fontSize: {
            mobile: "20px",
            desktop: "28px",
        },
        color: "white",
        fontWeight: "normal",
        fontStyle: "normal",
        background: {},
    },
    slider: {
        background: {
            color: "transparent",
            height: {
                mobile: "150px",
                desktop: "200px",
            },
            width: {
                mobile: "150px",
                desktop: "200px"
            },
            border: {
                width: "1px",
                color: "white",
                style: "solid",
                radius: "100%"
            },
            margin: "2px",
        },
        text: {
            title: {
                show: true,
                position: "center"
            },
            description: {
                show: true,
                position: "center"
            }
        },
        hover: {
            background: {
                color: "black",
                opacity: "30%"
            },
            viewButton: {
                text: {
                    fontFamily: "Open Sans",
                    fontSize: "10px",
                    color: "black",
                    fontWeight: "normal",
                    fontStyle: "normal",
                },
                background: {
                    height: "13%",
                    width: "50%",
                    color: "white",
                    shadow: true,
                    border: {
                        width: "2px",
                        color: "black",
                        style: "solid",
                        radius: "50%"
                    },
                }
            },
            descriptionText: {
                show: true,
                style: {
                    fontFamily: "Open Sans",
                    fontSize: "10px",
                    color: "white",
                    fontWeight: "normal",
                    fontStyle: "normal",
                }
                
            }
        },
        image: {
            background: {
                height: {
                    mobile: "80%",
                    desktop: "100%"
                }, 
                padding: {
                    x: "10px",
                    y: "10px"
                }
            },
            images: {
                image1: {
                    url: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100115.png"],
                    title: "",
                    description: "",
                },
                image2: {
                    url: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100115.png"],
                    title: "",
                    description: "",
                },
            }
        }
    }
}