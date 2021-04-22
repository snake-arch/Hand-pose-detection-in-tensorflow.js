/////////////////////////////////////////////////////////////////////
(function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('videoElement');
    /////////////////////////////////////////////////////////////////
    if (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia) {
              navigator.mediaDevices.getUserMedia({ video: true,
                    audio:false })
                .then(function (stream) {
                  video.srcObject = stream;
                })
                .catch(function (err) {
                  console.log("Something went wrong!");
                });
            }
    ///////////////////////////////////////////////////////////////
    video.addEventListener('play',function()
                          {
        draw(this, context,640,480);
    },false);
    ///////////////////////////////////////////////////////////////
    async function draw(video,context, width, height){
        context.drawImage(video,0,0,width,height);
        const model = await handpose.load();
        const predictions = await model.estimateHands(video);
        console.log(predictions);
        ///////////////////////////////////////////////////////////
        if (predictions.length > 0){
           for (let i = 0; i < predictions.length; i++) {
            drawHand(predictions,context);
            var probability = predictions[i].handInViewConfidence;
            var prob = (probability*100).toPrecision(5).toString();
            var text = "Confidence:"+prob+"%";
            context.font = "16pt Comic Sans MS";
            context.fillStyle = "#FF0000";
            context.fillText(text,425,20);
        }
            //////////////////////////////////////////////////////
           }
        setTimeout(draw,250,video,context,width,height);
        /////////////////////////////////////////////////////////
    }
})();

const fingerJoints = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
  };
  
  // Infinity Gauntlet Style
  const style = {
    0: { color: "yellow", size: 10 },1: { color: "gold", size: 6 },2: { color: "green", size: 10 },3: { color: "gold", size: 6 },4: { color: "gold", size: 6 },
    5: { color: "purple", size: 10 },6: { color: "gold", size: 6 },7: { color: "gold", size: 6 },8: { color: "gold", size: 6 },9: { color: "blue", size: 10 },
    10: { color: "gold", size: 6 },11: { color: "gold", size: 6 },12: { color: "gold", size: 6 },13: { color: "red", size: 10 },14: { color: "gold", size: 6 },
    15: { color: "gold", size: 6 },16: { color: "gold", size: 6 },17: { color: "orange", size: 10 },18: { color: "gold", size: 6 },
    19: { color: "gold", size: 6 },20: { color: "gold", size: 6 },
  };
  
const drawHand = (predictions, ctx) => {
    // Check if we have predictions
    if (predictions.length > 0) {
      // Loop through each prediction
      predictions.forEach((prediction) => {
        // Grab landmarks
        const landmarks = prediction.landmarks;
  
        // Loop through fingers
        for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
          let finger = Object.keys(fingerJoints)[j];
          //  Loop through pairs of joints
          for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
            // Get pairs of joints
            const firstJointIndex = fingerJoints[finger][k];
            const secondJointIndex = fingerJoints[finger][k + 1];
  
            // Draw path
            ctx.beginPath();
            ctx.moveTo(
              landmarks[firstJointIndex][0],
              landmarks[firstJointIndex][1]
            );
            ctx.lineTo(
              landmarks[secondJointIndex][0],
              landmarks[secondJointIndex][1]
            );
            ctx.strokeStyle = "plum";
            ctx.lineWidth = 4;
            ctx.stroke();
          }
        }
  
        // Loop through landmarks and draw em
        for (let i = 0; i < landmarks.length; i++) {
          // Get x point
          const x = landmarks[i][0];
          // Get y point
          const y = landmarks[i][1];
          // Start drawing
          ctx.beginPath();
          ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);
          // Set line color
          ctx.fillStyle = style[i]["color"];
          ctx.fill();
        }
      });
    }
  };

// let video;
// let model;
// const init = async () => {
//   video = await loadVideo();
//   await tf.setBackend("webgl");
//   model = await handpose.load();
// };
// const loadVideo = async () => {
//   const video = await setupCamera();
//   video.play();
//   return video;
// };
// const setupCamera = async () => {
//  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//     throw new Error("Browser API navigator.mediaDevices.getUserMedia not available"
//  );
//  };

//  video = document.querySelector("video");
//  //video.width = 600;
//  //video.height = 600;
//  const stream = await navigator.mediaDevices.getUserMedia({
//      audio: false,
//      video: {
//          facingMode: "user",
//          width: window.innerWidth,
//          height: window.innerHeight,
//         },});
// video.srcObject = stream;
// return new Promise(
//     (resolve) => (video.onloadedmetadata = () =>
//     resolve(video))
//     );};
// init();

// context.lineWidth = "5";
//             context.strokeStyle="blue";
//             let indexBase = predictions[0].annotations.indexFinger[0];
//             let indexTip = predictions[0].annotations.indexFinger[3];
//             context.moveTo(indexBase[0],indexBase[1]);
//             context.lineTo(indexTip[0],indexTip[1]);
//             let thumbBase = predictions[0].annotations.thumb[0];
//             let thumbTip = predictions[0].annotations.thumb[3];
//             context.moveTo(thumbBase[0],thumbBase[1]);
//             context.lineTo(thumbTip[0],thumbTip[1]);
//             let middleBase = predictions[0].annotations.middleFinger[0];
//             let middleTip = predictions[0].annotations.middleFinger[3];
//             context.moveTo(middleBase[0],middleBase[1]);
//             context.lineTo(middleTip[0],middleTip[1]);
//             let ringBase = predictions[0].annotations.ringFinger[0];
//             let ringTip = predictions[0].annotations.ringFinger[3];
//             context.moveTo(ringBase[0],ringBase[1]);
//             context.lineTo(ringTip[0],ringTip[1]);
//             let pinkyBase = predictions[0].annotations.pinky[0];
//             let pinkyTip = predictions[0].annotations.pinky[3];
//             context.moveTo(pinkyBase[0],pinkyBase[1]);
//             context.lineTo(pinkyTip[0],pinkyTip[1]);



























