import { Description } from "@headlessui/react";
import { duration } from "@mui/material";
import { FontSize } from "@tiptap/extension-text-style";
import { color } from "framer-motion";
import { pick } from "lodash";
import { LineChart, Weight } from "lucide-react";

export const mockLayout = {
    _id: "layoutid",
    colors: {
        primary: "orange",
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
            weight: "normal"
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
            display: "socials",
            logo: {
                use: "logo",
                logoText: "C. ShopEasy",
                fontFamily: "primary",
                text: {
                input: "EasyHeadwear",
                fontSize: {
                    mobile: "2.9vh",
                    desktop: "2.4vh"
                },
                letterSpacing: "0px",
                textDecoration: "overline"
                },
                style: {
                text: {
                    input: "Bona Mfo",
                    color: "primary"
                },
                background: {
                    width: {
                    mobile: "48%",
                    desktop: "55%"
                    },
                    color: "primary",
                    padding: {
                    y: {
                        mobile: "2.2vh"
                    }
                    }
                }
                },
                logoUrl: [
                "https://storage.googleapis.com/the-mall-uploads-giza/stores/bona-driving-school/images/Untitled.png"
                ]
            },
            socials: {
                show: true,
                icons: {
                  platforms: {
                    first: "instagram",
                    third: "pinterest",
                    second: "email",
                  },
                  number: 3,
                  size: "4.499999999999998vh",
                  color: "secondary",
                  background: {
                    color: "transparent",
                    padding: {
                      y: "0.8vh",
                      x: "0.8vh"
                    },
                    border: {
                      style: "solid",
                      width: "0.1vh",
                      color: "secondary"
                    }
                  }
                },
            },
            background: {
                color: "accent",
                border: {
                style: "dashed",
                width: "0vh",
                color: "primary"
                },
                padding: {
                y: {
                    mobile: "0vh"
                },
                x: {
                    mobile: "0.8vh"
                }
                },
                height: {
                mobile: "9vh"
                }
            },
            hamburger: {
                variation: "spiral",
                color: "primary",
                size: 32
            },
            desktop: {
                links: {
                fontFamily: "secondary",
                color: "primary",
                fontSize: "2.1vh"
                },
                button: {
                background: {
                    color: "transparent",
                    padding: {
                    x: "6.2vh"
                    },
                    border: {
                    style: "solid",
                    width: "0.1vh",
                    color: "secondary"
                    }
                },
                text: {
                    fontFamily: "secondary",
                    color: "primary",
                    weight: "normal",
                    input: "Book Now"
                },
                show: false
                }
            }
        },
        variation: "cakeMenubar",
        alertDiv: {
          display: false,
          position: "fixed",
          loopDirection: "right",
          background: {
            color: "secondary",
            height: {
              mobile: "10vh",
              desktop: "10vh"
            }
          },
          items: {
            text: {
              input: "Free shipping for first time buyers!",
              fontSize: {
                mobile: "2.5vh",
                desktop: "3vh"
              },
              color: "primary"
            },
            icon: {
              show: true,
              name: "FaTruck",
              color: "primary",
              height: {
                mobile: "5vh",
                desktop: "5vh"
              }
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
              }
            }
          }
        },
        sidebar: {
          backgroundColor: "accent",
          logo: {
            use: "logo",
            style: {
              text: {
                input: "Kwamashu",
                color: "secondary",
                fontSize: {
                  mobile: "2.8vh"
                }
              },
              background: {
                color: "secondary",
                width: {
                  mobile: "43%"
                }
              }
            },
            logoUrl: [
              "https://storage.googleapis.com/the-mall-uploads-giza/stores/bona-driving-school/images/driving-car-drive-svgrepo-com (2).svg"
            ]
          },
          links: {
            color: "primary",
            alignment: "right",
            fontFamily: "secondary",
            weight: "lighter",
            borderColor: "primary"
          }
        }
    },
    sections: {
        hero: {
            variation: "heroWithTwoTextAreas",
            background: {
                height: {
                    mobile: "fit-content",
                    desktop: "fit-content"
                },
                width: {
                    mobile: "100%",
                    desktop: "100%"
                },
                color: "pent",
                container: {
                    color: "primary",
                    width: {
                        mobile: "100%",
                        desktop: "100%"
                    },
                    height: {
                        mobile: "39%",
                        desktop: "101%"
                    },
                    padding: {
                        y: {
                            desktop: "2.6vh",
                            mobile: "2.6vh"
                        },
                        x: {
                            desktop: "2.4vh",
                            mobile: "2.4vh"
                        }
                    }
                },
                border: {
                    width: "0vh",
                    style: "none",
                    radius: "0vh"
                }
            },
            text: {
                firstArea: {
                    input: "Welcome to Our Store",
                    fontFamily: "secondary",
                    color: "secondary",
                    fontSize: {
                        mobile: "5.100000000000001vh",
                        desktop: "7vh"
                    },
                    weight: "normal"	
                },
                secondArea: {
                    input: "Discover amazing products and great deals. Shop now and enjoy exclusive offers!",
                    fontFamily: "secondary",
                    color: "secondary",
                    fontSize: {
                        mobile: "3.8000000000000016vh",
                        desktop: "5.2vh"
                    },
                    weight: "normal"	
                }
            },
            image: {
                url: {
                    mobile: [
                        "https://storage.googleapis.com/the-mall-uploads-giza/stores/6895c4d6a50d393f431b9d47/images/522961668_2800125136849645_1163671612854122411_n.jpg",
                        "https://storage.googleapis.com/the-mall-uploads-giza/stores/6895c4d6a50d393f431b9d47/images/CarrotCakeLoaf_03.jpg"
                    ],
                    desktop: [
                        "https://storage.googleapis.com/the-mall-uploads-giza/stores/6895c4d6a50d393f431b9d47/images/522961668_2800125136849645_1163671612854122411_n.jpg",
                        "https://storage.googleapis.com/the-mall-uploads-giza/stores/6895c4d6a50d393f431b9d47/images/CarrotCakeLoaf_03.jpg"
                    ]
                },
                background: {
                    height: {
                        mobile: "50vh",
                        desktop: "60vh",
                    },
                    width: { 
                        mobile: "100%",
                        desktop: "100%",
                    },
                    border: {
                        width: "0px",
                        style: "solid",
                        radius: "0px",
                    }
                },
            },
            button: {
                function: "buyNow",
                show: true,
                style: {
                    text: {
                        input: "Buy Now",
                        fontFamily: "secondary",
                        color: "primary",
                        fontSize: "1.2em",
                        fontWeight: "bold",
                        letterSpacing: "0px"
                    },
                    background: {
                        width: "190px",
                        color: "accent",
                        shadow: true,
                        border: {
                        width: "3px",
                        style: "solid",
                        color: "primary",
                        radius: "0px"
                        }
                    }
                },
                position: "center"
            },
            imageFirst: {
                desktop: false,
                mobile: false
            }
        },                                 
        about: {
            background: {
                color: "primary",
            },
            text: {
                header: {
                    input: "Made With Love & Sauce",
                    fontFamily: "primary",
                    fontSize: {
                        mobile: "4vh",
                        desktop: "5vh"
                    }
                },
                details: {
                    fontSize: {
                        mobile: "2.4vh",
                        desktop: "3vh"
                    },
                    fontFamily: "primary",
                },
                address: {
                    input: "123 Mthatheni Street, Madadeni 2951"
                },
                openingHours: {
                    input: "<strong>Mon-Fri:</strong> 8am - 6pm<br/><strong>Sat:</strong> 9am - 4pm<br/><strong>Sun:</strong> Closed"
                }
            },
            logo: {
                use: "logo",
                logoUrl: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/khona-kota-chips/images/icon.png"],
                text: {
                    input: "",
                    color: "primary",
                    fontSize: {
                        mobile: "3vh",
                        desktop: "4vh"
                    },
                    weight: "bold",
                    letterSpacing: "0px",
                    textDecoration: "none"
                },
                background: {
                    width: {
                        mobile: "20%",
                        desktop: "25vh"
                    }
                }
            },
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
                    weight: "bold",
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
            variation: "popularGallerySection",         
            background: {
                color: "primary",
                width: {
                    mobile: "100%",
                    desktop: "80%"
                },
                padding: {
                    x: {
                    mobile: "1.7999999999999998vh",
                    desktop: "0vh"
                    },
                    y: {
                    mobile: "5.7vh",
                    desktop: "13.6vh"
                    }
                }
            },        
            text: {
                heading: {
                    input: "",
                    position: "center",
                    fontSize: {
                        mobile: "35px",
                        desktop: "35px"
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
                    marginTop: "10px"
                    }
                },
            
                subheading: {
                    input: "",
                    position: "center",
                    fontSize: {
                    mobile: "35px",
                    desktop: "35px"
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
                    marginTop: "10px"
                    }
                }
            },
            images: {
                background: {
                    border: {
                    width: "0vh",
                    style: "solid",
                    color: "secondary",
                    radius: "0vh"
                    },
                    height: {
                        mobile: "30vh",
                        desktop: "26vh"
                    }
                },
                text: {
                    title: {

                    },
                    description: {

                    }
                },
                stack: {
                    mobile: "vertical",
                    desktop: "vertical"
                },         
                columns: {
                    mobile: 2,
                    desktop: 5
                },           
                gap: {
                    mobile: "2.0000000000000004vh",
                    desktop: "5.5vh"
                },
                imagesDetails: [
                    {
                        urls: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/demo-bnb/images/bed.png"],
                        title: "Cozy Bedroom",
                        description: ""
                    },
                    {
                        urls: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/demo-bnb/images/towel-rack.png"],
                        title: "Towels",
                        description: ""
                    },
                    {
                        urls: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/demo-bnb/images/washing-machine.png"],
                        title: "Washing Machine",
                        description: ""
                    },
                    {
                        urls: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/demo-bnb/images/wi-fi.png"],
                        title: "Wi-Fi",
                        description: ""
                    },
                    {
                        urls: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/demo-bnb/images/gym.png"],
                        title: "Gym",
                        description: ""
                    },
                    {
                        urls: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/demo-bnb/images/pool.png"],
                        title: "Pool",
                        description: ""
                    },
                    {
                        urls: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/demo-bnb/images/hair-dryer.png"],
                        title: "Iron & Hair Dryer",
                        description: ""
                    },
                    {
                        urls: ["https://storage.googleapis.com/the-mall-uploads-giza/stores/demo-bnb/images/amenities%20(1).png"],
                        title: "Soap & Lotion",
                        description: ""
                    }
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
                    weight: "bold",
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
                    weight: "bold",
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
                        weight: "bold",
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
                        weight: "bold",
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
        rentals: {
            bookingModal: {
                text: {
                    selectedDates: {
                        input: "Select Rental Dates",
                        fontFamily: "secondary",
                        fontSize: {
                            mobile: "2.3vh",
                            desktop: "3vh"
                        },
                        color: "secondary",
                        weight: "bold"
                    },
                    selectedRental: {
                        input: "Selected Rental",
                    }
                },
                background: {
                    color: "accent",
                    padding: {
                        x: {
                            mobile: "1.5vh",
                            desktop: "2vh"
                        },
                        y: {
                            mobile: "2vh",
                            desktop: "2vh"
                        },
                    },
                    border: {
                        width: "0px",
                        style: "solid",
                        color: "secondary",
                        radius: "0px"
                    }
                },
                buttons: {
                    selectedDateButton: {
                        text: {
                            input: "Book now",
                            fontFamily: "secondary",
                            color: "secondary",
                            fontSize: {
                                mobile: "2vh",
                                desktop: "2.2vh"
                            },
                        },
                        background: {
                            color: "transparent",
                            padding: {
                                y: "1.3vh",
                                x: "2.2vh",
                            },
                            width: "100%",
                            border: {
                                width: "1px",
                                style: "solid",
                                color: "secondary",
                                radius: "1px"
                            }
                        },
                    },
                    selectedRentalButton:  {
                        text: {
                            input: "Book now",
                            fontFamily: "secondary",
                            color: "accent",
                        },
                    },
                    requestBookingButton: {
                        text: {
                          input: "Book now",
                          fontFamily: "secondary",
                          color: "accent",
                        },
                      
                        background: {
                          color: "quad",
                          padding: {
                            y: "1.3vh",
                            x: "2.2vh",
                          },
                          width: "100%",
                        },
                    },
                },
                dropdowns: {
                    calendars: {
                        background: {
                            width: "100%",
                            color: "accent",
                            border: {
                                width: "0px",
                                style: "solid",
                                color: "secondary",
                                radius: "0px"
                            },
                            padding: {
                                y: "10px",
                                x: "10px"
                            }
                        },
                        text: {
                            fontFamily: "primary",
                            color: "secondary"
                        },
                        monthText: {
                            weight: "bold",
                            color: "secondary",
                            fontSize: {
                                mobile: "2.2vh",
                                desktop: "2.2vh",
                            },
                            fontFamily: "primary",
                            letterSpacing: "0px"
                        },
                        toggleMonthIcon: {
                            color: "secondary",
                            fontSize: "1.5rem"
                        },
                        weekday: {
                            text: {
                                fontSize: "2vh",
                                weight: "normal",
                                textDecoration: "uppercase",
                                color: "secondary"
                            },
                            underlineColor: {
                                color: "secondary"
                            }
                        },
                        date: {
                            text: {
                                color: "secondary",
                                fontFamily: "primary",
                                weight: "normal",
                                fontSize: "1rem"
                            },
                            background: {
                                color: "tranparent",
                                padding: {
                                    y: "1vh",
                                    x: "0vh"
                                },
                                border: {
                                    width: "0px",
                                    style: "solid",
                                    color: "secondary",
                                    radius: "3px"
                                }
                            }
                        },
                        todayDate: {
                            background: {
                                color: "transparent",
                                padding: {
                                    y: "1vh",
                                    x: "0vh"
                                },
                                border: {
                                    width: "1px",
                                    style: "solid",
                                    color: "secondary",
                                    radius: "100%"
                                }
                            },
                            text: {
                                fontFamily: "primary",
                                fontSize: "1rem"
                            }
                        },
                        selectedDate: {
                            background: {
                                color: "secondary",
                                padding: {
                                    y: "1vh",
                                    x: "0vh"
                                },
                                border: {
                                    width: "1px",
                                    style: "solid",
                                    color: "secondary",
                                    radius: "100%"
                                }
                            },
                            text: {
                                color: "accent",
                                fontFamily: "primary",
                                weight: "bold",
                                fontSize: "1rem"
                            }
                        },
                        neighbouringMonth: {
                            color: "gray"
                        }
                    },
                    rentalsDropdown: {
                        background: {
                            // width: {
                            //     mobile: "100%",
                            //     desktop: "100%"
                            // },
                            color: "primary",
                            border: {
                                width: "1px",
                                style: "solid",
                                color: "secondary",
                                radius: "5px"
                            },
                            padding: {
                                y: "10px",
                                x: "10px"
                            }
                        },
                        text: {
                            fontFamily: "primary",
                            color: "secondary"
                        },
                        // toggleIcon: {
                        //     color: "secondary",
                        //     fontSize: "1.5rem"
                        // },
                    },
                }
            },
        },
        packages: {
            background: {
                image: ["https"],
                color: "primary",
                width: {
                    mobile: "100%",
                    desktop: "80%"
                },
                padding: {
                    x: {
                        mobile: "1vh",
                        desktop: "0vh"
                    },
                    y: {
                        mobile: "3vh",
                        desktop: "5vh"
                    },
                },
            },
            text: {
                heading: {
                    input: "Packages",
                    fontFamily: "secondary",
                    color: "secondary",
                    fontSize: {
                        mobile: "2.5rem",
                        desktop: "3.5rem"
                    },
                    weight: "bold"
                },
                subheading: {
                    input: "Buy packages and start booking!",
                    fontFamily: "secondary",
                    color: "secondary",
                    fontSize: {
                        mobile: "1.5rem",
                        desktop: "2rem"
                    },
                    weight: "normal"
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
                    weight: "bold",
                },
                width: {
                    mobile: "100%",
                    desktop: "70%",
                },
                alignment: "center",
                underlineColor: "secondary",
                selectedColor: "secondary",
            },
            card: {
                background: {
                    color: "primary",
                },
                text: {
                    name: {
                        fontFamily: "secondary",
                        fontSize: {
                            mobile: "2.5vh",
                            desktop: "2.8vh"
                        },
                        color: "secondary",
                        weight: "bold"
                    },
                    price: {
                        fontFamily: "secondary",
                        fontSize: {
                            mobile: "3vh",
                            desktop: "4.2vh"
                        },
                        color: "secondary",
                        weight: "bold"
                    },
                    details: {
                        fontFamily: "primary",
                        fontSize: {
                            mobile: "2vh",
                            desktop: "2.2vh"
                        },
                        color: "secondary",
                        weight: "normal"
                    }
                },
                button: {
                    show: true,
                    style: {
                        text: {
                            input: "Buy Now",
                            fontFamily: "secondary",
                            color: "primary",
                            fontSize: "1.2em",
                            fontWeight: "bold",
                            letterSpacing: "0px"
                        },
                        background: {
                            width: "190px",
                            color: "accent",
                            shadow: true,
                            border: {
                            width: "3px",
                            style: "solid",
                            color: "primary",
                            radius: "0px"
                            }
                        }
                    },
                    position: "center"
                },
                border: {
                    show: "true",
                    color: "secondary",
                }
            }
        },
        book: {
            variation: "bookWithContrastColor",
            background: {
                color: "secondary",
                padding: {
                    x: {
                        mobile: "0vh",
                        desktop: "5vh"
                    },
                    y: {
                        mobile: "0vh",
                        desktop: "0vh"
                    },
                },
                headingAndButton: {
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
                }
            },
            text: {
                heading: {
                    input: "Book An Appointment",
                    fontFamily: "secondary",
                    color: "primary",
                    fontSize: {
                        mobile: "2.5rem",
                        desktop: "3.5rem"
                    },
                    weight: "bold"
                }
            },
            button: {
                text:  {
                    input: "View All Services",
                    fontFamily: "secondary",
                    color: "accent",
                    fontSize: "1.2em",
                    weight: "bold",
                    letterSpacing: "0px",
                },
                background: {
                    color: "primary",
                    padding: {
                        x: "10px",
                        y: "10px"
                    },
                    width: {
                        mobile: "80%",
                        desktop: "fit-content"
                    },
                    border: {
                        width: "3px",
                        style: "solid",
                        color: "secondary",
                        radius: "0px"
                    }
                }
            }
        }
    }
}


const card = {
    variaton: "popularDonationCard",
    stack: {
      mobile: "column",
      desktop: "column"
    },
    background: {
      color: "transparent",
      height: {
        mobile: "60vh",
        desktop: "60vh"
      },
      border: {
        width: "0vh",
        color: "primary",
        style: "solid",
        radius: "0vh"
      }
    },
    image: {
      urls: [],
      height: {
        mobile: "75%",
        desktop: "100%"
      },
      width: {
        mobile: "100%",
        desktop: "100%"
      },
      border: {
        width: "0vh",
        color: "primary",
        style: "solid",
        radius: "1.3vh"
      }
    },
    markingButton: {
      background: {
        color: "secondary",
        padding: {
          x: "10px",
          y: "5px"
        },
        border: {
          color: "primary"
        }
      },
      text: {
        color: "secondary"
      }
    },
    textAndButton: {
      background: {
        padding: {
          x: "1rem",
          y: "1rem"
        }
      },
      text: {
        name: {
          fontSize: {
            mobile: "2.600000000000001vh",
            desktop: "2.8vh"
          },
          color: "secondary",
          weight: "bold",
          underline: {
            show: false,
            color: "primary",
            width: "50%",
            style: "solid",
            thickness: "2px",
            marginTop: "10px"
          },
          fontFamily: "primary",
          position: "center"
        },
        description: {
          fontSize: {
            mobile: "2.600000000000001vh",
            desktop: "2.8vh"
          },
          color: "secondary",
          weight: "bold",
          fontFamily: "primary",
        },
        position: "center"
      },
      button: {
        show: {
          mobile: "always",
          desktop: "on-hover"
        },
        function: "bookAppointment",
        style: {
          text: {
            input: "ADD TO CART",
            fontFamily: "secondary",
            color: "primary",
            fontSize: ".85em",
            weight: "bold",
            letterSpacing: "0px"
          },
          background: {
            height: "",
            width: "70%",
            color: "secondary",
            shadow: true,
            border: {
              width: "0px",
              style: "solid",
              color: "primary",
              radius: "0px"
            },
            padding: {
              x: "6px",
              y: "8px"
            }
          }
        },
        position: "center"
      }
    }
};
  
  