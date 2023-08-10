// full Screen
document.addEventListener("DOMContentLoaded", function() {
    const fullScreenBtn = document.getElementById("fullsecreen_btn");
    fullScreenBtn.addEventListener("click", toggleFullScreen);

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
});