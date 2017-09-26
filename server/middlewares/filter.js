censored = ['poop', 'fetch', 'nasty']

module.exports = function (req, res, next) {
    while (censored.find(word => req.body.text.includes(word))) {
        const badWord = censored.find(word => req.body.text.includes(word));
        req.body.text = req.body.text.replace(badWord, '*'.repeat(badWord.length));
    }

    next();
};