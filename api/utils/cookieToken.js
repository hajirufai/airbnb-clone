const cookieToken = (user, res) => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + Number(process.env.COOKIE_TIME || 7) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    };


    user.password = undefined;
    res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user
    });
};

module.exports = cookieToken;
