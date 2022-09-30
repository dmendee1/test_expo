import config from "../../../config/config.json";
import wallet from "./promise";
import { validation } from "../validator";

export default function monpay(req, res) {
    let data = req.body;


    if (req.method === 'POST') {
        try {
            validation(data, res);
            getBigReward(data, res);
        } catch (error) {
            res.status(400).json({ "code": 10, "info": error.message })
        }
    } else {
        res.status(404).json({ "msg": "Not found" });
    }
}

function getBigReward(data, res) {
    wallet.promiseGetBigReward(config.wallet.api.bigreward, data).then(result => {
        let resultData = JSON.parse(result);
        // logger.httpUrl(config.wallet.api.userLandmap, data);
        if (resultData.code === 0 && resultData.result != undefined) {
            res.send(resultData.result);
            // logger.responseData(resultData.result);
        } else {
            res.send(resultData);
            // logger.responseData(resultData);
        }
    }).catch(err => {
        console.log(err);
        // logger.writeErrorLog(err);
        res.status(400).send({ "iad": 1, "msg": "Failed" });
    })
}