import User from "../models/UserModel.js";
import Store from "../models/storeModel.js";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

export const protectRoute = async (req, res, next) => {
	try {
		const accessToken = req.cookies.accessToken;

		if (!accessToken) {
			return res.status(401).json({ message: "Unauthorized - No access token provided" });
		}

		try {
			const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
			const user = await User.findById(decoded.userId).select("-password");

			if (!user) {
				return res.status(401).json({ message: "User not found" });
			}

			req.user = user;

			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				return res.status(401).json({ message: "Unauthorized - Access token expired" });
			}
			throw error;
		}
	} catch (error) {
		console.log("Error in protectRoute middleware", error.message);
		return res.status(401).json({ message: "Unauthorized - Invalid access token" });
	}
};

export const isAdmin = expressAsyncHandler( async (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403); //Forbidden status code
        throw new Error("Access denied. Admins only.");
    }
});

// checkBlocked
export const checkBlocked = expressAsyncHandler( async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email: email })
    if (user && user.isBlocked) {
        res.status(403);
        throw new Error("Your account is blocked.");
    }

    next();
});

export const isStoreAdmin = async (req, res, next) => {
    try {
        const { storeId } = req.params;
        const userId = req.user?._id;


        if (!userId) {
            return res.status(401).json({ message: 'User ID missing from request. Check authentication middleware.' });
        }

        const store = await Store.findById(storeId).select('team');

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        const teamMember = store.team.find((member) => {
            if (!member?.member) return false;
			const memberString = member.member.toString();
			const userIdString = userId.toString();
            return (
                memberString == userIdString &&
                (member.role === 'manager' || member.role === 'owner')
            );
        });

        if (!teamMember) {
            return res.status(403).json({ message: 'Access denied. You are not authorized to perform this action.' });
        }

        next();
    } catch (error) {
        console.error('Middleware error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


