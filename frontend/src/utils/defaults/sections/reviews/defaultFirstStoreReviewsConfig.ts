export const defaultFirstStoreReviewCardConfig = {
    variation: "basicStoreReviewCard",
    background:{
        color: "white",
        border: {
            width: "2px",
            style: "solid",
            color: "brown",
            radius: "0",
        },
        shadow: true,
    },
    stars: {
      position: "end",
      type: "rounded",
      color: "brown",
      size: 22,
    },
    text: {
      comment: {
        fontSize: "14px",
        fontFamily: "Open Sans",
        color: "black",
        weight: "normal",
        fontStyle: "normal",
      },
      name: {
        position: "end",
        fontSize: "18px",
        fontFamily: "Open Sans",
        color: "black",
        weight: "bold",
        fontStyle: "normal",
      }
    },
}

export const defaultFirstStoreReviewsConfig = {
    variation: "firstStoreReviewsSection",
    background: {
        color: "blue",
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
        addReviewBtn: {
            fontSize: {
                mobile: "20px",
                desktop: "20px",
            },
            fontFamily: "Patrick Hand",
            color: "black",
        }   
    },
    addReviewBtn: {
        fullWidth: true,
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
}