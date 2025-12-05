import { Description } from "@headlessui/react";
import { pick } from "lodash";
import { LineChart, Weight } from "lucide-react";

export const mockLayout = {
    _id: "layoutid",
    colors: {
        primary: "primary",
        secondary: "#0027f6",
        accent: "primary",
        quad: "gray",
    },
    fonts: {
        primary: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        secondary: "'Courier New', Courier, monospace"
    },
    routeOrder: ["home", "search"],
    routes: {
        home: {
            name: "Home",
            url: "/",
            exact: true,
            contains: [ "hero", "about", "gallery"],
            inLinks: [
                {
                    section: "about",
                    name: "About Us",
                },
                {
                    section: "products",
                    name: "Shop All"
                }
            ]
        },
        search: {
            name: "Search",
            url: "/search",
            exact: true,
            contains: ["firstSearchResults"]
        },
    },
    welcomeDiv: {
        display: true,
        responsiveSize: {
            width: {
                mobile: "100%",
                desktop: "50%"
            },
            height: {
                mobile: "auto",
                desktop: "auto"
            },
            maxHeight: "50vh"
        },
        background: {
            color: "primary",
            border: {
                width: "2px",
                style: "solid",
                color: "secondary",
                radius: "10px"
            },
            width: {
                mobile: "100%",
                desktop: "50%"
            },
            height: {
                mobile: "auto",
                desktop: "auto"
            },
        },
        text: {
            input: "Welcome to our store! Discover amazing products and great deals.",
            color: "secondary",
            fontSize: {
                mobile: "3vh",
                desktop: "4vh"
            },
            fontFamily: "primary",
            fontWeight: "normal"
        },
        button: {
            show: true,
            text: {
                input: "Shop Now",
                color: "primary",
                fontSize: {
                    mobile: "2.5vh",
                    desktop: "3vh"
                }
            },
            background: {
                color: "secondary",
                width: {
                    mobile: "80%",
                    desktop: "60%"
                },
                padding: {
                    x: "2vh",
                    y: "1vh"
                },
                border: {
                    width: "1px",
                    style: "solid",
                    color: "secondary",
                    radius: "5px"
                }
            }
        },
        logo: {
            show: true,
            imageUrl: "", // Will use store logo
            size: {
                mobile: "10vh",
                desktop: "12vh"
            }
        },
        closeIcon: {
            color: "secondary" // Same as text color
        }
    },
    menubar: {
        topbar: {
            background: {
                color: "primary",
                height: {
                    mobile: "20vh",
                    desktop: "6vh"
                },
                padding: {
                    x: {
                        mobile: "0vh",
                        desktop: "0vh"
                    },
                    y: {
                        mobile: "1vh",
                        desktop: "1vh"
                    }
                },
            },
            order: [
                "heart",
                "logo",
                "hamburger"
            ],
            cart: {
                variation: "paperbag",
                size: "4.5vh",
                color: "#0027f6"
            },
            heart: {
                size: "4.5vh",
                color: "#0027f6"
            },
            logo: {
                use: "text",
                logoText: "C. ShopEasy",
                fontFamily: "Arial",
                logoUrl: ["HTTPS://example.com/mobile-logo.png", "HTTPS://example.com/desktop-logo.png"],
                text: {
                    input: "EasyHeadwear",
                    fontSize: {
                        mobile: "2.900000000000001vh",
                        desktop: "2.4000000000000004vh"
                    },
                    letterSpacing: "NaNpx",
                    textDecoration: "overline"
                },
                background: {
                    color: "primary",
                }
            },
            search: {
                border: {
                    width: "0.1vh",
                    style: "solid",
                    radius: "3.8vh",
                    color: "#d4dde4"
                }
            },
            button: {
                function: 'buy',
                text: {
                    input: 'Shop Now',
                    color: 'primary',
                    fontSize: {
                        mobile: '2vh',
                        desktop: '2vh'
                    },
                    fontFamily: 'primary',
                    fontWeight: 'normal'
                },
                background: {
                    color: 'secondary',
                    width: {
                        desktop: '17vh'
                    },
                    padding: {
                        x: '1vh',
                        y: '0.5vh'
                    },
                    border: {
                        width: '1px',
                        style: 'solid',
                        color: 'secondary',
                        radius: '30px'
                    }
                }
            }
        },
        sidebar: {
            background: {
                color: "secondary",
            },
            animation: "leftToRight",
            links: {
                color: "accent",
                alignment: "center",
                fontFamily: "primary",
                borderColor: "accent",
            },
            image: {
                imageUrl: ["https://storage.googleapis.com/the-mall-uploads-giza/mall/department%20images/495371485_1238922361482703_9008209704576564623_n.jpg"],
                background: {
                    border: {
                        style: "solid",
                        width: "1vh",
                        color: "primary"
                    }
                },
            },
            div: {
                background: {
                    color: "primary",
                },
            },
            button: {
                function: 'buy',
                text: {
                    input: 'Shop Now',
                    color: 'primary',
                    fontSize: {
                        mobile: '2vh',
                        desktop: '2vh'
                    },
                    fontFamily: 'primary',
                    fontWeight: 'normal'
                },
                background: {
                    color: 'secondary',
                    width: {
                        desktop: '17vh'
                    },
                    padding: {
                        x: '1vh',
                        y: '0.5vh'
                    },
                    border: {
                        width: '1px',
                        style: 'solid',
                        color: 'secondary',
                        radius: '30px'
                    }
                }
            }
        },
        variation: "menubarWithSearchbar",
        alertDiv: {
            display: true,
            position: "fixed",
            loopDirection: "right",
            background: {
                color: "secondary",
                height: {
                    mobile: "8vh",
                    desktop: "6vh"
                }
            },
            items: {
                text: {
                    input: "Free shipping for first time buyers!",
                    fontSize: {
                        mobile: "2.6999999999999993vh",
                        desktop: "3.8vh"
                    },
                    color: "primary",
                    fontFamily: "tertiary"
                },
                icon: {
                    show: true,
                    name: "FaTruck",
                    color: "primary",
                    height: {
                        mobile: "5vh",
                        desktop: "5vh"
                    },
                    size: "4.7vh",
                    fontSize: "4.900000000000002vh"
                },
                button: {
                    button: {
                        function: "book",
                        show: true,
                        text: {
                            input: "Book Now"
                        },
                        background: {
                            width: {
                                desktop: "17vh",
                                mobile: "20vh"
                            },
                            padding: {
                                x: {
                                    mobile: "3vh",
                                    desktop: "3vh"
                                },
                                y: {
                                    mobile: "1.5vh",
                                    desktop: "2vh"
                                }
                            },
                            border: {
                                width: "0px",
                                style: "solid",
                                radius: "30px"
                            }
                        }
                    },
                    text: {
                        input: "Order Now"
                    },
                    show: false,
                    background: {
                        color: "primary",
                        border: {
                            radius: "1.7vh"
                        },
                        padding: {
                            x: "3.8vh",
                            y: "5vh"
                        }
                    }
                }
            }
        }
    },
    sections: {
        hero: {
            variation: "heroWithButtonBetweenImages",
            background: {
            color: "primary",
            width: {
                desktop: "100%"
            }
            },
            fontFamilly: "primary",
            topDiv: {
                display: true,
                text: {
                    style: {
                    fontFamily: "secondary",
                    input: "Sweetslice events",
                    fontSize: {
                        mobile: "5.199999999999997vh",
                        desktop: "6.499999999999992vh"
                    },
                    color: "secondary",
                    weight: "lighter",
                    position: "center"
                    }
                },
                background: {}
            },
            images: {
            animation: {
                image1: "leftToRight",
                image2: "rightToLeft"
            },
            imageUrl: [
                "https://storage.googleapis.com/the-mall-uploads-giza/stores/6883116947fc791fc7b89df9/images/assets_task_01k0zzvtsfe2fa9m4r0dtdc803_1753420374_img_1.webp",
                "https://storage.googleapis.com/the-mall-uploads-giza/stores/6883116947fc791fc7b89df9/images/hero image.webp"
            ],
            url: {
                image1: "https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100115.png",
                image2: "https://storage.googleapis.com/the-mall-uploads-giza/stores/68493743d048e16019611f6f/images/Screenshot%202025-06-11%20100200.png"
            }
            },
            midDiv: {
            backgroundColor: "quad",
            animation: "leftToRight",
            text: {
                style: {
                input: "Baked with Love, Crafted for Memories",
                fontFamily: "tertiary",
                fontSize: {
                    mobile: "3.8000000000000016vh",
                    desktop: "5.2vh"
                },
                color: "accent",
                lineHeight: "1.2",
                weight: "normal"
                },
                input: "Baked with Love - Crafted for Memories",
                fontFamily: "secondary",
                color: "pent"
            },
            button: {
                function: "orderNow",
                style: {
                text: {
                    input: "Order Now",
                    fontFamily: "secondary",
                    color: "secondary",
                    fontSize: "3.6000000000000014vh",
                    fontWeight: "bold",
                    letterSpacing: "0px",
                    animation: "fade-in",
                    lineHeight: "0.5",
                    weight: "lighter"
                },
                background: {
                    height: "5.800000000000003vh",
                    width: "43%",
                    color: "primary",
                    shadow: false,
                    border: {
                    width: "0vh",
                    style: "solid",
                    color: "accent",
                    radius: "0px"
                    },
                    padding: {
                    x: "0.1vh",
                    y: "0.1vh"
                    }
                }
                },
                show: {
                desktop: "never"
                }
            },
            background: {
                color: "primary"
            }
            }
        },                                 
        about: {
            variation: "shortAbout",
            background: {
                color: "secondary",
            },
            text: {
                header: {
                    input: "About",
                    fontSize: {
                        mobile: "5vh",
                        desktop: "6vh"
                    },
                    fontWeight: "600",
                },
                paragraph: {
                    input: "Step into the world of exquisite headwear with L. Thompson's Ecom Hat Shop. We pride ourselves on offering a diverse range of hats, each carefully selected to complement various styles and occasions. From trendy beanies to classic sun hats, our collection combines current fashion trends with timeless elegance and variety, ensuring a hat for everyone.",
                    fontSize: {
                        mobile: "3vh",
                        desktop: "3.5vh",
                    },
                }
            }
        },
        nabout: {
            variation: "doctorAbout",
            background: {
                color: "primary",
                height: {
                    mobile: "",
                    desktop: "105vh"
                },
            },
            text: {
                firstSection: {
                    header: {
                        fontFamily: "primary",
                        color: "secondary",
                        input: "About Dr Demo",
                        weight: "bold",
                        fontSize: {
                            desktop: "5vh",
                            mobile: "3.5vh",
                        },
                        padding: {
                            x: {
                                mobile: "0vh",
                                desktop: "0vh"
                            },
                            y: {
                                mobile: "3vh",
                                desktop: "3vh"
                            },
                        }
                    },
                    paragraph: {
                        fontFamily: "primary",
                        color: "secondary",
                        input: "I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.",
                        weight: "300",
                        fontSize: {
                            desktop: "2.4vh",
                            mobile: "2vh",
                        },
                    },
                },
                secondSection: {
                    header: {
                        fontFamily: "primary",
                        color: "secondary",
                        input: "Education & Experience",
                        weight: "bold",
                        fontSize: {
                            desktop: "3.5vh",
                            mobile: "2.5vh",
                        },
                        padding: {
                            x: {
                                mobile: "0vh",
                                desktop: "0vh"
                            },
                            y: {
                                mobile: "2vh",
                                desktop: "2.5vh"
                            },
                        }
                    },
                    details: {
                        fontFamily: "primary",
                        color: "secondary",
                        input: "I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.",
                        weight: "300",
                        fontSize: {
                            desktop: "2.4vh",
                            mobile: "2vh",
                        },
                    },
                },
            },
            button: {
                function: 'book',
                show: true,
                text: {
                    input: "Book Now",
                },
                background: {
                    width: {
                        desktop: "17vh",
                        mobile: "20vh"
                    },
                    padding: {
                        x: {
                            mobile: "3vh",
                            desktop: "3vh"
                        },
                        y: {
                            mobile: "1.5vh",
                            desktop: "2vh"
                        },
                    },
                    border: {
                        width: "0px",
                        style: "solid",
                        radius: "30px",
                    }
                }
            },
            imageUrl: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/easyheadwear/images/galler1.avif", "https://storage.googleapis.com/the-mall-uploads-giza/stores/easyheadwear/images/galler1.avif",]
        },
        FAQs: {
            variation: "firstFAQs", 
            background: {
                color: "primary",
            },
            text: {
                header: {
                    color: "secondary",
                    input: "FAQs",
                    fontSize: {
                        mobile: "4vh",
                        desktop: "6vh",
                    },    
                },
                QnAs: {
                    inputs: {
                        first: {
                            title: "Shipping & Returns",
                            paragraph: "Our shipping is fast and reliable, and we offer hassle-free returns to ensure you're completely satisfied with your purchase."
                        },
                        second: {
                            title: "Hat Care Instructions",
                            paragraph: "To maintain the quality of your hat, we recommend spot cleaning with a damp cloth. Avoid submerging in water or using harsh chemicals."
                        },
                        third: {
                            title: "Customization Options",
                            paragraph: "We provide customized fittings to ensure your hat fits perfectly. Contact us for personalized options and bespoke hat designs."
                        }
                    },
                    style: {
                        title: {
                            color: "secondary",
                            fontFamily: "primary",
                            fontSize: {
                                mobile: "3vh",
                                desktop: "3.5vh"
                            }
                        },
                        paragraph: {
                            color: "secondary",
                            fontFamily: "primary",
                            fontSize: {
                                mobile: "2.4vh",
                                desktop: "2.8vh"
                            },
                            padding: {
                                y: {
                                    mobile: "3vh",
                                    desktop: "5vh"
                                }
                            }
                        }
                    }
                }
            }
        },
        products: {
            variation: "productWithVerySimpleCard",
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
                    fontFamily: "secondary",
                    color: "secondary",
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
                    fontFamily: "secondary",
                    color: "secondary",
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
            acceptingOrdersButton: {
                position: "center",
                text: {
                    fontFamily: "primary",
                    color: "secondary",
                    fontSize: "1rem",
                },
                background: {
                    color: "primary",
                },
            },
            pickupOrDelivery: {
                position: "center",
                fontFamily: "primary",
                background: {
                    padding: {
                        y: {
                            mobile: "1vh",
                            desktop: "1vh"
                        },
                        x: {
                            mobile: "1vh",
                            desktop: "1vh"
                        },
                    },
                    width: {
                        mobile: "100%",
                        desktop: "25%",
                    },
                    border: {
                        width: "1px",
                        style: "solid",
                        color: "secondary",
                        radius: "0px"
                    }
                }
            },
            categorySelector: {
                show: true,
                text: {
                    fontFamily: "primary",
                    fontSize: {
                        mobile: "1.5rem",
                        desktop: "1.5rem"
                    },
                    color: "primary",
                    fontWeight: "bold",
                },
                width: {
                    mobile: "100%",
                    desktop: "70%",
                },
                alignment: "center",
                underlineColor: "secondary",
                selectedColor: "secondary",
            },
            categoryDivider: {
                show: true,
                color: "secondary",
                fontFamily: "primary",
                textAlign: "center",
            },
            card: {
                background: {
                    height: {
                        mobile: "25vh",
                        desktop: "30vh"
                    },
                    border: {
                        width: "1px",
                        style: "solid",
                        color: "secondary",
                        radius: "0px"
                    },
                    padding: {
                        x: {
                            mobile: "1vh",
                            desktop: "1vh"
                        },
                        y: {
                            mobile: "1vh",
                            desktop: "1vh"
                        },
                    }
                },
                text: {
                    name: {
                        fontSize: {
                            mobile: "1.5rem",
                            desktop: "1.5rem"
                        },
                        color: "secondary",
                        fontFamily: "primary",
                        textAlign: "center",
                        padding: {
                            x: {
                                mobile: "1vh",
                                desktop: "1vh"
                            },
                            y: {
                                mobile: "1vh",
                                desktop: "1vh"
                            },
                        }
                    },
                    description: {
                        fontSize: {
                            mobile: "1.5rem",
                            desktop: "1.5rem"
                        },
                        color: "secondary",
                        fontFamily: "primary",
                        textAlign: "center",
                    },
                    price: {
                        fontSize: {
                            mobile: "1.5rem",
                            desktop: "1.5rem"
                        },
                        color: "secondary",
                        fontFamily: "primary",
                        textAlign: "center",
                    }
                }
            },
        },          
        gallery: {
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
        },
        ennockHero: {
            background: {
                image: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/686e76aa96f14c28650b671d/images/Screenshot%202025-07-12%20150326.png", "https://storage.googleapis.com/the-mall-uploads-giza/stores/686e76aa96f14c28650b671d/images/Screenshot%202025-07-12%20150326.png"],
                height: {
                    desktop: "100vh",
                    mobile: "90vh",
                },
            },
            text: {
                firstLine: {
                    input: "Art By",
                    fontSize: {
                        desktop: "2vh",
                        mobile: "1.8vh",
                    },
                }
            }
        },
        searchResults: {
            variation: "basicSearchResults",
            background: {
                color: "primary",
                padding: {
                    x: {
                        mobile: "1vh",
                        desktop: "5vh"
                    },
                    y: {
                        mobile: "3vh",
                        desktop: "0vh"
                    },
                }
            },
            text: {
                header: {
                    input: "Search Results",
                    color: "secondary",
                    fontFamily: "tertiary",
                    fontSize: {
                        mobile: "4vh",
                        desktop: "5vh"
                    },
                    weight: "600",
                    padding: {
                        x: {
                            mobile: "1vh",
                            desktop: "0vh"
                        },
                        y: {
                            mobile: "1vh",
                            desktop: "2vh"
                        },
                    }
                },
            },
            sort: {
                text: {
                    fontFamily: "secondary",
                    color: "secondary"
                },
                background: {
                    color: "primary",
                    border: {
                        width: "1px",
                        style: "solid",
                        color: "accent",
                    }
                }
            },
            card: {
                background: {
                    border: {
                        width: "0px",
                        style: "solid",
                    }
                },
                image: {
                    background: {
                        border: {
                            width: "0px",
                            style: "solid",
                            radius: "0px"
                        }
                    }
                },
                details: {
                    price: {
                        color: "secondary",
                        weight: "normal",
                        fontSize: {
                            mobile: "2.2vh",
                            desktop: "2.2vh"
                        },
                    },
                    name: {
                        textDecoration: "underline",
                        color: "secondary",
                        weight: "normal",
                        fontSize: {
                            mobile: "3vh",
                            desktop: "4vh"
                        },
                    }
                },
                button: {
                    text: {
                        color: 'primary',
                        weight: "600",
                        input: 'Add to cart'
                    },
                    background: {
                        color: 'secondary',
                        padding: {
                            x: {
                                mobile: "2vh",
                                desktop: "2vh"
                            },
                            y: {
                                mobile: "1vh",
                                desktop: "1vh"
                            },
                        },
                        width: "100%",
                        border: {
                            width: '1px',
                            style: 'solid',
                            color: 'secondary',
                            radius: '0px',
                        },
                    },
                }
            },
            filters: {
                text: {
                    color: "secondary",
                    fontFamily: "secondary",
                    title: {
                        input: "Filter by",
                        fontSize: {
                            mobile: "3.2vh",
                            desktop: "4vh"
                        },
                        weight: "bold"
                    },
                    categories: {
                        fontFamily: "secondary",
                        weight: "600",
                        fontSize: {
                            mobile: "2.3vh",
                            desktop: "2.5vh"
                        },
                    },
                    category: {
                        fontFamily: "secondary",
                        weight: "600",
                        fontSize: {
                            mobile: "2.2vh",
                            desktop: "2.3vh"
                        },
                    },
                },
                checkbox: {
                    border: {
                        color: "secondary",
                        width: "1px",
                        radius: "0px"
                    }
                }
            },
        },
        singleProduct: {
            variation: "firstSingleProductSection",
            background: {
              color: "primary",
              width: {
                mobile: "100%",
                desktop: "80%",
              },
              padding: {
                x: { mobile: "1vh", desktop: "0vh" },
                y: { mobile: "3vh", desktop: "5vh" }
              }
            },
            text: {
              exit: {
                background: {
                  padding: {
                    y: { desktop: "2vh", mobile: "0.6vh" },
                    border: {

                    }
                  }
                },
                color: "secondary",
                fontSize: { mobile: "2.3vh", desktop: "2.5vh" }
              }
            },
          
            images: {
              background: {
                color: "secondary",
                width: { mobile: "100%", desktop: "100%" },
                height: { mobile: "50vh", desktop: "100%" }
              },
              toggleButton: {
                text: {
                  fontSize: "4.6vh",
                  color: "primary"
                },
                background: {
                    
                  padding: { y: "0.4vh", x: "0.4vh" }
                }
              }
            },
            details: {
              background: {
                color: "primary",
                height: { mobile: "", desktop: "80vh" },
                padding: {
                  x: { desktop: "4vh", mobile: "1vh" },
                  y: { mobile: "2vh", desktop: "0.1vh" }
                }
              },
              text: {
                labels: {
                  color: "secondary",
                  position: "center",
                  fontSize: "2vh"
                }
              },
          
              nameAndPrice: {
                background: {
                  height: { mobile: "0%", desktop: "0%" },
                  position: "center",
                  padding: {
                    y: { mobile: "0.1vh", desktop: "0.1vh" },
                    x: { mobile: "0.1vh", desktop: "0.1vh" }
                  },
                  border: { width: "0vh" }
                },
                name: {
                  fontFamily: "secondary",
                  fontSize: { mobile: "3vh", desktop: "4.7vh" },
                  underline: {
                    show: false,
                    color: "secondary",
                    width: "50%",
                    style: "solid",
                    thickness: "10px",
                    marginTop: "10px"
                  },
                  color: "secondary",
                  position: "center",
                  weight: "bold"
                },
          
                price: {
                  fontFamily: "secondary",
                  fontSize: { mobile: "3.1vh", desktop: "4.5vh" },
                  underline: {
                    show: false,
                    color: "secondary",
                    width: "50%",
                    style: "solid",
                    thickness: "10px",
                    marginTop: "10px"
                  },
                  color: "secondary",
                  position: "center",
                  padding: {
                    y: { mobile: "2.3vh", desktop: "3.5vh" }
                  }
                }
                },
                variationSelector: {
                    text: {
                      label: { input: "Color" },
                      dropdown: { color: "secondary" }
                    },
                    background: {
                      container: {
                        padding: {
                          x: { desktop: "0px", mobile: "0px" },
                          y: { mobile: "10px", desktop: "10px" }
                        }
                      },
                      button: { color: "primary" },
                      dropdown: { color: "primary" }
                    }
                  },
                
                  messageBox: {
                    show: false,
                    text: { color: "secondary" },
                    titleInput: { input: "Special Request" },
                    placeholder: { textArea: "Let us know if you have any special requests" },
                    background: {
                      container: {
                        padding: {
                          x: { desktop: "0px", mobile: "0px" },
                          y: { mobile: "10px", desktop: "10px" }
                        }
                      },
                      box: {
                        border: {
                          width: "2px",
                          style: "solid",
                          color: "secondary"
                        }
                      }
                    }
                  },
                  quantityUpdater: {
                    text: {
                      color: "secondary",
                      fontSize: "2.5vh"
                    },
                    background: {
                      container: {
                        position: "center",
                        padding: {
                          x: { desktop: "0.1vh", mobile: "0.1vh" },
                          y: { mobile: "0.1vh", desktop: "0.1vh" }
                        }
                      },
                      button: {
                        padding: { x: "10px", y: "0.6vh" },
                        width: { mobile: "39%", desktop: "18%" },
                        border: {
                          style: "solid",
                          width: ".2vh",
                          color: "secondary",
                        }
                      }
                    }
                },
                
                addToCartBtn: {
                    position: "center",
                    style: {
                      background: {
                        color: "secondary",
                        width: {
                            mobile: "100%",
                            desktop: "80%",
                        },
                        padding: { x: "10px", y: "10px" }
                      },
                      text: {
                        fontSize: "2.5vh",
                        weight: "500",
                        color: "primary",
                        fontFamily: "secondary"
                      }
                    }
                },
                
                description: {
                    background: { color: "secondary" },
                    text: { 
                        color: "secondary",
                        fontSize: {
                        desktop: "2.5vh",
                        mobile: "2vh",
                    } }
                }
            },
          
            
        },
        footer: {
            variation: "footerWithSocialsAndEmail",
            background: {
                image: [
                    "https://storage.googleapis.com/the-mall-uploads-giza/stores/686e76aa96f14c28650b671d/images/Screenshot 2025-07-10 194540.png"
                ],
                color: "accent",
                opacity: "20%"
            },
            containerBackground: {
                width: {
                    mobile: "100%",
                    desktop: "65%"
                },
                color: "transparent"
            },
            text: {
                heading: {
                    input: "Contact Me",
                    position: "center",
                    fontFamily: "secondary",
                    fontSize: {
                        mobile: "2rem",
                        desktop: "3rem"
                    },
                    fontWeight: "bold",
                    color: "primary",
                    padding: {
                    }
                },
                subheading: {
                    input: "",
                    position: "center",
                    fontFamily: "secondary",
                    fontSize: {
                        mobile: "2rem",
                        desktop: "3rem"
                    },
                    fontWeight: "bold",
                    color: "primary",
                    padding: {
                        x: "1rem",
                        y: "1rem"
                    }
                },
                paragraph: {
                    input: "Feel free to contact us via the form below or reach out to us at our email address. We'll be happy to help!",
                    position: "center",
                    fontFamily: "primary",
                    fontSize: "1.3em",
                    color: "primary",
                    padding: {
                    }
                }
            },
            icons: {
                number: 3,
                platforms: {
                    first: "twitter",
                    second: "instagram",
                    third: "facebook"
                },
                size: 22,
                color: "primary",
                background: {
                    border: {
                        width: "0px",
                        style: "solid",
                        color: "pent"
                    }
                },
                iconBackground: {
                    padding: {
                        x: "0px",
                        y: "0px"
                    },
                    backgroundColor: "",
                    border: {
                        width: "0px",
                        style: "solid",
                        color: "pent"
                    }
                }
            },
            sendEmailForm: {
                variation: "elegantSendEmailForm",
                background: {
                    
                    shadow: true,
                    border: {
                        width: "0.3vh",
                        style: "solid",
                        color: "primary",
                        radius: "0px"
                    },
                    width: {
                        mobile: "100%",
                        desktop: "80%"
                    },
                    height: {
                        mobile: "100%",
                        desktop: "fit-content"
                    },
                    padding: {
                        x: "1rem",
                        y: "1rem"
                    },
                    senderInfo: {
                        border: {
                            width: "0.3vh",
                            style: "solid",
                            color: "primary",
                            radius: "0px"
                        }
                    }
                },
                text: {
                    title: {
                        show: false,
                        input: "Send Us An Email",
                        position: "end",
                        fontFamily: "secondary",
                        fontSize: {
                            mobile: "1.6em",
                            desktop: "2em"
                        },
                        color: "secondary",
                        fontWeight: "bold",
                        fontStyle: "normal"
                    },
                    senderInfo: {
                        position: "end",
                        fontFamily: "primary",
                        fontSize: "2.1vh",
                        color: "primary"
                    }
                },
                submitButton: {
                    position: "end",
                    text: {
                        input: "Submit",
                        fontFamily: "tertiary",
                        color: "primary",
                        fontSize: "1.2em",
                        fontWeight: "bold",
                        letterSpacing: "0px",
                    },
                    background: {
                        height: "",
                        width: "50%",
                        color: "primary",
                        shadow: true,
                        border: {
                            width: "3px",
                            style: "none",
                            color: "secondary",
                            radius: "0px"
                        },
                        padding: {
                        }
                    }
                }
            }
        },
    }
}