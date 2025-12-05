export const defaultSimpleGalleryConfig = {
    variation: "simpleGallery",
    background: {
        color: "primary",
        width: {
            mobile: "100%",
            desktop: "100%",
        },
    },
    text: {
        heading: {
            input: "Selected Work",
            position: "center",
            fontSize: {
                mobile: "35px",
                desktop: "35px",
            },
            fontFamily: "primary",
            color: "primary",
            lineHeight: "1.3",
            underline: {
                show: true,
                color: "primary",
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
            fontFamily: "primary",
            color: "primary",
            lineHeight: "1.3",
            underline: {
                show: false,
                color: "primary",
                width: "50%",
                style: "solid",
                thickness: "10px",
                marginTop: "10px",
            }
        },
    },
    images: {
        background: {
            border: {
                width: "2px",
                style: "solid",
                color: "secondary",
                radius: "10px",
            },
            height: {
                mobile: "25vh",
                desktop: "25vh",
            }
        },
        stack: {
            mobile: "horizontal",
            desktop: "horizontal",
        },
        columns: {
            mobile: 1,
            desktop: 1,
        },
        gap: {
            mobile: "5px",
            desktop: "0px",
        },
        urls: [
            "https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100115.png",
            "https://storage.cloud.google.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100136.png",
            "https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100200.png"
        ],
    }
}