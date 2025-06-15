export const defaultFirstStoreReviewCardConfig = {
    backgroundColor: "#f9d195",
    stars: {
      type: "rounded",
      color: "brown",
    },
    text: {
      comment: {
  
      },
      name: {
  
      }
    },
    border: {
      width: "0px",
      style: "solid",
      color: "brown",
      radius: "0",
    },
    shadow: false,
}

export const defaultFirstStoreReviewsConfig = {
    backgroundColor: "white",
    reviewCard: defaultFirstStoreReviewCardConfig,
    text: {
        title: {
            input: "Testimonials",
            style: {
                center: true,
                mobile: {
                    fontSize: "35px",
                    fontFamily: "Patrick Hand",
                    color: "brown",
                },
                desktop: {
                    fontSize: "35px",
                    fontFamily: "Patrick Hand",
                    color: "brown",
                }
            }
        },
        addReviewBtn: {
            fontSize: "20px",
            fontFamily: "Patrick Hand",
            color: "black",
        }   
    },
    addReviewBtn: {
        fullWidth: true,
        backgroundColor: "#f9d195",
        border: {
            width: "1px",
            style: "solid",
            color: "brown",
            radius: "0",
        },
        shadow: false,
    },
}