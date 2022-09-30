import React from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from "../config/config.json"
import { withRouter } from "next/router"
import Modal from "./components/Modal"
import giftLottie from '../public/gift4.json'
import QrPurchase from '../public/qrpurchase1.json'
import Greetings from '../public/greeting2.json'
import QrOpen from '../public/qropen2.json'
import Complete from '../public/done2.json'
import Warning from '../public/warning.json'

function getUsername(state) {
  return state.username != undefined && state.username != null && state.username.length > 0 ? state.username : state.isdn;
}

function renderAlarm(text) {
  return <div style={{position: 'absolute', transform: 'translateX(250%) translateY(120%)' }}><Modal warning={Warning} open={true} description={text} name="Уучлаарай" width="50px" height="50px" /></div>
}

class App extends React.Component {

  static getInitialProps({ query }) {
    return { query }
  }
  constructor(props, router) {
    super(props);
    this.state = {
      // code: router.query,
      token: props.query.code,
      action: props.query.action,
      username: null,
      isdn: null,
      userid: null,
      bigReward: "ACTIVE",
      rewardId: null,
      rewardDto: null,
      tasks: [],
      isMobicomEmployee: false
    };
    this.addRewardIdAndRewardDto = this.addRewardIdAndRewardDto.bind(this);
  }

  getMarker(code, name, complete, number) {
    let divStyll = {
      color: 'white',
      width: '100%',
      borderRadius: '50%',
      border: '5px solid #fff',
      zIndex: "1",
      transform: 'translateX(' + config.expo.types.find(e => e.code === code).positionX + ') translateY(' + config.expo.types.find(e => e.code === code).positionY + ')'
    };
    let divStyle = {
      color: 'white',
      width: '100%',
      borderRadius: '50%',
      border: '5px solid #fff',
      background: '#fff',
      overflow: 'hidden',
      zIndex: "2",
    };
    let divStyleSuccess = {
      color: 'white',
      width: '100%',
      borderRadius: '50%',
      border: '5px solid #31C243',
      background: '#fff',
      overflow: 'hidden',
      zIndex: "2",
    };
    let numberStyle = {
      color: '#000',
      // padding: '0.05em',
      width: '30px',
      background: 'white',
      position: 'absolute',
      height: '100%',
      fontSize: '18px',
      fontWeight: 'bold',
      height: '30px',
      alightItem: 'center',
      transform: 'translateY(-110%) translateX(250%)',
      borderRadius: '50%',
      border: '3px solid red',
      zIndex: '2'
    };
    let numberStyleSuccess = {
      color: '#000',
      // padding: '0.05em',
      width: '30px',
      background: 'white',
      position: 'absolute',
      height: '100%',
      fontSize: '18px',
      fontWeight: 'bold',
      height: '30px',
      alightItem: 'center',
      transform: 'translateY(-120%) translateX(250%)',
      borderRadius: '50%',
      border: '3px solid #31C243',
      zIndex: '2'
    };
    let lottieFile = null;
    
    if(code === "QROPEN") {
      lottieFile = QrOpen;
    } else if(code === "GREETINGS") {
      lottieFile = Greetings;
    } else {
      lottieFile = QrPurchase;
    }

    return (
      <div style={{display: 'fixed'}}>
        <center>
      <div style={divStyll}>
        <div style={complete === true ? divStyleSuccess : divStyle}>
          <Modal style={{zIndex: '-1'}} lottieData={lottieFile} width="100px" height="100px" code={code} name={config.expo.types.find(e => e.code === code).title} complete={complete} description={config.expo.types.find(e => e.code === code).description} />
        </div>
        <span><p style={complete === true ? numberStyleSuccess : numberStyle}>{complete === true ? <div style={{transform: 'translateY(5%)'}}>✔</div> : number}</p></span>
      </div>
      
      </center>
      </div>
    );
  }

  getReward(bigReward, isdn, userid, rewardId, rewardDto, setInitialFunc) {
    // console.log("bigReward");
    if (this.state.bigReward != null && this.state.bigReward != undefined && this.state.bigReward !== "INACTIVE") {
      console.log("app.js");
      console.log(rewardId);
      console.log(rewardDto);
      console.log("app.js end")
      return (
        <div className={styles.footer}>
          <Modal lottieData={giftLottie} setInitialFunc={setInitialFunc} bigRewardComp={this.state.bigReward} isdn={isdn} userid={userid} rewardId={rewardId} rewardDto={rewardDto} width="50%" height="50%" />
        </div>
      )
    }
  }

  addRewardIdAndRewardDto(rewardId, rewardDto) {
    this.setState({
      rewardId: rewardId,
      rewardDto: rewardDto,
      bigReward: "REWARDED"
    });

    console.log("addRewardIdAndRewardDto()");
    console.log(this.state.rewardId);
    console.log(this.state.rewardDto);
  }

  componentDidMount() {
    console.log("ooooo");
    var headConfig = {
      headers: { 'Access-Control-Allow-Origin': '*' }
    };

    console.log("didmount");
    axios.get("/api/miniapp/getUserInfo?token=" + this.state.token, headConfig).then(result => {
      let responseData = result.data;
      console.log(responseData.result);
      if (responseData.code === "UNAUTHORIZED") {
        console.log("GG");
      } else {
        console.log("SUCCESS");
        this.setState({
          username: responseData.result.userFirstname,
          isdn: responseData.result.userPhone,
          userid: responseData.result.userId
        });

        axios.get("/api/wallet/getUserInfo?id=" + responseData.result.userId + "&phone=" + responseData.result.userPhone + (this.state.action != null && this.state.action != undefined ? "&action=" + this.state.action : "")).then(result => {
          let resData = result.data;
          this.setState({
            tasks: JSON.parse(resData.tasksData),
            bigReward: resData.bigReward,
            isMobicomEmployee: resData.isMobicomEmployee
          });
          if (this.state.bigReward != null && this.state.bigReward === "REWARDED") {
            this.setState({
              rewardId: resData.rewardId,
              rewardDto: resData.rewardDto
            });
          }
        })
      }
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <h3 className={styles.headerclass}>MonPay Land-д тавтай морил. <span><div><i className={styles.name}>Сайн уу: {getUsername(this.state)}</i></div></span></h3>
        <div className={styles.main}>
          <div className={styles.maindev}>
          {/* {this.getMarker("QROPEN", "aaaaaa", true, 1)}
            {this.getMarker("QR_PURCHASE", "aaaa", false, 2)}
          {this.getMarker("GREETINGS", "aaaaaa", false, 1.5)} */}

          
            {this.state.tasks.map((item, idx) => {
              return <div key={idx}>{this.getMarker(item.code, item.taskName, item.isCompleted, item.taskNumber)}</div>;
            })}
          </div>
        </div>
        {this.state.isMobicomEmployee != null && this.state.isMobicomEmployee != undefined && this.state.isMobicomEmployee === true ? renderAlarm("Мобикомын ажилтнууд уг урамшуулалд оролцох боломжгүйг ойлгоорой. Гэхдээ та даалгавруудыг биелүүлэх боломжтой.") : ""}
        {/* {this.getReward("REWARDED", "95759090", "328561", 2, aa, this.addRewardIdAndRewardDto)} */}
        {this.getReward(this.state.bigReward, this.state.isdn, this.state.userid, this.state.rewardId, this.state.rewardDto, this.addRewardIdAndRewardDto)}
        {/* <BigReward userid={this.state.userid} isdn={this.state.isdn}/> */}
      </div>
    );
  }
}

export default withRouter(App);