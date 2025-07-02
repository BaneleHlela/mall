export const defaultFirstStoreServiceCardConfig = {

}
export const defaultFirstStoreServicesConfig = {
    background: {
        color: "#d1dfc7",
        width: {
            mobile: "100%",
            desktop: "80%",
        }
    },
    header: {
        text: {
            input: "What we do",
            fontFamily: "Open Sans",
            fontSize: {
                mobile: "1.5em",
                desktop: "2em",
            },
            color: "black",
            weight: "bold",
            letterSpacing: "0px",
            textTransform: "uppercase",
            textDecoration: "underline",
            lineHeight: "100px",
        }
    },
    categorySelector: {
        text: {
            fontFamily: "Patrick Hand",
            fontSize: {
                mobile: "1.1em",
                desktop: "1.5em",
            },
            color: "#4b5563",
            fontWeight: "bold",
        },
        width: {
            mobile: "100%",
            desktop: "70%",
        }
    },
    servicesDisplay: {
        grid: {
            columns: {
                mobile: 2,
                desktop: 4,
            },
            gap: {
                mobile: "5px",
                desktop: "30px",
            },
        }
    },
    serviceCard: {
        text: {
            serviceName: {
                position: "start",
                fontFamily: "Patrick Hand",
                weight: "bold",
                color: "brown",
                fontSize: {
                    mobile: "1.1rem",
                    desktop: "1.35rem",
                },
            },
            serviceDetails: {
                position: "start",
                fontFamily: "Patrick Hand",
                weight: "normal",
                color: "#4b5563",
                fontSize: {
                    mobile: "1rem",
                    desktop: "1.15rem",
                },
            },
        },
        background: {
            padding: {
                x: "1rem",
                y: "1rem",
            },
            color: "",
            border: {
                width: "1px",
                style: "solid",
                color: "grey",
            },
        },
        bookButton: {
            function: "bookNow",
            position: "start",
            style: {
                text: {
                    input: "Book an Appointment",
                    fontFamily: "Open Sans",
                    color: "white",
                    fontSize: ".85em",
                    fontWeight: "bold",
                    letterSpacing: "0px",
                },
                background: {
                    height: "",
                    width: "70%",
                    color: "black",
                    shadow: true,
                    border: {
                        width: "0px",
                        style: "solid",
                        color: "black",
                        radius: "0px",
                    },
                    padding: {
                        x: "6px",
                        y: "8px",
                    }
                }
            }
        },
    },
}