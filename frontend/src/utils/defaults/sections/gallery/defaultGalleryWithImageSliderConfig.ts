export const defaultGalleryWithImageSliderConfig = {
    variation: "galleryWithImageSlider",
    sliderVariation: "stopAndGo",
    background: {
        color: "blue",
    },
    text: {
        heading: {
            input: "Selected Work",
            position: "center",
            fontSize: {
                mobile: "35px",
                desktop: "35px",
            },
            fontFamily: "Patrick Hand",
            color: "brown",
            lineHeight: "1.3",
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
            input: "Some work",
            position: "center",
            fontSize: {
                mobile: "35px",
                desktop: "35px",
            },
            fontFamily: "Patrick Hand",
            color: "brown",
            lineHeight: "1.3",
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