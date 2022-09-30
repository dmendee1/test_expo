import wallet from './wallet/promise'
import config from "../../config/config.json";

export default function monpay(req, res) {
    console.log(req.query);
    let portocol = req.headers[ "x-forwarded-proto"] || req.connection.encrypted ? "https" : "http";
    wallet.promiseGetAccessToken(config.miniapp.api.accessToken, req.query.code).then(result => {
        console.log(result);
        let resData = JSON.parse(result);
        console.log(resData);
        if (resData.access_token != undefined && resData.access_token != null) {
            console.log("1");
            let red = portocol + "://" + req.headers.host + "/newyear?code=" + resData.access_token + (req.query.action != null && req.query.action != undefined ? "&action=" + req.query.action : "");
            console.log(red);
            // logger.writeDebugLog(red);
            // res.setHeader('Content-Type', 'application/json')
            res.redirect(red);
        } else {
            console.log("2");
            // logger.responseData(JSON.parse(result));
            res.send(JSON.parse(result));
            // let red = portocol + "://" + req.headers.host + "/newyear?code=" + req.query.code + (req.query.action != null && req.query.action != undefined ? "&action=" + req.query.action : "");
            // console.log(red);
            // res.redirect(red);
        }
        res.redirect("www.google.mn");
    }).catch(err => {
        // logger.writeErrorLog(err);
        res.json(err);
    })
}