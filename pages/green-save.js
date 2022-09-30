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
      username: 'Tomnoo',
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
  }

  
  render() {
    return (
      <div className={styles.container}>
        <h3 className={styles.headerclass}><i className={styles.name}>Тавтай морил: {getUsername(this.state)}</i> <span className={styles.info}><Modal icon={Info} open={true} description={config.newyear.instruction_green} action="instruction" name=" " buttonText="Хаах" width="50%" height="50%" /></span></h3>
        <Image src={Garchig} width="200%" height="100%" />
        <div className={styles.main}>
          <div className={styles.maindev}>
            {/* {this.state.failure === true ? renderAlarm(config.newyear.failed) : ""} */}
            {/* <center><h3 className={styles.headerclassdesc}><i className={styles.name}>Та одоогоор 10 мод аварсан байна.</i></h3></center> */}
            {this.state.isLoading === true ? <LottieControl width="400px" height="400px" animationData={loadingLottie} /> : ""}
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