import wallet from '../wallet/promise'
import config from "../../../config/config.json";

export default function monpay(req, res) {
    wallet.promiseGetAccessToken("/wallet-miniapp/oauth/token", req.query.code).then(result=> {
        if(JSON.parse(result).access_token != undefined && JSON.parse(result).access_token != null) {
            let red = config.frontend.host + ":" + config.frontend.port + "/newyear?code=" + JSON.parse(result).access_token + (req.query.action != null && req.query.action != undefined ? "&action=" + req.query.action : "");
            // logger.writeDebugLog(red);
            res.redirect(red);
        } else {
            // logger.responseData(JSON.parse(result));
            res.send(JSON.parse(result));
        }
    }).catch(err => {
        // logger.writeErrorLog(err);
        res.json(err);
    })
    // res.status(200).json({ name: 'John Doe' })
}