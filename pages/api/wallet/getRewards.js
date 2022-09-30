import config from "../../../config/config.json";
import wallet from "./promise";

export default function monpay(req, res) {
    let data = {
        phone: req.query.phone
    }
    console.log(data);
    console.log(config.wallet.api.getRewards);
    wallet.promiseGetRewards(config.wallet.api.getRewards, data).then(result => {
        let resultData = JSON.parse(result);
        // logger.httpUrl(config.wallet.api.userLandmap, data);
        if (resultData.result != undefined) {
            res.send(resultData.result);
            // logger.responseData(resultData.result);
        } else {
            res.send(resultData);
            // logger.responseData(resultData);
        }
        // logger.responseData(resultData.result);
    }).catch(err => {
        console.log(err);
        // logger.writeErrorLog(err);
        res.send("Failed");
    })
}