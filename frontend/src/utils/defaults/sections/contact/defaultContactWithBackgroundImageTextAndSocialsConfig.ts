export const defaultContactWithBackgroundImageTextAndSocialsConfig = {
    variation: "contactWithBackgroundImageTextAndSocials",
    background: {
        image: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/686e76aa96f14c28650b671d/images/The%20works%20of%20my%20hands%20%C3%B0%C2%9F%C2%96%C2%A4078%20823%200301%20ennosm7@gmail.com.jpg"],
        color: "white",
        opacity: "50%",
    },
    containerBackground: {
        width: {
            mobile: "100%",
            desktop: "65%",
        }
    },
    text: {
        title: {
            input: "Contact Us",
            position: "center",
            fontFamily: "Open Sans",
            fontSize: {
                mobile: "2rem",
                desktop: "3rem",
            },
            fontWeight: "bold",
            color: "white",
            padding: {
                x: "1rem",
                y: "1rem",
            },
        },
        paragraph: {
            textArea: "Feel free to contact us via the form below or reach out to us at our email address. We'll be happy to help!",
            position: "center",
            fontFamily: "Open Sans",
            fontSize: "1.3em",
            color: "black",
            padding: {
                x: "1rem",
                y: "1rem",
            },
        }
    },
    icons: {
        number: 2,
        platforms: {
            first: "whatsapp",
            second: "phone",
            third: "twitter",
        },
        size: 22,
        color: "#6c4d37",
        background: {
            color: "",
            border: {
                width: "0px",
                style: "solid",
                color: "brown",
            },
        },
        iconBackground: {
            padding: {
                x: "0px",
                y: "0px"
            },
            backgroundColor: "",
            border: {
                width: "0px",
                style: "solid",
                color: "brown",
            },
        }
    },
    sendEmailForm: {
        variation: "elegantSendEmailForm",
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
}