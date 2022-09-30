import React from "react";
import LottieControl from "../LottieControl";
import loadingLottie from "../../../public/santa.json";
import greeting1 from "../../../public/greeting/1.png";
import greeting2 from "../../../public/greeting/2.png";
import greeting3 from "../../../public/greeting/3.png";
import greeting4 from "../../../public/greeting/4.png";
import greeting5 from "../../../public/greeting/5.png";
import greeting6 from "../../../public/greeting/6.png";
import greeting7 from "../../../public/greeting/7.png";
import greeting8 from "../../../public/greeting/8.png";
import failImage from "../../../public/beleggrayscale.png"
import config from "../../../config/config.json";
import styles from '../../../styles/RandomBigReward.module.css'
import Modal from "../Modal"
import axios from 'axios';
import Image from 'next/image';

function renderAlarm(text, buttonText) {
    return <div style={{ position: 'absolute', transform: 'translateX(250%) translateY(120%)' }}><Modal icon={greeting1} buttonText={buttonText} open={true} description={text} name="Уучлаарай" width="50px" height="50px" /></div>
}

export default class RandomBigReward extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            expired: false,
            dailyLimit: false,
            isLoading: true,
            failure: false,
            isdn: props.isdn,
            userid: props.userid,
            day: props.day,
            isRewarded: false,
            already: false,
            rewardId: props.rewardId,
            rewardDto: props.rewardDto,
            rewardList: null,
            greetingImage: '',
            text: ''
        }
    }

    myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    printRewardName(rewardDto) {
        if (rewardDto != null && rewardDto != undefined && rewardDto.rewardType != null && rewardDto.rewardType != undefined && this.state.failure !== true) {
            return (
                <div>
                    <center><Image className={styles.imagecom} loader={this.myLoader} src={this.state.rewardDto.rewardType !== "NONE" ? rewardDto.rewardImage : this.state.greetingImage} width="300%" height="230%" /></center>
                    <p style={{ textAlign: 'center', textJustify: 'inter-word' }}>
                        {this.state.rewardDto.rewardType !== "NONE" ? this.state.already === true ? config.expo.rewardsuccess.find(e => e.type === rewardDto.rewardType).last : config.expo.rewardsuccess.find(e => e.type === rewardDto.rewardType).first : this.state.text}
                    </p>
                </div>
            );
        } else {
            <div>
                <center><Image className={styles.imagecom} loader={this.myLoader} src={this.state.greetingImage} width="300%" height="100%" /></center>
                <p style={{ textAlign: 'center', textJustify: 'inter-word' }}>
                    {config.expo.rewardsuccess.find(e => e.type === "FAILED").first}
                </p>
            </div>
        }
    }

    printFail(text) {
        return (
            <div>
                <Image className="imagecom" style={{ borderRadius: '5px' }} loader={this.myLoader} src={failImage} width="230%" height="230%" />
                <p>{text}</p>
            </div>
        );
    }

    chooseBigReward1(rewardId) {
        alert(this.state.userid + "," + this.state.isdn + "," + rewardId);
    }

    getRandomGreeting() {
        let randomNum = Math.floor(Math.random() * 8);
        let image = null;
        switch (randomNum) {
            case 0:
                image = greeting1;
                break;
            case 1:
                image = greeting2;
                break;
            case 2:
                image = greeting3;
                break;
            case 3:
                image = greeting4;
                break;
            case 4:
                image = greeting5;
                break;
            case 5:
                image = greeting6;
                break;
            case 6:
                image = greeting7;
                break;
            case 7:
                image = greeting8;
                break;
            default:
                image = greeting1;
                break;
        }
        console.log("randomNum: " + randomNum);
        this.setState({
            greetingImage: image,
            text: config.expo.greetingsList[randomNum].message
        })
    }

    componentDidMount() {
        if (this.state.rewardId == null || this.state.rewardId == undefined) {
            var headConfig = {
                headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET' },
            };

            console.log("didmount");
            let data = {
                id: this.state.userId,
                phone: this.state.isdn,
                rewardId: 0
            }
            axios.post("/api/wallet/getBigReward", data, headConfig).then(result => {
                let responseData = result.data;
                if (responseData == null || responseData === "") {
                    setTimeout(() => {
                        this.setState({
                            failure: true,
                            isLoading: false,
                        })
                        this.props.setModalInitial("Баярлалаа");
                        this.props.setButtonInitital("Хаах");
                    }, 3000);
                } else {
                    console.log(responseData.result);
                    if (responseData.code === "UNAUTHORIZED") {
                        console.log("GG");

                    } else {
                        console.log("SUCCESS");
                        console.log(responseData);
                        if (responseData.rewardId != undefined && responseData.rewardDto != undefined) {
                            this.setState({
                                rewardId: responseData.rewardId,
                                rewardDto: responseData.rewardDto
                            })
                            if (this.state.rewardId === 5) {
                                this.getRandomGreeting();
                            }
                            this.props.setInitialFunc(responseData.rewardId, responseData.rewardDto);
                            setTimeout(() => {
                                this.setState({
                                    isRewarded: true,
                                    isLoading: false,
                                })
                                this.props.setModalInitial(this.state.rewardDto != undefined && this.state.rewardDto.rewardName === "NONE" ? "Мэндчилгээ" : "Таны бэлэг");
                                this.props.setButtonInitital("Баярлалаа");
                            }, 3000);
                        } else {
                            if (responseData.info != undefined) {
                                if (responseData.code !== 200) {
                                    setTimeout(() => {
                                        this.setState({
                                            isLoading: false,
                                            expired: true
                                        })
                                        this.props.setModalInitial("Баярлалаа");
                                        this.props.setButtonInitital("Хаах");
                                    }, 3000);
                                } else {
                                    if (responseData.info === "ictexpo_landmap_expired") {
                                        setTimeout(() => {
                                            this.setState({
                                                isLoading: false,
                                                expired: true
                                            })
                                            this.props.setModalInitial("Баярлалаа");
                                            this.props.setButtonInitital("Хаах");
                                        }, 3000);
                                    } else if (responseData.info === "ictexpo_landmap_yondoo_failed" || responseData.info === "ictexpo_landmap_reward_not_found") {
                                        setTimeout(() => {
                                            this.setState({
                                                isLoading: false,
                                                failure: true
                                            })
                                            this.props.setModalInitial("Баярлалаа");
                                            this.props.setButtonInitital("Хаах");
                                        }, 3000);
                                    } else if (responseData.info === "ictexpo_landmap_daily_limit") {
                                        setTimeout(() => {
                                            this.setState({
                                                isLoading: false,
                                                dailyLimit: true
                                            })
                                            this.props.setModalInitial("Баярлалаа");
                                            this.props.setButtonInitital("Хаах");
                                        }, 3000);
                                    } else {

                                    }
                                }
                            }
                        }
                    }
                }
            }).catch(function (error) {
                console.log(error);
            })
        } else {
            if (this.state.rewardId === 5) {
                this.getRandomGreeting();
            }
            setTimeout(() => {
                this.setState({
                    isRewarded: true,
                    isLoading: false,
                    already: true
                })
                this.props.setModalInitial(this.state.rewardDto.rewardName === "NONE" ? "Мэндчилгээ" : "Таны бэлэг");
                this.props.setButtonInitital("Баярлалаа");
            }, 3000);
        }
    }

    render() {
        return (
            <div style={{ background: "transparent" }}>
                <center>
                    {this.state.isLoading === true ? <LottieControl width="100%" height="100%" animationData={loadingLottie} /> : ""}
                    <div>
                        {this.state.failure === true ? <div>{this.printFail(config.newyear.failure)}</div> : ""}
                        {this.state.expired === true ? <div>{this.printFail(config.newyear.expired)}</div> : ""}
                        {this.state.dailyLimit === true ? <div>{this.printFail(config.newyear.dailyLimit)}</div> : ""}
                    </div>
                    {/* {this.state.isRewarded == false && this.state.isLoading === false && this.state.rewardList != null && this.state.rewardList != undefined && this.state.rewardList.map((item, idx) => {
                    return <div key={idx}>{this.printRewards(item)}</div>;
                })} */}

                    {this.state.isRewarded == true && this.state.failure !== true && this.state.expired !== true && this.state.dailyLimit !== true ? <div>{this.printRewardName(this.state.rewardDto)}</div> : ""}
                </center>
            </div>
        )
    }
}