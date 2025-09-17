import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName:{
			type:String,
			required:true,
			index:true,
		},
		lastName:{
			type:String,
			required:true,
			index:true,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		role: {
			type:String,
			default: "user",
		},
		avatar: {
			type: String,
			default: "default-avatar-url.jpg",
		},
		cart: {
			type: Array,
			default: [],
		},
		stores: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Store',
		}],
		locations: [{
			nickname: {type: String},
			lat: Number,
			lng: Number,
			address: String,
		}],
    	wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
		favoriteStores: [{type: mongoose.Schema.Types.ObjectId, ref: "Store"}],
		isBlocked: {
			type:Boolean,
			default:false
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		googleId: {
			type: String,
			unique: false
		},
		facebookId: {
			type: String,
			unique: false
		},
		resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
		verificationToken: String,
		verificationTokenExpiresAt: Date,
	},
	{ timestamps: true }
);

// Pre-save hook to hash password before saving to database
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		next(error);
	}
});

// Add a compare passowrd method
userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};
const User = mongoose.model('User', userSchema);

export default User;