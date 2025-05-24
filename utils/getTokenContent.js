import jwt from 'jsonwebtoken';

export const getTokenContents = (res, accessToken) => {
    if (!accessToken) {
        return res.status(401).json({ success: false, message: "No access token provided" });
    }

    const tokenContents = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Invalid access token" });
        }

        return user
    });

    return tokenContents;
}