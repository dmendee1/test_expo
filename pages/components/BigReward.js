import React from "react";
import LottieControl from "./LottieControl";
import giftLottie from "../../public/gift.json";
import loadingLottie from "../../public/loading.json";
import config from "../../config/config.json";
import axios from 'axios';
import Image from 'next/image';

export default class BigReward extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            isLoading: true,
            isdn: props.isdn,
            userid: props.userid,
            isRewarded: false,
            rewardId: props.rewardId,
            rewardDto: props.rewardDto,
            rewardList: null
        }
    }

    myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    printRewardName(rewardDto) {
        if(rewardDto != null && rewardDto != undefined && rewardDto.rewardType != null && rewardDto.rewardType != undefined) {
            return(
                <div>
                    {rewardDto.rewardType === "MOBIEMPLOYEE" ? <center><p  style={{textAlign: 'center', textJustify: 'inter-word'}}>Та даалгавруудаа биелүүлж дууссан байна</p></center> : <center><h3>Баяр хүргэе!</h3></center> }
                    <center><Image className="imagecom" loader={this.myLoader} src={rewardDto.rewardImage} width="200%" height="100%" /></center>
                    <p style={{textAlign: 'center', textJustify: 'inter-word'}}> 
                    {this.state.rewardList != null ? config.expo.rewardsuccess.find(e => e.type === rewardDto.rewardType ).first : config.expo.rewardsuccess.find(e => e.type === rewardDto.rewardType ).after}
                    </p>
                </div>
            );
        }
    }

    printRewards(reward) {
        return(
            <div onClick={() => this.chooseBigReward(reward.id)}>
                <Image className="imagecom" style={{borderRadius: '5px'}} loader={this.myLoader} src={reward.rewardImage} width="120" height="60px" />
                <p>{reward.rewardName}</p>
            </div>
        );
    }

    chooseBigReward1(rewardId) {
        alert(this.state.userid + "," + this.state.isdn + "," + rewardId);
    }

    chooseBigReward(rewardId) {
        this.setState({
            isLoading: true
        })
        var headConfig = {
            headers: {'Access-Control-Allow-Origin': '*'}
          };
      
          console.log("chooseBigReward");
          axios.get("/api/miniapp/getBigReward?id=" + this.state.userid + "&phone=" + this.state.isdn + "&rewardId=" + rewardId, headConfig).then(result => {
              let responseData = result.data;
              console.log(responseData.result);
              if(responseData.code === "UNAUTHORIZED") {
                  console.log("GG");
                  
              } else {
                console.log("SUCCESS");
                console.log(responseData);
                this.setState({
                    rewardId: responseData.rewardId,
                    rewardDto: responseData.rewardDto
                })
                this.props.setInitialFunc(responseData.rewardId, responseData.rewardDto);
                setTimeout(() => {
                    this.setState({
                        isRewarded: true,
                        isLoading: false,
                    })
                }, 2000);
              }
          })

          console.log("end chooseBigReward");
    }

    componentDidMount() {
        if(this.state.rewardId == null || this.state.rewardId == undefined) {
            var headConfig = {
                headers: {'Access-Control-Allow-Origin': '*'}
            };
        
            console.log("didmount");
            axios.get("/api/miniapp/getRewards?phone=" + this.state.isdn, headConfig).then(result => {
                let responseData = result.data;
                console.log(responseData.result);
                if(responseData.code === "UNAUTHORIZED") {
                    console.log("GG");
                    
                } else {
                    console.log("SUCCESS");
                        console.log(responseData);
                        this.setState({
                            rewardList: responseData
                        })
                        setTimeout(() => {
                            this.setState({
                                isLoading: false
                            })
                            console.log("rewaardList")
                            console.log(this.state.rewardList);
                        }, 2000);
                        
                }
            })
        } else {
            setTimeout(() => {
                this.setState({
                    isRewarded: true,
                    isLoading: false
                })
                console.log("rewaardList")
                console.log(this.state.rewardList);
            }, 2000);
        }
    }

    render() {
        return(
            <div>
                <center>
                {this.state.isLoading === true ? <LottieControl animationData={loadingLottie}/> : ""}
                {this.state.isRewarded == false && this.state.isLoading === false && this.state.rewardList != null && this.state.rewardList != undefined ? <center><h3>Баяр хүргэе!</h3></center> : ""}
                {this.state.isRewarded == false && this.state.isLoading === false && this.state.rewardList != null && this.state.rewardList != undefined ? <div style={{textAlign: 'center', textJustify: 'inter-word'}}>Та даалгавруудаа биелүүлж дууссан байна. Доорх бэлгээс өөрт тохирох нэгийг сонгоно уу</div> : ""}
                <p> </p>
                {this.state.isRewarded == false && this.state.isLoading === false && this.state.rewardList != null && this.state.rewardList != undefined && this.state.rewardList.map((item, idx) => {
                    return <div key={idx}>{this.printRewards(item)}</div>;
                })}
                
                {this.state.isRewarded == true && this.state.rewardId != 0 ? <div>{this.printRewardName(this.state.rewardDto)}</div> : ""}
                
                </center>
            </div>
        )
    }
}