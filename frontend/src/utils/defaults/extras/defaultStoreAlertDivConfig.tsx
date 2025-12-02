import { defaultStoreButtonConfig } from "./defaultStoreButtonConfig";

export const defaultAlertTextConfig = {
    input: "I am text",
    fontSize: {
    mobile: "18px",
    desktop: "22px",
    },
    fontWeight: "normal",
    color: "white",
    underline: {
        show: false,
        color: "white",
        width: "50%",
        style: "solid",
        thickness: "2px",
        marginTop: "10px",
    },
}

export const defaultAlertIconConfig = {
    name: "FaTruck",
    color: "white",
    size: "5.4vh",
}

export const defaultStoreAlertDivConfig = {
    display: true,
    position: "fixed",
    loopDirection: "right",
    background: {
        color: "secondary",
        height: {
            mobile: "10vh",
            desktop: "10vh",
        },
    },
    items: {
        text: {
            input: "Free shipping for first time buyers!",
            fontSize: { mobile: "2.5vh", desktop: "3vh" },
            color: "primary",
        },
        icon: {
            show: true,
            name: "FaTruck",
            color: "primary",
            height: {
                mobile: "5vh",
                desktop: "5vh",
            },
        },
        button: {
            button: {
                function: 'book',
                show: true,
                text: {
                    input: "Book Now",
                },
                background: {
                    width: {
                        desktop: "17vh",
                        mobile: "20vh"
                    },
                    padding: {
                        x: {
                            mobile: "3vh",
                            desktop: "3vh"
                        },
                        y: {
                            mobile: "1.5vh",
                            desktop: "2vh"
                        },
                    },
                    border: {
                        width: "0px",
                        style: "solid",
                        radius: "30px",
                    }
                }
            },
        }
    }
};
  