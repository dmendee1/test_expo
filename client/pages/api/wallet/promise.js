const config = require("../../../config/config.json");
const http = require("http");
const querystring = require("query-string");

promiseGetUserLandmap = (path, data) => {
    return new Promise(function(resolve, reject) {
        var option = {
            host: config.wallet.host,
            port: config.wallet.port,
            path: path + "?" + querystring.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'mn',
                'Authorization': 'Basic ' + config.wallet.authorization
            }
        }

        const req = http.get(option, res => {
            console.log(`statusCode: ${res.statusCode}`)
            
            res.on('data', d => {
                resolve(d);
            })
        })
        
        req.on('error', error => {
            console.error(error)
        })
        req.end()
    })
}

promiseGetRewards = (path, data) => {
    return new Promise(function(resolve, reject) {
        var option = {
            host: config.wallet.host,
            port: config.wallet.port,
            path: path + "?" + querystring.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'mn',
                'Authorization': 'Basic ' + config.wallet.authorization
            }
        }

        const req = http.get(option, res => {
            console.log(`statusCode: ${res.statusCode}`)
            
            res.on('data', d => {
                resolve(d);
            })
        })
        
        req.on('error', error => {
            console.error(error)
        })
        req.end()
    })
}

promiseGetBigReward = (path, data) => {
    console.log("data");
    console.log(data);
    return new Promise(function(resolve, reject) {
        var option = {
            host: config.wallet.host,
            port: config.wallet.port,
            path: path + "?" + querystring.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'mn',
                'Authorization': 'Basic ' + config.wallet.authorization
            }
        }

        const req = http.get(option, res => {
            console.log(`statusCode: ${res.statusCode}`)
            
            res.on('data', d => {
                resolve(d);
            })
        })
        
        req.on('error', error => {
            console.error(error)
        })
        req.end()
    })
}

promiseGetAccessToken = (path, code) => {
    let data = {
        redirect_uri: config.miniapp.redirectUrl,
        client_id: config.miniapp.clientId,
        client_secret: config.miniapp.clientSecret,
        grant_type: config.miniapp.grantType,
        code: code
    }
    return new Promise(function(resolve, reject) {
        var option = {
            host: config.wallet.host,
            port: config.wallet.port,
            path: path + "?" + querystring.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept-Language': 'mn',
            }
        }
        const req = http.request(option, res => {
            console.log(`statusCode: ${res.statusCode}`)
            
            res.on('data', d => {
                resolve(d);
            })
        })
        
        req.on('error', error => {
            console.error(error)
        })

        console.log("end");
        req.end()
    })
}

promiseGetUserIInfo = (path, authorization) => {
    return new Promise(function(resolve, reject) {
        console.log("aaaa");
        var option = {
            host: config.wallet.host,
            port: config.wallet.port,
            path: path,
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'mn',
                'Authorization': 'Bearer ' + authorization
            }
        }

        console.log("bbbb");
        const req = http.get(option, res => {
            console.log(`statusCode: ${res.statusCode}`)
            
            res.on('data', d => {
                resolve(d);
            })
        })
        
        req.on('error', error => {
            console.error(error)
        })
        
        console.log("end");
        req.end()
    })
}

function customFunction(userid, userphone) {
    let data = {
        id: userid,
        phone: userphone
    }
    promiseGetUserLandmap(config.wallet.api.userLandmap, data).then(result => {
        console.log(JSON.parse(result).result);
        return JSON.parse(result).result;
    }).catch(err => {
        return "Failed";
    });
}

module.exports = {customFunction, promiseGetUserLandmap, promiseGetRewards, promiseGetBigReward, promiseGetAccessToken, promiseGetUserIInfo}
