export const checkAdmin = (req, res, next) => {
    const { role } = req.user;
    if (role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
}