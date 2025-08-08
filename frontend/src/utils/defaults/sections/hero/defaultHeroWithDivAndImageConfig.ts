export const defaultHeroWithDivAndImageConfig = {
    imageFirst: {
        mobile: false,
        desktop: false,
    },
    background: {
        height: {
            mobile: "50vh",
            desktop: "100vh",
        },
        width: {
            mobile: "100%",
            desktop: "100%",
        },
        color: "black",
        container: {
            color: "orange",
            width: {
                mobile: "100%",
                desktop: "40%",
            },
            height: {
                mobile: "50%",
                desktop: "100%",
            },
        },
    },
    image: {
        url: {
            mobile: [],
            desktop: [],
        },
    },
    text: {
        firstLine: {
            show: true,
            input: "I am text A",
            fontFamily: "Open Sans",
            fontWeight: "bold",
            fontSize: {
                mobile: "1em",
                desktop: "1.2em",
            }
        },
        secondLine: {
            show: true,
            input: "I am text B",
            fontFamily: "Open Sans",
            fontWeight: "bold",
            fontSize: {
                mobile: "1em",
                desktop: "1.2em",
            }
        },
        thirdLine: {
            show: true,
            input: "I am text C",
            fontFamily: "Open Sans",
            fontWeight: "bold",
            fontSize: {
                mobile: "1em",
                desktop: "1.2em",
            }
        },
    },
    button: {
        function: "buyNow",
        show: true,
        style: {
            text: {
                input: "Buy Now",
                fontFamily: "Open Sans",
                color: "brown",
                fontSize: "1.2em",
                fontWeight: "bold",
                letterSpacing: "0px",
            },
            background: {
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
        
}