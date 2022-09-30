function validation(data) {
    if (data.id != undefined && data.id != null) {

    } else {
        throw new Error("id is null or empty");
        // res.status(400).json({ "code": 1, "msg": "id is null or empty" });
    }
    if (data.phone != undefined && data.phone != null) {

    } else {
        throw new Error("phone is null or empty");
        // res.status(400).json({ "code": 1, "msg": "phone is null or empty" });
    }
    if (data.rewardId != undefined && data.rewardId != null) {

    } else {
        throw new Error("rewardId is null or empty");
        // res.status(400).json({ "code": 1, "msg": "rewardId is null or empty" });
    }
}

function validationUserData(data) {
    if (data.id != undefined && data.id != null) {

    } else {
        throw new Error("id is null or empty");
    }
    if (data.phone != undefined && data.phone != null) {

    } else {
        throw new Error("phone is null or empty");
    }
}

module.exports = { validation, validationUserData }
