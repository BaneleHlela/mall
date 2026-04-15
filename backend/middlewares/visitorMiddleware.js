import { v4 as uuidv4 } from "uuid";

export const visitorMiddleware = (req, res, next) => {
    const isProduction = process.env.NODE_ENV === "production";
    let visitorId = req.cookies?.visitorId;

    if (!visitorId) {
        visitorId = uuidv4();

        res.cookie("visitorId", visitorId, {
            httpOnly: true,      
            secure: isProduction, // true in production (HTTPS)
            maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
            sameSite: isProduction ? "none" : "lax",
            domain: isProduction ? "themallbeta.com" : "localhost",
        });
    }

    req.visitorId = visitorId; // attach to request
    
    next();
};