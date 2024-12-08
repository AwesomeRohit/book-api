import jwt from "jsonwebtoken"

export const  generateCookieAndSetToken = async (UserId, res) =>{
    const token = jwt.sign({UserId},process.env.JWT_SECRET, {
        expiresIn : "2d",
    })
    res.cookie("jwt", token, {
        maxAge : 15*24*60*1000,
        httpOnly: true, // it prevents XSS attacks (cross site scripting Attacks)
        samesite : "strict",
    });
}
export default generateCookieAndSetToken;

