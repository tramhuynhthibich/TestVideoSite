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

// const video = document.getElementById('webcam');
// const canvas = document.getElementById('canvas');
// const snapButton = document.getElementById('snap');
// const photo = document.getElementById('photo');

// 1. Request camera access as soon as the script loads
// async function initCamera()
// {
//     try
//     {
//         const stream = await navigator.mediaDevices.getUserMedia({
//             video: { facingMode: 'user' }, // Front camera on mobile
//             audio: false
//         });
//         video.srcObject = stream;
//     } catch (err)
//     {
//         console.error("Camera access denied: ", err);
//         alert("Please enable camera permissions and ensure you're using HTTPS.");
//     }
// }

// 2. Capture a frame from the video when the button is clicked
// snapButton.addEventListener('click', () => {
//     const context = canvas.getContext('2d');
//     // Draw the current video frame onto the hidden canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);

//     // Convert canvas data to an image URL and display it
//     const imageData = canvas.toDataURL('image/png');
//     photo.src = imageData;
// });

// initCamera();

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



// 4. Upload the selected image to the server (handled by server.js at POST /upload)
async function uploadImage()
{
    const input = document.getElementById('imageUpload');
    const status = document.getElementById('uploadStatus');
    const preview = document.getElementById('uploadedImage');

    const file = input.files[0];
    if (!file)
    {
        status.textContent = 'Please choose an image first.';
        return;
    }

    status.textContent = 'Uploading...';
    try
    {
        const response = await fetch('/upload', {
            method: 'POST',
            headers: {
                'Content-Type': file.type || 'image/jpeg',
                'X-File-Name': encodeURIComponent(file.name)
            },
            body: file
        });
        const result = await response.json();
        if (!response.ok)
        {
            throw new Error(result.error || response.statusText);
        }
        status.textContent = 'Uploaded: ' + result.url;
        preview.src = result.url;
        preview.style.display = 'block';
    } catch (err)
    {
        console.error('Upload failed: ', err);
        status.textContent = 'Upload failed: ' + err.message;
    }
}
