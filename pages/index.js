import React from 'react';
import styles from '../styles/Home.module.css'
import Modal from "./components/Modal"
import {withRouter} from "next/router"
import giftLottie from '../public/gift.json'

function markerClick(e) {
  alert("KKKKKK")
}

function getUsername(state) {
  return state.username != undefined && state.username != null && state.username.length > 0 ? state.username : state.isdn;
}


function getReward(bigReward, isdn, userid, rewardId, rewardDto) {
  console.log("index,getReward() rewardDto");
  console.log(rewardDto);
  if(bigReward != null && bigReward != undefined) {
    return (
      <div className={styles.footer}>
        <Modal lottieData={giftLottie} bigRewardComp={bigReward} isdn={isdn} userid={userid} rewardId={rewardId} rewardDto={rewardDto} width="50%" height="50%"/>
      </div>
    )
  }
}


class Index extends React.Component {

  static getInitialProps({query}) {
    return {query}
  }

  constructor(props, router) {
    super(props);
    this.state = {
      // code: router.query,
      username: 'Mendee',
      isdn: '95759090',
      userid: '89',
      rewardDto: {
        "id": 4,
        "rewardName": "Gift",
        "rewardCount": 500,
        "rewardStock": 499,
        "rewardType":"GIFT",
        "rewardImage": "https://wallet.candy.mn/rest/images/89b2c051ba114c9c9971ff44e6b772cd.jpeg"
      },
      rewardId: 4
    }
    console.log("aabb");
    console.log(props.query.code);
    console.log("rewardDto");
    console.log(this.state.rewardDto);
  }

  componentDidMount() {
    var headConfig = {
      headers: {'Access-Control-Allow-Origin': '*'}
    }
    // axios.get(config.backend_url + "miniapp/me", headConfig).then(result => {
    //   console.log(result.data);
    // });
  }

  render() {
    return(
      <div className={styles.container}>
        <h3 className={styles.headerclass}>Expo landmap.<i className={styles.name}>Сайн уу: {getUsername(this.state)}</i></h3>
        {getReward("ACTIVE", "95759090", "328561", this.state.rewardId, this.state.rewardDto)}
      </div>
    );
  }
}

export default withRouter(Index);