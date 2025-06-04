import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({
            status: "failed",
            message: "Unauthorized: Missing Token"
        });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if(err) {
            return res.status(401).json({
                status: "failed",
                message: "Forbidden: Invalid Token"
            });
        }
        req.user = user;
        next();
    });
};