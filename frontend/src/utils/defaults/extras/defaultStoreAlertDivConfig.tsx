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
    animation: "loop",
    position: "fixed",
    loopDirection: "left",
    background: {
      color: "red",
      height: {
        mobile: "10vh",
        desktop: "10vh",
      },
    },
    items: {
        buttonA: defaultStoreButtonConfig,
        buttonB: defaultStoreButtonConfig,
        iconA: { 
            name: "FaTruck",
            color: "white",
            height: "5.4vh",
        },
        iconB: {
            name: "BsTruckFlatbed",
            color: "white",
            height: "5.4vh",
        },
        textA: {
            input: "We Deliver",
            fontSize: {
            mobile: "20px",
            desktop: "25px",
            },
            fontWeight: "bold",
            color: "white",
            position: "center",
            underline: {
                show: true,
                color: "white",
                width: "50%",
                style: "solid",
                thickness: "2px",
                marginTop: "10px",
            },
        },
        textB: {
            input: "Fast & Reliable",
            fontSize: {
            mobile: "18px",
            desktop: "22px",
            },
            fontWeight: "normal",
            color: "white",
            underline: {
                show: true,
                color: "white",
                width: "50%",
                style: "solid",
                thickness: "2px",
                marginTop: "10px",
            },
        },
        // This defines the order of components displayed
        order: [ "iconB", "textB", "buttonB", "iconA", "textA", "buttonA" ],
        gap: {
            item: "100px",
            allItems: "20px",
        },
    },
};
  