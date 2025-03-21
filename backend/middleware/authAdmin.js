import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;
        console.log("Received Token (atoken):", atoken);
        // Check if the token exists
        if (!atoken) {
            return res.json({ success: false, message: "Not Authorized. Login Again." });
        }
        // Verify the token
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

        // Check if the username in the token matches the admin email
        if (token_decode.username !== process.env.ADMIN_EMAIL.toLowerCase()) {
            return res.json({ success: false, message: "Not Authorized. Login Again." });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.log("Error in authAdmin middleware:", error);
        res.json({ success: false, message: "Invalid or expired token. Login Again." });
    }
};

export default authAdmin;