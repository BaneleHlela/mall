export const defaultHeroWithImageButtonAndBox = {
    variation: "heroWithImagePatternAndBox",
    background: {
        colorA: "#ffffff",
        colorB: "#f0f0f0",
    },
    image: {
        url: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/684c15bca0f98a1d13a7ff00/images/black_woman.png"],
        animation: "leftToRight",
        border: {
            width: "15px",
            style: "solid",
            color: "white",
            radius: "0px",
        }
    },
    pattern: {
        show: true,
        url: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/684c15bca0f98a1d13a7ff00/images/full_diagonal_pattern.png"],
        animation: "upToDown",
    },
    textBox: {
        backgroundColor: "orange",
        animation: "upToDown",
        text: {
            input: "We change the World One eyebrow at a time",
            fontFamily: "Open Sans",
            fontSize: {
                mobile: "1.8em",
                desktop: "1.5em"
            },
            color: "#4a4a4a",
            weight: "bold",
            lineHeight: "1.6",
        },
        border: {
            width: "10px",
            style: "solid",
            color: "white",
            radius: "0px",
        }
    },
    button: {
        function: "bookNow",
        text: {
            input: "Book an Appointment",
            fontFamily: "Open Sans",
            fontSize: {
                mobile: ".9em",
                desktop: "1.1em"
            },
            color: "pink",
            fontWeight: "bold",
            letterSpacing: "0px",
            textDecoration: "underline",
        }
    },
}