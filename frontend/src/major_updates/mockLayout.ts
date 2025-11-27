import { Description } from "@headlessui/react";
import { LineChart } from "lucide-react";

export const mockLayout = {
    _id: "layoutid",
    colors: {
        primary: "#FFFFFF",
        secondary: "#0027f6",
        accent: "#000000",
        quad: "gray",
    },
    fonts: {
        primary: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        secondary: "'Courier New', Courier, monospace"
    },
    routeOrder: ["home",],
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
        }
    },
    sections: {
        hero: {
            header: {
                input: "Step into Style",
                fontFamily: "Arial",
                fontWeight: "600",
                fontSize: "8vh",
                lineHeight: "1",
            },
            box: {
                text: {
                    input: "L.thompson is a hat store for every style at any occasion",
                },
                button: {
                    function: 'buy',
                    text: {
                        input: "Start Shopping"
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
            backgound: {
            },
            text: {
                header: {
                    input: "About",
                    fontSize: {
                        mobile: "3.5vh",
                        desktop: "6vh"
                    },
                    fontWeight: "600",
                },
                paragraph: {
                    input: "Step into the world of exquisite headwear with L. Thompson's Ecom Hat Shop. We pride ourselves on offering a diverse range of hats, each carefully selected to complement various styles and occasions. From trendy beanies to classic sun hats, our collection combines current fashion trends with timeless elegance and variety, ensuring a hat for everyone.",
                    fontSize: {
                        mobile: "2.5vh",
                        desktop: "3vh",
                    },
                }
            }
        },
        nabout: {
            variation: "doctorAbout",
            background: {
                height: {
                    mobile: "",
                    desktop: "105vh"
                },
            },
            text: {
                firstSection: {
                    header: {
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
            background: {
            },
            text: {
                header: {
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
                            fontSize: {
                                mobile: "3vh",
                                desktop: "3.5vh"
                            }
                        },
                        paragraph: {
                            fontSize: {
                                mobile: "2.4vh",
                                desktop: "2.8vh"
                            }
                        }
                    }
                }
            }
        },
        products: {
            background: {
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
                        weight: "normal",
                        fontSize: {
                            mobile: "2.2vh",
                            desktop: "2.2vh"
                        },
                    },
                    name: {
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
                smallBorder: {
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
                        mobile: "3vh",
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
                        fontSize: {
                            mobile: "3vh",
                            desktop: "4vh",
                        },
                        weight: "600",
                    },
                    description: {
                        fontSize: {
                            mobile: "2.2vh",
                            desktop: "2.5vh",
                        },
                    }
                },
                firstGroup: {
                    title: "Vintage",
                    imageUrl: "https://storage.googleapis.com/the-mall-uploads-giza/stores/easyheadwear/images/galler3.avif",
                    description: "Explore our trendy beanies, ideal for keeping you warm and stylish during the cooler seasons, available in a variety of colors and designs."
                },
                secondGroup: {
                    title: "Kids Headwear",
                    imageUrl: "https://storage.googleapis.com/the-mall-uploads-giza/stores/easyheadwear/images/galler2.avif",
                    description: "Explore our trendy beanies, ideal for keeping you warm and stylish during the cooler seasons, available in a variety of colors and designs."
                },
                thirdGroup: {
                    title: "Fisherman Hats",
                    imageUrl: "https://storage.googleapis.com/the-mall-uploads-giza/stores/easyheadwear/images/galler1.avif",
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
        }
    }
}