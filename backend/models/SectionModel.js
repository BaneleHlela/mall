import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Section name is required"],
    },
    variation: {
        type: String,
        required: [true, "Section variation is required"],
    },
    layout: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Section layout is required"],
    },
    images: {
        mobile: {
            type: String,
            required: [true, "Mobile image is required"],
        },
        desktop: {
            type: String,
            required: [true, "Desktop image is required"],
        },
    }
});

const Section = mongoose.model("Section", sectionSchema);
export default Section;