export const defaultHeroWithButtonBetweenImages = {
    variation: "heroWithButtonBetweenImages",
    background: {
        color: "white",
    },
    fontFamilly: "Open Sans",
    topDiv: {
        display: true,
        text: {
            style: {
                fontFamily: "Open Sans",
                input: "",
                fontSize: {
                    mobile: "3em",
                    desktop: "3em",
                },
                color: "black",
                weight: "semibold",
            },
        }
    },
    images:{
        animation: {
            image1: "leftToRight",
            image2: "rightToLeft",
        },
        imageUrl: [
            "https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100115.png",
            "https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100200.png"
        ],
        url: {
            image1: "https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100115.png",
            image2: "https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100200.png",
        }
    },
    midDiv: {
        background: {},
        backgroundColor: "#f7e9e4",
        animation: "leftToRight",
        text: {
            style: {
                input: "Discover Our Store. We have nice stuff.",
                fontFamily: "Open Sans",
                fontSize: {
                    mobile: "2em",
                    desktop: "3em",
                },
                color: "black",
            },
        },
        button: {
            function: "orderNow",
            style: {
                text: {
                    input: "Order Now",
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