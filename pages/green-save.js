import React from 'react';
import styles from '../styles/Green.module.css'
import axios from 'axios'
import config from "../config/config.json"
import { withRouter } from "next/router"
import Modal from "./components/Modal"
import giftLottie from '../public/gift4.json'
import loadingLottie from "../public/tree.json";
import LottieControl from './components/LottieControl';
import Info from '../public/icon.png';
import Beleg from '../public/beleg.png';
import Garchig from '../public/save_tree.png';
import Image from 'next/image';

function getUsername(state) {
  return state.username != undefined && state.username != null && state.username.length > 0 ? state.username : state.isdn;
}

function renderAlarm(text) {
  return <div style={{ position: 'absolute', transform: 'translateX(250%) translateY(120%)' }}><Modal icon={Day1} open={true} description={text} name="Уучлаарай" width="50px" height="50px" /></div>
}

class App extends React.Component {

  static getInitialProps({ query }) {
    return { query }
  }
  constructor(props, router) {
    super(props);
    this.state = {
      // code: router.query,
      isLoading: true,
      failure: false,
      token: props.query.code,
      action: props.query.action,
      username: '',
      isdn: '',
      userid: '',
      rewardDto: null,
      rewardId: null,
      bigReward: "INACTIVE",
      tasks: [],
      today: 1,
      playing: false,
      isMobicomEmployee: false
    };
    this.addRewardIdAndRewardDto = this.addRewardIdAndRewardDto.bind(this);
  }
  getReward(bigReward, isdn, userid, rewardId, rewardDto, setInitialFunc) {
    if (this.state.bigReward != null && this.state.bigReward != undefined) {
      let text = config.newyear.goPurchaseText;

      if (bigReward != null && bigReward != undefined && bigReward !== "INACTIVE") {
        return (
          <div className={styles.footer}>
            <center>
              <Modal lottieData={giftLottie} name="" buttonText="" setInitialFunc={setInitialFunc} bigRewardComp={bigReward} isdn={isdn} userid={userid} rewardId={rewardId} rewardDto={rewardDto} day={this.state.today} width="50%" height="50%" />
            </center>
          </div>
        )
      } else {
        return (
          <div className={styles.footer}>
            <center>
              <Modal lottieData={giftLottie} warning={Beleg} description={text} action="instruction" name="Даалгавар" buttonText="Ойлголоо" width="50%" height="50%" imageheight="150%" imagewidth="150%" />
            </center>
          </div>
        )
      }
    }
  }
  addRewardIdAndRewardDto(rewardId, rewardDto) {
    this.setState({
      rewardId: rewardId,
      rewardDto: rewardDto,
      bigReward: "REWARDED"
    });
  }
  
  componentDidMount() {
    var headConfig = {
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET' },
    };

    axios.get("/api/miniapp/getUserInfo?token=" + this.state.token, headConfig).then(result => {
      console.log(result);
      if (result.data != null && result.data.intCode !== 0) {
        this.setState({
          failure: false,
          isLoading: true,
        })
      } else {
        let responseData = result.data;
        console.log(responseData.result);
        if (responseData.code === "UNAUTHORIZED") {
          this.setState({
            failure: true,
            isLoading: false,
          })
        } else {
          this.setState({
            username: responseData.result.userFirstname,
            isdn: responseData.result.userPhone,
            userid: responseData.result.userId
          });

          var headConfig = {
            headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET' },
          };

          let data = {
            id: responseData.result.userId,
            phone: responseData.result.userPhone,
            action: this.state.action != null && this.state.action != undefined ? this.state.action : ""
          }

          axios.post("/api/wallet/getUserInfo", data, headConfig).then(result => {
            console.log(result);
            let resData = result.data;
            if (resData == null || resData === "") {
              this.setState({
                failure: true,
                isLoading: false,
              })
            } else {
              console.log(resData.bigReward);
              this.setState({
                bigReward: resData.bigReward,
                today: resData.todayDay,
                isMobicomEmployee: resData.isMobicomEmployee
              });
              if (this.state.bigReward != null && this.state.bigReward === "REWARDED") {
                this.setState({
                  rewardId: resData.rewardId,
                  rewardDto: resData.rewardDto
                });
              }
              setTimeout(() => {
                this.setState({
                  isLoading: false,
                })
              }, 2000);
            }
          })
        }
      }
    }).catch(function (err) {
      renderAlarm("Amjiltgui bolloo");
    })
  }


  render() {
    return (
      <div className={styles.container}>
        <h3 className={styles.headerclass}><i className={styles.name}>Тавтай морил: {getUsername(this.state)}</i> <span className={styles.info}><Modal icon={Info} open={true} description={config.newyear.instruction_green} introlink="https://team-y.vercel.app/home-mobile-app" action="instruction" name="Ногоон зээл" buttonText="Хаах" width="50%" height="50%" /></span></h3>
        {/* <Image src={Garchig} width="200%" height="100%" /> */}
        <div className={styles.main}>
          <div className={styles.maindev}>
            {/* {this.state.failure === true ? renderAlarm(config.newyear.failed) : ""} */}
            <center><h3 className={styles.headerclassdesc}><i className={styles.name}>Энэ бол ТАНЫ мод!</i></h3></center>
            <LottieControl width="400px" height="400px" animationData={loadingLottie} />
            <div className={styles.rewardicon}>
              {this.state.isLoading === false ? this.getReward(this.state.bigReward, this.state.isdn, this.state.userid, this.state.rewardId, this.state.rewardDto, this.addRewardIdAndRewardDto) : ""}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);