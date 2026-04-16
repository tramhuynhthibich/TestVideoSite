const video = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const snapButton = document.getElementById('snap');
const photo = document.getElementById('photo');

// 1. Request camera access as soon as the script loads
async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' }, // Front camera on mobile
            audio: false
        });
        video.srcObject = stream;
    } catch (err) {
        console.error("Camera access denied: ", err);
        alert("Please enable camera permissions and ensure you're using HTTPS.");
    }
}

// 2. Capture a frame from the video when the button is clicked
snapButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    // Draw the current video frame onto the hidden canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas data to an image URL and display it
    const imageData = canvas.toDataURL('image/png');
    photo.src = imageData;
});

initCamera();