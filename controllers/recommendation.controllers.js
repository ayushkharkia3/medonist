const axios = require('axios');

exports.getRecommendation = (req, res, next) => {
    res.render('recommendation');
}

exports.postRecommendation = async(req, res, next) => {
    try {
        console.log(req.body);
        let name = [];
        if (req.body.s1) {
            name.push(req.body.s1);
        }
        if (req.body.s2) {
            name.push(req.body.s2);
        }
        if (req.body.s3) {
            name.push(req.body.s3);
        }
        const { data } = await axios.post(process.env.ML_URL + 'predict', {
            name
        });
        let x = [];
        console.log(data);
        for (let i = 0; i < name.length; i++) {
            let t = { symptom: name[i] }
            if (data[0][i]) {
                const keys = Object.keys(data[0][i]);
                t['doc'] = [keys[0], keys[1]]
            }
            if (data[1][i]) {
                const keys = Object.keys(data[1][i]);
                t['pat'] = [data[1][i][keys[0]], data[1][i][keys[1]]]
            }
            x.push(t);
        }
        res.render('recommendation2', { x });
    } catch (err) {
        next(err);
    }
}