export default (app, port) => {
    app.enable('trust proxy');
    app.use((req, res, next) => {
        if (req.secure) next();

        res.redirect(`https://${req.headers.host}${req.url}`);
    });

    app.listen(port);
}