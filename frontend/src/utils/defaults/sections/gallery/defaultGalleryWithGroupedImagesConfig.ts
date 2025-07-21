export const defaultGalleryWithGroupedImagesConfig = {
    variation: "galleryWithGroupedImages",
    background: {
        color: "orange",
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
            fontFamily: "Patrick Hand",
            color: "brown",
            lineHeight: "1.3",
        },
        subheading: {
            input: "Some work",
            position: "center",
            fontSize: {
                mobile: "35px",
                desktop: "35px",
            },
            fontFamily: "Patrick Hand",
            color: "brown",
            lineHeight: "1.3",
        },
        groupName: {
            position: "start",
            fontSize: {
                mobile: "1.2rem",
                desktop: "1.35rem",
            },
            fontFamily: "Patrick Hand",
            color: "black",
        },
    },
    imagesModal: {
        addModal: true,
        toggleButtons: {
            background: {}
        },
        background: {
            color: "pink",
            image: {
                height: {
                    mobile: "50vh",
                    desktop: "100vh",
                },
                border: {
                    width: "2px",
                    style: "solid",
                    color: "black",
                    radius: "10px",
                }
            },
            thumbnail: {
                stack: {
                    mobile: "horizontal",
                    desktop: "horizontal",
                },
                color: "red",
                border: {
                    width: "2px",
                    style: "solid",
                    color: "black",
                    radius: "10px",
                }
            },
            modal: {
                color: "red",
            },
            modalImage: {
                height: {
                    mobile: "50vh",
                    desktop: "100vh",
                },
                border: {
                    width: "2px",
                    style: "solid",
                    color: "black",
                    radius: "10px",
                }
            }
        },
        text: {
            description: {
                position: "center",
                fontSize: {
                    mobile: "1.1rem",
                    desktop: "1.35rem",
                },
                fontFamily: "Patrick Hand",
                color: "black",
            },
        },
        grids: {
            thumbnail: {
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
            },
            modal: {
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
            }
        },
        images: {
            group1: {
                input: "Group 1",
                description: "Group 1 Images",
                thumbnail: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100115.png"],
                images: [
                    "https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100115.png",
                    "https://storage.cloud.google.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100136.png",
                    "https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100200.png" 
                ],
            },
            group2: {
                input: "Group 2",
                description: "Group 2 Images",
                thumbnail: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100115.png"],
                images: [
                    "https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100115.png",
                    "https://storage.cloud.google.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100136.png",
                    "https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100200.png" 
                ],
            },
        },
    },
}