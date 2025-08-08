import { defaultMainBookWithOpenCalandarConfig } from "../book/defaultMainBookWithOpenCalenderConfig";

export const defaultBookServiceSectionConfig = {
    variation: "basic",
    background: {
        color: "orange",
        width: {
            mobile: "100%",
            desktop: "80%",
        },
        padding: {
            x: {
                desktop: "100px",
                mobile: "30px",
            },
            y: {
                mobile: "20px",
                desktop: "120px",
            },  
        }
    },
    text: {
        exit: {
            background: {
                color: "transparent"
            }
        },
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
    main: defaultMainBookWithOpenCalandarConfig,
}