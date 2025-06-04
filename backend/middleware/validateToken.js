import jwt from "jsonwebtoken"

export const validateToken = (req, res, next) => {
    const token = req.cookies.token;
    try {
        if(!token){
            return res.status(401).json({
                status: "failed",
                message: "Unauthorized: Missing Token" 
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        if(!decoded) {
            return res.status(401).json({
                status: "failed",
                message: "Unauthorized: Invalid Token" 
            });
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("Error validating token ", error);
        return res.status(401).json({
            status: "failed",
            message: "Unauthorized: Invalid Token" 
        });
    }
}