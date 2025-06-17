export const defaultThirdStoreHeroConfig = {
    background: {
        backgroundColor: "white",
    },
    fontFamilly: "Open Sans",
    topDiv: {
        display: true,
        text: {
            input: "",
            style: {
                mobile: {
                    fontFamily: "Open Sans",
                    fontSize: "2em",
                    color: "black",
                },
                desktop: {
                    fontFamily: "Open Sans",
                    fontSize: "2em",
                    color: "black",
                }
            }
        }
    },
    images:{
        animation: {
            image1: "leftToRight",
            image2: "rightToLeft",
        },
        url: {
            image1: "https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100115.png",
            image2: "https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100200.png",
        }
    },
    midDiv: {
        backgroundColor: "#f7e9e4",
        animation: "leftToRight",
        text: {
            input: "Discover Our Store",
            style: {
                mobile: {
                    fontSize: "2em",
                    color: "black",
                    fontWeight: "600",
                },
                desktop: {
                    fontSize: "2em",
                    color: "black",
                    fontWeight: "bold",
                }
            }
        },
        button: {
            backgroundColor: "white",
            text: {
                input: "Call now",
                style: {
                    fontSize: "1.3em",
                    color: "black",  
                },
            },
            border: {
                width: "0px",
                style: "solid",
                color: "black",
            },
            padding: {
                y: "50px",
                x: "0.8rem",
            },
        }
    }
}