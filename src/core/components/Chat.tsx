import WhoSentYou from "./WhoSentYou"
import React from "react"

const Chat = () => {
  // const addAudioElement = (blob) => {
  //   const url = URL.createObjectURL(blob);
  //   const audio = document.createElement("audio");
  //   audio.src = url;
  //   audio.controls = true;
  //   document.body.appendChild(audio);
  // };
  return (
    <>
      {/*<AudioRecorder onRecordingComplete={addAudioElement} />*/}

      <WhoSentYou />
    </>
  )
}

export default Chat
