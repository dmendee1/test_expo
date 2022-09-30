import wallet from "../wallet/promise";
import config from "../../../config/config.json";

export default function monpay(req, res) {
    wallet.promiseGetUserIInfo(config.miniapp.api.getUserInfo, req.query.token).then(result => {
        console.log(JSON.parse(result));
        res.send(JSON.parse(result));
        // logger.responseData(result);
    }).catch(err => {
        // logger.writeErrorLog(err);
        res.json(err);
    })
    // res.status(200).json({ name: 'John Doe' })
}