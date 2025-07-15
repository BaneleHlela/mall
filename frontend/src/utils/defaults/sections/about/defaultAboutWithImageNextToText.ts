export const defaultAboutWithImageNextToTextConfig = {
    variation: "aboutWithImageNextToText",
    background: {
        color: "white",
    },
    image: {
        imageUrl: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100200.png"],
        background: {
            height: {
                mobile: "35vh",
                desktop: "60vh"
            },
            width: {
                mobile: "100%",
                desktop: "100%"
            },
            border: {
                width: "5px",
                style: "solid",
                color: "white",
                radius: "0",
            },
        }
        
    },
    text: {
        border: {
            width: "5px",
            style: "solid",
            color: "white",
            radius: "0",
        },
        style: {
            fontFamily: "Roboto",
            fontSize: {
                mobile: "1.6em",
                desktop: "3em",
            },
            color: "black",
            fontWeight: "normal",
            fontStyle: "normal",
        },
        title: {
            style: {
                input: "My Story",
                fontFamily: "Open Sans",
                fontSize: {
                    mobile: "1.6em",
                    desktop: "3em",
                },
                color: "black",
                fontWeight: "normal",
                fontStyle: "normal",
            },
        }
    },
};