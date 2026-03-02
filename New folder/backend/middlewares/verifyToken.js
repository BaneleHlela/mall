import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
	try {
		const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

		if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

		req.userId = decoded.userId;
		next();
	} catch (error) {
		console.log("Error in verifyToken ", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};
