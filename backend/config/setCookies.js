export const setCookies = (res, accessToken, refreshToken) => {
	const isProduction = process.env.NODE_ENV === "production";

	console.log(isProduction ? "Setting cookies for production" : "Setting cookies for development");

	res.cookie("accessToken", accessToken, {
		httpOnly: true,
		secure: isProduction,
		sameSite: isProduction ? "none" : "lax",
		maxAge: 15 * 60 * 1000,
		domain: isProduction ? "themallbeta.com" : "localhost",
	});
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: isProduction,
		sameSite: isProduction ? "none" : "lax",
		maxAge: 7 * 24 * 60 * 60 * 1000,
		domain: isProduction ? "themallbeta.com" : "localhost",
	});
};
