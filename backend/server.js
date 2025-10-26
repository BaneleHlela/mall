import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import cors from "cors";

import { dbConnect } from "./config/dbConnect.js";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import { notFound, errorHandler } from "./middlewares/errorHandling.js";

// Importing routes
import OAuthRoutes from "./routes/OAuthRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import storeLayoutRoutes from "./routes/storeLayoutRoutes.js";
import storeRoutes from './routes/storeRoutes.js';
import storeDashboardRoutes from "./routes/storeDashboardRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import sectionRoutes from "./routes/sectionRoutes.js";
import posterRoutes from "./routes/posterRoutes.js"

import "./config/passportConfig.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); // Allow us to pass incoming cookies
app.use(cors(corsOptions));



if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Session setup (required for Passport to work)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(passport.initialize());
app.use(passport.session());


app.use("/api/user", userRoutes);
app.use("/api/auth", OAuthRoutes);
app.use("/api/layouts", storeLayoutRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/store-dashboard", storeDashboardRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/packages", packageRoutes);
app.use('/api/products', productRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/sections", sectionRoutes);
app.use('/api/posters', posterRoutes);

app.get('/', (req, res) => {
  res.send('API is working 🚀');
});

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    dbConnect();
});
