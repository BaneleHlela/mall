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
        title: {
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
        groupName: {
            position: "start",
            fontSize: {
                mobile: "1.2rem",
                desktop: "1.35rem",
            },
            fontFamily: "Patrick Hand",
            color: "black",
        }
    },
    imagesModal: {
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