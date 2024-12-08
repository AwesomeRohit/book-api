import redis from "../utilities/redis.js";
import jwt from "jsonwebtoken";

export const jwtAuthandSession = async (req, res, next) => {

    const token = req.headers.authorization?.split("")[1] || req.cookies.jwt;

    if (!token) return res.status(500).json({ message: "there is no token found!" })

    try {
        //verify by JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET,);
        console.log("Decoded JWT Payload:", decoded);

        //checking session in redis

        const sessionKey = (`session:${decoded.UserId}`);
        const sessionData =  await redis.get(sessionKey);

        console.log("Decoded User ID:", decoded.UserId);
        console.log("Session Key:", sessionKey);

        if (!sessionData) return res.status(501).json({ message: "session not found!" })

        req.user = { UserId: decoded.UserId, ...JSON.parse(sessionData) }

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }

}

