import React from 'react';
import styles from '../styles/NewYear.module.css'
import axios from 'axios'
import config from "../config/config.json"
import { withRouter } from "next/router"
import Modal from "./components/Modal"
import giftLottie from '../public/gift4.json'
import loadingLottie from "../public/santa.json";
import LDay1 from '../public/daysLottie/1.json';
import LDay2 from '../public/daysLottie/2.json';
import LDay3 from '../public/daysLottie/3.json';
import LDay4 from '../public/daysLottie/4.json';
import LDay5 from '../public/daysLottie/5.json';
import LDay6 from '../public/daysLottie/6.json';
import LDay7 from '../public/daysLottie/7.json';
import LDay8 from '../public/daysLottie/8.json';
import LDay9 from '../public/daysLottie/9.json';
import LDay10 from '../public/daysLottie/10.json';
import LDay11 from '../public/daysLottie/11.json';
import LDay12 from '../public/daysLottie/12.json';
import LDay13 from '../public/daysLottie/13.json';
import LDay14 from '../public/daysLottie/14.json';
import LDay15 from '../public/daysLottie/15.json';
import LDay16 from '../public/daysLottie/16.json';
import LDay17 from '../public/daysLottie/17.json';
import LDay18 from '../public/daysLottie/18.json';
import LDay19 from '../public/daysLottie/19.json';
import LDay20 from '../public/daysLottie/20.json';
import LDay21 from '../public/daysLottie/21.json';
import LDay22 from '../public/daysLottie/22.json';
import LDay23 from '../public/daysLottie/23.json';
import LDay24 from '../public/daysLottie/24.json';
import LDay25 from '../public/daysLottie/25.json';
import LDay26 from '../public/daysLottie/26.json';
import LDay27 from '../public/daysLottie/27.json';
import LDay28 from '../public/daysLottie/28.json';
import LDay29 from '../public/daysLottie/29.json';
import LDay30 from '../public/daysLottie/30.json';
import LDay31 from '../public/daysLottie/31.json';
import LottieControl from './components/LottieControl';
import Info from '../public/icon.png';
import Beleg from '../public/beleg.png';
import Garchig from '../public/Garchig.png';
import Day1 from '../public/days/1.png';
import Day2 from '../public/days/2.png';
import Day3 from '../public/days/3.png';
import Day4 from '../public/days/4.png';
import Day5 from '../public/days/5.png';
import Day6 from '../public/days/6.png';
import Day7 from '../public/days/7.png';
import Day8 from '../public/days/8.png';
import Day9 from '../public/days/9.png';
import Day10 from '../public/days/10.png';
import Day11 from '../public/days/11.png';
import Day12 from '../public/days/12.png';
import Day13 from '../public/days/13.png';
import Day14 from '../public/days/14.png';
import Day15 from '../public/days/15.png';
import Day16 from '../public/days/16.png';
import Day17 from '../public/days/17.png';
import Day18 from '../public/days/18.png';
import Day19 from '../public/days/19.png';
import Day20 from '../public/days/20.png';
import Day21 from '../public/days/21.png';
import Day22 from '../public/days/22.png';
import Day23 from '../public/days/23.png';
import Day24 from '../public/days/24.png';
import Day25 from '../public/days/25.png';
import Day26 from '../public/days/26.png';
import Day27 from '../public/days/27.png';
import Day28 from '../public/days/28.png';
import Day29 from '../public/days/29.png';
import Day30 from '../public/days/30.png';
import Day31 from '../public/days/31.png';
import Image from 'next/image';
import Warning from '../public/warning.json'

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
          failure: true,
          isLoading: false,
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

  getDayImage(day) {
    switch (day) {
      case 1:
        return Day1;
      case 2:
        return Day2;
      case 3:
        return Day3;
      case 4:
        return Day4;
      case 5:
        return Day5;
      case 6:
        return Day6;
      case 7:
        return Day7;
      case 8:
        return Day8;
      case 9:
        return Day9;
      case 10:
        return Day10;
      case 11:
        return Day11;
      case 12:
        return Day12;
      case 13:
        return Day13;
      case 14:
        return Day14;
      case 15:
        return Day15;
      case 16:
        return Day16;
      case 17:
        return Day17;
      case 18:
        return Day18;
      case 19:
        return Day19;
      case 20:
        return Day20;
      case 21:
        return Day21;
      case 22:
        return Day22;
      case 23:
        return Day23;
      case 24:
        return Day24;
      case 25:
        return Day25;
      case 26:
        return Day26;
      case 27:
        return Day27;
      case 28:
        return Day28;
      case 29:
        return Day29;
      case 30:
        return Day30;
      case 31:
        return Day31;
    }
  }

  getDayLottie(day) {
    switch (day) {
      case 1:
        return LDay1;
      case 2:
        return LDay2;
      case 3:
        return LDay3;
      case 4:
        return LDay4;
      case 5:
        return LDay5;
      case 6:
        return LDay6;
      case 7:
        return LDay7;
      case 8:
        return LDay8;
      case 9:
        return LDay9;
      case 10:
        return LDay10;
      case 11:
        return LDay11;
      case 12:
        return LDay12;
      case 13:
        return LDay13;
      case 14:
        return LDay14;
      case 15:
        return LDay15;
      case 16:
        return LDay16;
      case 17:
        return LDay17;
      case 18:
        return LDay18;
      case 19:
        return LDay19;
      case 20:
        return LDay20;
      case 21:
        return LDay21;
      case 22:
        return LDay22;
      case 23:
        return LDay23;
      case 24:
        return LDay24;
      case 25:
        return LDay25;
      case 26:
        return LDay26;
      case 27:
        return LDay27;
      case 28:
        return LDay28;
      case 29:
        return LDay29;
      case 30:
        return LDay30;
      case 31:
        return LDay31;
    }
  }

  drawItem(day) {
    if ((day > 0 && this.state.today > day)) {
      // return <p className={styles.calendarcomplete}>{day > 0 ? day : " "}</p>
      return <span className={styles.calendarinactive}><Image src={this.getDayImage(day)} width="50%" height="50%" /></span>
    } else if (day === this.state.today) {
      return <span className={styles.calendarcomplete}><span className={styles.activeDay}><LottieControl animationData={this.getDayLottie(day)} width="70px" /></span></span>
    } else {
      return <span className={styles.calendaritem}>{day > 0 ? <Image src={this.getDayImage(day)} width="50%" height="50%" /> : " "}</span>
    }
  }

  drawRow(days) {
    return (
      <div className={styles.calendarrow}>
        {days.map((item, idx) => {
          return <div key={idx}>{this.drawItem(item)}</div>;
        })}
      </div>
    )
  }

  drawWeek(startCount) {
    let mapIndex = 0;
    let weekDays = 7;
    let weeks = [0, 0, 0, 0, 0, 0, 0];
    let maxDay = 31;
    while (startCount - 1 <= maxDay) {
      if (weekDays == 0 || startCount - 1 === maxDay) {
        return this.drawRow(weeks);
      } else {
        weeks[mapIndex] = startCount;
        mapIndex++;
        startCount++;
        weekDays--;
      }
    }
    console.log("returned");
  }

  render() {
    return (
      <div className={styles.container}>
        <h3 className={styles.headerclass}><i className={styles.name}>Тавтай морил: {getUsername(this.state)}</i> <span className={styles.info}><Modal icon={Info}  description={config.newyear.instruction} action="instruction" name="Заавар" buttonText="Хаах" width="50%" height="50%" /></span></h3>
        <Image src={Garchig} width="300%" height="100%" />
        <div className={styles.main}>
          <div className={styles.maindev}>
            {this.state.failure === true ? renderAlarm(config.newyear.failed) : ""}
            {this.state.isLoading === true ? <LottieControl width="200px" height="200px" animationData={loadingLottie} /> : ""}
            {/* </div> */}
            {this.state.isLoading === false ? (
              <div className={styles.calendar}>
                <div className={styles.calendarcolumn}>
                  {config.newyear.days.map((item, idx) => {
                    return <div key={idx}>{this.drawWeek(item)}</div>
                  })}
                </div>
              </div>
            ) : ""}
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