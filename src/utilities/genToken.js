import jwt from "jsonwebtoken"

export const  generateCookieAndSetToken = async (UserId, email, res) =>{
    const token = jwt.sign({UserId, email},process.env.JWT_SECRET, {
        expiresIn : "2d",
    })
    console.log(token);
    res.cookie("jwt", token, {
        maxAge : 15*24*60*1000,
        httpOnly: true, // it prevents XSS attacks (cross site scripting Attacks)
        samesite : "strict",
    });
}
export default generateCookieAndSetToken;

