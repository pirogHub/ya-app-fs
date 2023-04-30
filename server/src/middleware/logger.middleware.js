const logger = (req, res, next) => {
    // console.log("---", req);
    const date = new Date(Date.now()).toLocaleString()
    // console.log("---",
    //     (date),
    //     "---",
    //     req.originalUrl,
    //     req.method,
    //     req.headers['x-forwarded-for'] || req.socket.remoteAddress,

    // );


    next()
}

module.exports = logger