
export const defaultPopularTeamSectionConfig = {
    variation: "popularTeamSection",
    background: {
        color: "white",
        width: {
            mobile: "100%",
            desktop: "80%",
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
        }
    },
    text: {
        heading: {
            input: "Team",
            fontSize: {
                mobile: "40px",
                desktop: "50px",
            },
            fontWeight: "bold",
            color: "black",
            position: "center",
        },
        subheading: {
            show: true,
            animation: "fade",
            input: "We have experienced individuals",
            fontSize: {
                mobile: "20px",
                desktop: "25px",
            },
            fontWeight: "normal",
            color: "black",
            position: "center",
            textAlign: "center",
        },
    },
    stack: {
        mobile: "horizontal",
        desktop: "horizontal",
    },
    grid: {
        container: {
            background: {
                position: "center",
                width: {
                    mobile: "100%",
                    desktop: "80%",
                },
            }
        },
        columns: {
            mobile: 1,
            desktop: 3,
        },
        gap: {
            mobile: "5px",
            desktop: "0px",
        },
    },
    toggleButtons: {
        background: {}
    },
    card: {
        stack: {
            mobile: "column",
            desktop: "row",
        },
        background: {
            color: "white",
            height: {
                mobile: "200px",
                desktop: "250px",
            },
            border: {
                width: "1px",
                color: "black",
                style: "solid",
                radius: "10px"
            }
        },
        image: {
            height: {
                mobile: "50%",
                desktop: "100%",
            },
            width: {
                mobile: "100%",
                desktop: "50%",
            },
            border: {
                width: "1px",
                color: "black",
                style: "solid",
                radius: "10px"
            }
        },
        textAndButton: {
            background: {
            },
            text: {
                show: {
                    description: true,
                    price: true,
                    duration: true,
                },
                fontFamily: "Patrick Hand",
                fontSize: {
                    mobile: "1.5rem",
                    desktop: "2rem",
                },
                color: "black",
                fontWeight: "bold",
                name: {
                    fontSize: {
                        mobile: "1.5rem",
                        desktop: "2rem",
                    },
                    color: "black",
                    fontWeight: "bold",
                },
            },
            button: {
                show: true,
                function: "bookAppointment",
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
                },         
            }
        }
    }
}