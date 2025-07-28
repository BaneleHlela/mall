export const defaultHeroWithReviewCardAndEmailFormConfig = {
    variation: "heroWithReviewCardAndEmailForm",
    background: {
        image: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/686e76aa96f14c28650b671d/images/The%20works%20of%20my%20hands%20%C3%B0%C2%9F%C2%96%C2%A4078%20823%200301%20ennosm7@gmail.com.jpg"],
        color: "white",
        opacity: "50%",
    },
    text: {
        width: {
            mobile: "100%",
            desktop: "60%",
        },
        heading: {
            animation: "fade",
            input: "Quality Roofing Solutions",
            fontSize: {
                mobile: "35px",
                desktop: "35px",
            },
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
            textShadow: true,
        },
        subheading: {
            animation: "fade",
            input: "Durable, Reliable, and Professional",
            fontSize: {
                mobile: "35px",
                desktop: "35px",
            },
            fontWeight: "normal",
            color: "black",
            textAlign: "center",
            textShadow: true,
        },    
    },
    reviewsCard: {
        placement: "right",
        background: {
            color: "#005003",
            height: {
                mobile: "200px",
                desktop: "250px",
            },
            width: {
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
            totalRatings: {
                lineHeight: "",
                fontSize: {
                    mobile: "1em",
                    desktop: "1.5em",
                },
            },
            comment: {
                input: "Reviews",
                fontSize: "1.2em",
            }
        }
    },
    sendEmailForm: {
        variation: "elegant",
        background: {
            color: "white",
            shadow: true,
            border: {
                width: "3px",
                style: "solid",
                color: "black",
                radius: "0px",
            },
            width: {
                mobile: "100%",
                desktop: "80%",
            },
            height: {
                mobile: "100%",
                desktop: "fit-content",
            },
            padding: {
                x: "1rem",
                y: "1rem",
            },
            senderInfo:{
                border: {
                    width: "1px",
                    style: "solid",
                    color: "black",
                    radius: "0px",
                }
            }
        },
        text: {
            title: {
                show: false,
                input: "Send Us An Email",
                position: "end",
                fontFamily: "Open Sans",
                fontSize: {
                    mobile: "1.6em",
                    desktop: "2em",
                },
                color: "black",
                fontWeight: "bold",
                fontStyle: "normal",
            },
            senderInfo: {
                position: "center",
                fontFamily: "Open Sans",
                fontSize: "15px",
                color: "grey",
            }
        },
        submitButton: {
            position: "end",
            text: {
                input: "Submit",
                fontFamily: "Open Sans",
                color: "brown",
                fontSize: "1.2em",
                fontWeight: "bold",
                letterSpacing: "0px",
            },
            background: {
                height: "",
                width: "50%",
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
                    y: "5px",
                }
            }
        }
    },
};