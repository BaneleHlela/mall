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
            desktop: "70%",
        },
        padding: {
            x: {
                desktop: "0px",
                mobile: "0px",
            },
            y: {
                desktop: "0px",
                mobile: "0px",
            },
        },
        image: ["https://storage.cloud.google.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100136.png"],
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
            background: {}
        }
    },
    main: defaultMainBookWithOpenCalandarConfig,
}