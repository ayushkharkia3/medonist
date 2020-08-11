exports.get404 = (req, res, next) => {
    res.status(404).send('404');
};

exports.get500 = (req, res, next) => {
    res.status(500).send('500');
}