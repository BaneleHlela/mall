import SearchPost from "../models/SearchPostModel.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { sortSearchPostsByLikelihood } from "../utils/helperFunctions.js";

// Create a new search post
export const createSearchPost = asyncHandler(async (req, res) => {
    const { variation, type, departments, stores, products, services, style, likelihoodIndex } = req.body;

    const searchPost = new SearchPost({
        variation,
        type,
        departments,
        stores,
        products,
        services,
        style,
        likelihoodIndex,
        isActive: true
    });

    await searchPost.save();
    res.status(201).json(searchPost);
});

// Get search post by ID
export const getSearchPost = asyncHandler(async (req, res) => {
    const searchPost = await SearchPost.findById(req.params.id).populate('stores products services');
    if (!searchPost) {
        res.status(404);
        throw new Error("Search post not found");
    }
    res.json(searchPost);
});

// Edit search post
export const editSearchPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const searchPost = await SearchPost.findByIdAndUpdate(id, updates, { new: true });
    if (!searchPost) {
        res.status(404);
        throw new Error("Search post not found");
    }
    res.json(searchPost);
});

// Delete search post
export const deleteSearchPost = asyncHandler(async (req, res) => {
    const searchPost = await SearchPost.findById(req.params.id);
    if (!searchPost) {
        res.status(404);
        throw new Error("Search post not found");
    }

    await searchPost.deleteOne();
    res.json({ message: "Search post deleted" });
});

// Fetch all active search posts
export const fetchSearchPosts = asyncHandler(async (req, res) => {
    const searchPosts = await SearchPost.find({ isActive: true }).populate('stores products services');
    const sortedPosts = sortSearchPostsByLikelihood(searchPosts);
    res.json(sortedPosts);
});

// Update search post stats
export const updateSearchPostStats = asyncHandler(async (req, res) => {
    const { searchPostId } = req.params;
    const { clicks, likelihoodIndex } = req.body;

    const updateObj = {};

    if (clicks !== undefined) {
        updateObj['stats.clicks'] = clicks;
    }

    if (likelihoodIndex !== undefined) {
        updateObj['stats.likelihoodIndex'] = likelihoodIndex;
    }

    if (Object.keys(updateObj).length === 0) {
        res.status(400);
        throw new Error('No valid stats fields provided');
    }

    const searchPost = await SearchPost.findByIdAndUpdate(
        searchPostId,
        { $inc: updateObj },
        { new: true }
    );

    if (!searchPost) {
        res.status(404);
        throw new Error('Search post not found');
    }

    res.json(searchPost);
});