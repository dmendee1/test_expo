import React from 'react';
import ReactModal from 'react-modal';
import Image from 'next/image';
import LottieControl from './LottieControl';
import RandomBigReward from './newyear/RandomBigReward';

const customStyles = {
  content: {
    background: "transparent",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '80%',
    borderRadius: '5%',
    padding: '0',
    margin: '0',
    transform: 'translate(-50%, -50%)',
    transition: 'opacity 2000ms ease-in-out',
    animation: 'zoomIn 1s 2s'
  }
};

ReactModal.setAppElement('body');

function Modal(props) {
  let subtitle;
  let buttonStyle = {
    width: '100%',
    color: '#fff',
    font: 'Arial',
    padding: '0.5em 2em',
    fontSize: '14',
    borderRadius: '5px',
    background: 'linear-gradient(to right, #9650FF, #00E6ff)'
  };
  let contentStyle = {
    background: "#fff",
    padding: '2em 0.5em',
  }
  let headerStyle = {
    color: '#fff',
    font: 'Arial',
    fontWeight: 'bold',
    top: 0,
    margin: 0,
    padding: "0.5em",
    width: '100%',
    background: 'linear-gradient(to right, #9650FF, #00E6ff)'
  }
  const icon = "";
  const lottie = "";
  const [modalIsOpen, setIsOpen] = React.useState(props.open != undefined && props.open != null ? props.open : false);
  const [name, setModalInitial] = React.useState(props.name != undefined && props.name != null ? props.name : "");
  const [buttonText, setButtonText] = React.useState(props.buttonText != undefined && props.buttonText != null ? props.buttonText : "");
   
  function drawIconOrLottie() {
    if(props.icon != null && props.icon != undefined) {
      return <Image src={props.icon} width={props.width} height={props.height}/>
    }
    if(props.lottieData != null && props.lottieData != undefined) {
      return <LottieControl animationData={props.lottieData}  width={props.width} height={props.height} speed={props.speed}/>
    }
    if(props.bigRewardComp != null && props.bigRewardComp != undefined && props.bigRewardComp === 'ACTIVE') {
      return <RandomBigReward />
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    if(subtitle != null && subtitle != undefined && subtitle.style != null && subtitle.style != undefined) {
      subtitle.style.color = '#fff';
      subtitle.style.font = 'Arial';
      subtitle.style.fontWeight = 'bold';
      subtitle.style.width = '100%';
      subtitle.style.padding = '0.5em';
      subtitle.style.margin = '0';
      subtitle.style.background = 'linear-gradient(to right, #9650FF, #00E6ff)';
    } else {

    }
  }

  function closeModal() {
    setIsOpen(false);
    setTimeout(() => {
      if(props.action !== "instruction") {
        setModalInitial("");
        setButtonText("");
      }
    }, 100);
    
  }

  return (
    <div>
      <div onClick={openModal}>
        {drawIconOrLottie()}
      </div>
      <ReactModal
        closeTimeoutMS={200}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {name != null && name != undefined && name !== "" ? <center><p style={headerStyle}>{name}</p></center> : ""}
        <div style={contentStyle}>
          <center>{props.warning != null && props.warning != undefined ? <Image src={props.warning}  width={props.imagewidth != null && props.imagewidth != undefined ? props.imagewidth : props.width} height={props.imageheight != null && props.imageheight != undefined ? props.imageheight : props.height}/> : ""}</center>
          <div>
            {props.description != null && props.description != undefined && props.description.split('||').map((item, idx) => {
              return <div key={idx}><p style={{textAlign: 'center', textJustify: 'inter-word'}}>{item}</p></div>
            })}
          </div>
          <div>
            <center>
              <p> </p>
            {props.code != null && props.code != undefined ? (props.code === "QROPEN" ? <div><a className="manual" href="https://wallet.candy.mn/rest/images/f4cb3f811ddb47c59fb68d1c783e21.pngc0"><div style={buttonStyle}>MonPay танилцуулга үзэх</div></a></div> : <p> </p>) : ""}
            
            </center>
          </div>
          {props.bigRewardComp != null && props.bigRewardComp != undefined ? <RandomBigReward setModalInitial={setModalInitial} setButtonInitital={setButtonText} isdn={props.isdn} day={props.day} setInitialFunc={props.setInitialFunc} userid={props.userid} rewardDto={props.rewardDto} rewardId={props.rewardId} closeModal={closeModal}/> : ""}
          {buttonText != null && buttonText != undefined && buttonText !== "" ? <center><a style={buttonStyle} onClick={closeModal}>{buttonText}</a></center> : ""}
        </div>
      </ReactModal>
    </div>
  );
}
export default Modal;