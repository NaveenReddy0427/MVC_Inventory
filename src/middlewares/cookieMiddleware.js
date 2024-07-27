const lastVisit = (req, res, next) => {
    const cookieName = 'lastVisit'; // Use a string as the cookie name

    if (req.cookies[cookieName]) {
        res.locals.lastVisit = new Date(req.cookies[cookieName]).toLocaleString();
    }
    
    res.cookie(cookieName, new Date().toISOString(), {
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });
    
    next();
}

export default lastVisit;
