import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  const cookieOptions = {
    httpOnly: true,
    secure: true, // Always use secure in production
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    path: '/',
  };

  // Set the cookie
  res.cookie("token", token, cookieOptions);

  // Send the response
  return res.status(200).json({
    success: true,
    message,
    user
  });
};
