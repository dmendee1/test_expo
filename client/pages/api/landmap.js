import { setup, promiseGetAccessToken } from 'monpay-miniapp'
import config from "../../config/config.json";

export default function monpay(req, res) {
    console.log(req.query);
    setup('test');
    let portocol = req.headers["x-forwarded-proto"] || req.connection.encrypted ? "https" : "http";
    promiseGetAccessToken(config.miniapp.redirectUrl, config.miniapp.clientId, config.miniapp.clientSecret, req.query.code).then(result => {
        console.log(result.access_token);
        // let resData = JSON.parse(result);
        // console.log(resData);
        if (result.access_token != undefined && result.access_token != null) {
            console.log("1");
            let red = portocol + "://" + req.headers.host + "/app?code=" + result.access_token + (req.query.action != null && req.query.action != undefined ? "&action=" + req.query.action : "");
            console.log(red);
            // logger.writeDebugLog(red);
            res.redirect(red);
        } else {
            console.log("2");
            // logger.responseData(JSON.parse(result));
            res.send(JSON.parse(result));
        }
        res.redirect("www.google.mn");
    }).catch(err => {
        // logger.writeErrorLog(err);
        res.json(err);
    })
}