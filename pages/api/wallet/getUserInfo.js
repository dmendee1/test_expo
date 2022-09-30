import config from "../../../config/config.json";
import wallet from "./promise";
import { validationUserData } from "../validator";

export default function monpay(req, res) {
    let data = req.body;

    if (req.method === 'POST') {
        // console.log(JSON.parse(req.body).id);
        console.log(data);
        try {
            validationUserData(data, res);
            getUserData(data, res);
        } catch (error) {
            res.status(400).json({ "msg": error.message });
        }
    } else {
        res.status(404).json({ "msg": "Not found" });
    }
}

function getUserData(data, res) {
    wallet.promiseGetUserLandmap(config.wallet.api.userLandmap, data).then(result => {
        let resultData = JSON.parse(result);
        // logger.httpUrl(config.wallet.api.userLandmap, data);
        if (resultData.result != undefined) {
            res.send(resultData.result);
            // logger.responseData(resultData.result);
        } else {
            res.send(resultData);
            // logger.responseData(resultData);aa
        }
        // logger.responseData(resultData.result);
    }).catch(err => {
        console.log(err);
        // logger.writeErrorLog(err);
        res.send("Failed");
    })
}