export const defaultHeroWithBoxConfig = {
    variation: "heroWithBox",
    background: {
      opacity: "25%",
      height: {
        mobile: "100vh",
        desktop: "100vh",
      }
    },
    box: {
      background: {
        color: "white",
        width: {
          mobile: "100%",
          desktop: "50%",
        },
        height: {
          mobile: "50%",
          desktop: "50%",
        },
        mobile: {
          border: {
            style: "none",
          }
        }
      },
      position: {
        mobile: {
          top: "0px",
          left: "0px",
        },
        desktop: {
          top: "0px",
          left: "0px",
        }
      },
    },
    image: ["https://storage.cloud.google.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100136.png",],
    text: {
      width: {
        mobile: "100vw",
        desktop: "50vw",
      },
      firstLine: {
        show: true,
        input: "I am text A",
        fontFamily: "Open Sans",
        fontWeight: "bold",
        fontSize: {
          mobile: "1em",
          desktop: "1.2em",
        }
      },
      secondLine: {
        show: true,
        input: "I am text B",
        fontFamily: "Open Sans",
        fontWeight: "bold",
        fontSize: {
          mobile: "1em",
          desktop: "1.2em",
        }
      },
      thirdLine: {
        show: true,
        input: "I am text C",
        fontFamily: "Open Sans",
        fontWeight: "bold",
        fontSize: {
          mobile: "1em",
          desktop: "1.2em",
        }
      },
    },
    button: {
      function: "buyNow",
      style: {
          text: {
              input: "Buy Now",
              fontFamily: "Open Sans",
              color: "brown",
              fontSize: "1.2em",
              fontWeight: "bold",
              letterSpacing: "0px",
          },
          background: {
              height: "10px",
              width: "190px",
              color: "#f9d195",
              shadow: true,
              border: {
                  width: "3px",
                  style: "solid",
                  color: "black",
                  radius: "0px",
              },
              padding: {
                  x: "0.8rem",
                  y: "50px",
              }
          }
      }
    },
}