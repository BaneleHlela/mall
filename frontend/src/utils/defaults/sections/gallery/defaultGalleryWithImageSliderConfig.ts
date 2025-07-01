export const defaultGalleryWithImageSliderConfig = {
    variation: "galleryWithImageSlider",
    sliderVariation: "stopAndGo",
    background: {
        color: "blue",
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
        }
    }
    
}