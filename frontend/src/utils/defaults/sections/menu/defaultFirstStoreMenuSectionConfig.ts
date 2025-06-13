export const defaultFirstStoreMenuSectionConfig = {
    variation: "firstStoreMenuSection",
    backgroundColor: "white",
    text: {
        menuText:{
            input: "Our Delicious Menu",
            style: {
                mobile: {
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "#67bece",
                },
                desktop: {
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: "#67bece", 
                }  
            },
        },
        categoryText: {
            mobile: {
                fontSize: "1.5rem",
                fontWeight: "semibold",
                color: "#1f2937",
            },
            desktop: {
                fontSize: "2rem",
                fontWeight: "semibold",
                color: "#1f2937", 
            },
        },
    },
    storeCard: {
        itemNameText: {
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "#1f2937", 
        },
        itemPriceText: {
            fontSize: "1.125rem",
            fontWeight: "semibold",
            color: "#1f2937", 
        },
        itemDescriptionText: {
            fontSize: "0.875rem",
            color: "#4b5563", 
        },
    },
}