import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "../models/PostModel.js";

dotenv.config();

const posts = [
    { identifier: "welcome-to-mall", title: "Welcome to The Mall" },
    { identifier: "what-is-ecommerce", title: "What is E-Commerce?" },
    { identifier: "what-is-mvp", title: "What is MVP?" },
    { identifier: "mall-still-beta", title: "Mall Still in Beta" },
    { identifier: "you-can-invest", title: "You Can Invest" },
    { identifier: "look-out-for-red-flags", title: "Look Out for Red Flags" },
    { identifier: "diversify", title: "Diversify Your Portfolio" },
    { identifier: "why-invest", title: "Why Invest?" },
    { identifier: "image-consent", title: "Image Consent Notice" },
    { identifier: "mvp-announcement", title: "MVP Announcement" },
    { identifier: "launch-date", title: "Launch Date" },
    { identifier: "branding", title: "Branding" }
];

async function initializePosts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        for (const post of posts) {
            const existingPost = await Post.findOne({ identifier: post.identifier });
            if (!existingPost) {
                await Post.create(post);
                console.log(`Created post: ${post.identifier}`);
            } else {
                console.log(`Post already exists: ${post.identifier}`);
            }
        }

        console.log("All posts initialized!");
    } catch (error) {
        console.error("Error initializing posts:", error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

initializePosts();
