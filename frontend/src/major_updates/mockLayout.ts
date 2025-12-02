import { Description } from "@headlessui/react";
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
        variation: "menubarWithSearchbar",
        topbar: {
            stack: ["searchbar", "heartLogo"],
            order: ["hamburger", "logo", "heart"],
            cart: {
                variation: 'basket',
            },
            logo: {
                use: "text",
                text: {
                    input: "L.thompson",
                },
            },
            search: {
                border: {
                    width: '1px',
                    style: 'solid',
                    radius: '0px',
                }
            }
        },
        alertDiv: {
            display: true,
            position: "fixed",
            loopDirection: "right",
            background: {
                color: "secondary",
                height: {
                    mobile: "10vh",
                    desktop: "10vh",
                },
            },
            items: {
                text: {
                    input: "Free shipping for first time buyers!",
                    fontSize: { mobile: "2.5vh", desktop: "3vh" },
                    color: "primary",
                },
                icon: {
                    show: true,
                    name: "FaTruck",
                    color: "primary",
                    height: {
                        mobile: "5vh",
                        desktop: "5vh",
                    },
                },
                button: {
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
                }
            }
        }
    },
    sections: {
        hero: {
            variation:"stylishHero",
            backgroundImage: ["", ""],
            background: {},
            header: {
                color: "secondary",
                input: "Step into Style",
                fontFamily: "Arial",
                fontWeight: "600",
                fontSize: "8vh",
                lineHeight: "1.1",
            },
            box: {
                text: {
                    input: "L.thompson is a hat store for every style at any occasion",
                },
                button: {
                    function: 'buy',
                    show: true,
                    text: {
                        input: "Shop Now",
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
                background: {
                    border: {
                        width: "0px",
                        radius: "50px",
                    }
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
            background: {
                color: "primary",
                padding: {
                    x: {
                        mobile: "1vh",
                        desktop: "0vh"
                    },
                    y: {
                        mobile: "3vh",
                        desktop: "5vh"
                    },
                }
            },
            text: {
                header: {
                    input: "Shop All",
                    color: "secondary",
                    fontSize: {
                        mobile: "4vh",
                        desktop: "5vh"
                    },
                    weight: "600",
                    padding: {
                        x: {
                            mobile: "1vh",
                            desktop: "5vh"
                        },
                        y: {
                            mobile: "1vh",
                            desktop: "2vh"
                        },
                    }
                }
            },
            card: {
                background: {
                    height: {
                        mobile: "60vh",
                        desktop: "60vh", 
                    },
                    border: {
                        width: "0px",
                        style: "solid",
                    }
                },
                image: {
                    background: {
                        border: {
                            width: "1px",
                            style: "solid",
                            radius: "60px"
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
                        color: "secondary",
                        weight: "normal",
                        fontSize: {
                            mobile: "2.2vh",
                            desktop: "2.2vh"
                        },
                    }
                }
            }
        },
        gallery: {
            variation: "maxThreeGallery",
            background: {
                border: {
                    color: "secondary",
                    width: "1px",
                    style: "solid",
                },
                padding: {
                    x: {
                        mobile: "1vh",
                        desktop: "10vh"
                    },
                    y: {
                        mobile: "5vh",
                        desktop: "10vh"
                    }
                }
            },
            heading: {
                input: "Headwear Gallery",
                fontSize: {
                    mobile: "4vh",
                    desktop: "6vh",
                },
                padding: {
                    x: {
                        mobile: "0vh",
                        desktop: "0vh"
                    },
                    y: {
                        mobile: "3.5vh",
                        desktop: "5vh"
                    }
                },
                weight: "600",
            },
            cards: {
                style: {
                    image: {
                        border: {
                            width: "1px",
                            style: "solid",
                            radius: "50px",
                        }
                    },
                    title: {
                        fontFamily: "secondary",
                        fontSize: {
                            mobile: "3.5vh",
                            desktop: "4vh",
                        },
                        weight: "900",
                    },
                    description: {
                        fontSize: {
                            mobile: "2.2vh",
                            desktop: "2.5vh",
                        },
                        lineHeight: "1.2",
                    }
                },
                firstGroup: {
                    show: true,
                    title: "Vintage",
                    imageUrls: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/easyheadwear/images/galler3.avif"],
                    description: "Explore our trendy beanies, ideal for keeping you warm and stylish during the cooler seasons, available in a variety of colors and designs."
                },
                secondGroup: {
                    show: true,
                    title: "Kids Headwear",
                    imageUrls: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/easyheadwear/images/galler2.avif"],
                    description: "Explore our trendy beanies, ideal for keeping you warm and stylish during the cooler seasons, available in a variety of colors and designs."
                },
                thirdGroup: {
                    show: true,
                    title: "Fisherman Hats",
                    imageUrls: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/easyheadwear/images/galler1.avif"],
                    description: "Explore our trendy beanies, ideal for keeping you warm and stylish during the cooler seasons, available in a variety of colors and designs."
                },

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
                        color: "#000000",
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