window.addEventListener(
    'load',
    function ()
    {
        document.body.style.backgroundColor = 'white';
        window.setTimeout(
            function ()
            {
                document.body.style.backgroundColor = '#ABEBC6';
                var msg = document.getElementById("msg");
                msg.textContent = '(NOTE: the background color was changed by sample.js, for checking whether the external js code works)';
            },
            3000);
    });

const video = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const snapButton = document.getElementById('snap');
const photo = document.getElementById('photo');

// 1. Request camera access as soon as the script loads
async function initCamera()
{
    try
    {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' }, // Front camera on mobile
            audio: false
        });
        video.srcObject = stream;
    } catch (err)
    {
        console.error("Camera access denied: ", err);
        alert("Please enable camera permissions and ensure you're using HTTPS.");
    }
}

// 2. Capture a frame from the video when the button is clicked
// snapButton.addEventListener('click', () => {
//     const context = canvas.getContext('2d');
//     // Draw the current video frame onto the hidden canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);

//     // Convert canvas data to an image URL and display it
//     const imageData = canvas.toDataURL('image/png');
//     photo.src = imageData;
// });

initCamera();

// 3. Called from the button in index.html
function CallFromJS()
{
    console.log("CallFromJS called");
}

function testSaveDataURL()
{
    var canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 240;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fffaf0";
    ctx.fillRect(0, 0, 320, 240);
    ctx.fillStyle = "#000000";
    ctx.font = "48px serif";
    ctx.strokeText("Hello, world", 40, 132);
    Unity.saveDataURL("test.png", canvas.toDataURL());
    // NOTE: Unity.saveDataURL() for iOS cannot save a file under the common Downloads folder.
    // cf. https://github.com/gree/unity-webview/pull/904#issue-1650406563
};


