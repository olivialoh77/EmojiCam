// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel

const URL = "https://teachablemachine.withgoogle.com/models/laMOuTCIK/";

let model, webcam, labelContainer, maxPredictions;
var emoticon_number = "";

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(250, 140, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    /*for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }*/
    labelContainer.appendChild(document.createElement("div"))
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    let max = 0;
    let classPrediction = "";
    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability.toFixed(2) > max)
        {
            max = prediction[i].probability.toFixed(2);
            classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        }

    }
    labelContainer.childNodes[0].innerHTML = classPrediction;
}

async function collect(){
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    let max = 0;
    let max_index = -1;
    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability.toFixed(2) > max) {
            max = prediction[i].probability.toFixed(2);
            max_index = i
        }
    }
    result = prediction[max_index].className;

    console.log(result);

    if (result == "lemon"){
        emoticon_number = "&#127819";
    }
    else if (result == "orange"){
        emoticon_number = "&#127818";
    }
    else if (result == "apple"){
        emoticon_number = "&#127822";
    }
    else if (result == "banana"){
        emoticon_number = "&#127820";
    }
    else if (result == "tomato"){
        emoticon_number = "&#127813";
    }
    else{
        emoticon_number = "";
    }

    let html = document.getElementById("display").innerHTML;
    document.getElementById("display").innerHTML = html + emoticon_number;

    let auto = document.getElementById("auto").innerHTML;
    document.getElementById("auto").innerHTML = emoticon_number;

    let x = document.getElementById("keyboard");
    x.style.display = "block";
    let y = document.getElementById("tbMain");
    y.style.display = "none";
}
