export const defaultFourthStoreHeroConfig = {
    heading: {
        mobile: {
            main: {
                text: "Quality Roofing Solutions",
                fontSize: "3em",
                fontWeight: "bold",
                color: "black",
                textAlign: "center",
                textShadow: true,
            },
            subheading: {
                text: "Durable, Reliable, and Professional",
                fontSize: "1.5em",
                fontWeight: "normal",
                color: "black",
                textAlign: "center",
                textShadow: true,
            }
        },
        desktop: {
            main: {
                text: "Quality Roofing Solutions ",
                fontSize: "7em",
                fontWeight: "semibold",
                color: "black",
                textAlign: "center",
                textShadow: true,
            },
            subheading: {
                text: "Durable, Reliable, and Professional",
                fontSize: "2.5em",
                fontWeight: "normal",
                color: "black",
                textAlign: "center",
                textShadow: true,
            }
        },
    },
    reviewsCard: {
        placement: "left",
        background: {
            backgroundColor: "#005003",
            height: {
                mobile: "200px",
                desktop: "250px",
            },
            border: {
                width: "0px",
                color: "black",
                style: "solid",
                radius: "15px",
            }
        },
        starsDisplay: {
            type: "sharp",
            color: "white",
            size: "22px",
        },
        text: {
            fontFamily: "Open Sans",
            color: "white",
            fontWeight: "bold",
            totalRatings: {
                mobile: {
                    fontSize: "3em",
                },
                desktop: {
                    fontSize: "5em",
                },
            },
            comment: {
                input: "Reviews",
                style: {
                    fontSize: "1.2em",
                },
            }
        }
    }
};