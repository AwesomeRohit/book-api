export const isAdmin = async (req, res, next) => {

    const { email } = req.body;

    try {

        if (!email) return res.status(500).json({ message: "Youre not admin!" })

        if (email === process.env.ADMIN) {
            console.log("Admin User Logged in", email);
            return next()
        }


        return res.status(403).json({ message: "Access denied. Admins only." });

    } catch (error) {
        console.error("Error checking admin:", error.message);
        res.status(500).json({ error: "Internal server error." });
    }

}