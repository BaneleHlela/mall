import { defaultFirstStoreReviewCardConfig } from "./defaultFirstStoreReviewsConfig";

export const defaultReviewsWithBackgroungImageAndCardConfig = {
    variation: "reviewsWithBackgroundImageAndCard",
    background: {
        image: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100115.png"],
    },
    containerBackground: {
        width: {
            mobile: "100%",
            desktop: "65%",
        }
    },
    reviewCard: defaultFirstStoreReviewCardConfig,
    text: {
        title: {
            input: "Reviews",
            position: "center",
            fontSize: {
                mobile: "35px",
                desktop: "35px",
            },
            fontFamily: "Patrick Hand",
            color: "brown",
        },
        subheading: {
            input: "See what others have to say",
            position: "center",
            fontSize: {
                mobile: "1.1rem",
                desktop: "1.1rem",
            },
            fontFamily: "Patrick Hand",
            color: "brown",
        }
    },
    grid: {
        columns: {
            mobile: 1,
            desktop: 3,
        },
        gap: {
            mobile: "5px",
            desktop: "0px",
        },
    },
    addReviewBtn: {
        background: {
            width: "100%",
            color: "#f9d195",
            padding: {
                x: "0.8rem",
                y: "0.8rem",
            },
            border: {
                width: "1px",
                style: "solid",
                color: "brown",
                radius: "0",
            },
            shadow: false,
        },
        text: {
            fontSize: "20px",
            fontFamily: "Patrick Hand",
            color: "black",
        },
    },
}