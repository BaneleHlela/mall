import { defaultMainBookWithOpenCalandarConfig } from "./defaultMainBookWithOpenCalenderConfig";

export const defaultBasicBookWithOpenCalendarConfig = {
    variation: 'basicBookWithOpenCalendar',
    background: {
        color: "black",
        height: {
            mobile: "",
            desktop: "100vh",
        },
        width: {
            mobile: "",
            desktop: "80%",
        },
        padding: {
            x: "1rem",
            y: "1rem",
        },
    },
    headerAndMainBackground: {
        height: {
            desktop: "80%",
            mobile: "",
        },
        padding: {
            x: "2rem",
            y: "1rem",
        },
        border: {
            width: "1px",
            style: "solid",
            color: "white",
            radius: "0px",
        }
    },
    heading: {
        text: {
            input: "Book Now",
            position: "center",
            fontSize: {
                mobile: "30px",
                desktop: "30px",
            },
            fontFamily: "Open Sans",
            color: "white",
            fontWeight: "bold",
            fontStyle: "normal",
            marginBottom: "20px",
        }
    },
    main: defaultMainBookWithOpenCalandarConfig,
}