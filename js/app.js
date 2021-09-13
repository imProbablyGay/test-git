let imgContainer = document.querySelector('.wrapper');
let bar = document.querySelector('.bar');
let coloredImg = document.querySelector('.wrapper .colored-img');
let imgWidth = parseInt(window.getComputedStyle(imgContainer).getPropertyValue('width'));
let imgLeft = imgContainer.getBoundingClientRect().left;
let moveX = 0;
let mouseDown = false;
let customClientX;


imgContainer.addEventListener('mousemove', drawImg);
imgContainer.addEventListener('touchmove', drawImg);

bar.addEventListener('mousedown', (e) => mouseDown = true);
document.addEventListener('mouseup', (e) => {
    if (mouseDown) mouseDown = false;
});

bar.addEventListener('touchstart', (e) => mouseDown = true);
bar.addEventListener('touchend', (e) => mouseDown = false);


function drawImg(e) {
    if (!mouseDown)return false;

    moveX = e.clientX - imgLeft;
    customClientX = e.clientX;
    if (('ontouchstart' in window)) {
        customClientX = e.targetTouches[0].clientX;
        moveX = customClientX - imgLeft;
    }

    // check position
    if (customClientX < imgLeft) {
        bar.style.left = 0
        coloredImg.style.width = 0;

        return false;
    }
    else if (customClientX > imgLeft + imgWidth) {
        bar.style.left = 'calc(100% - 3px)';
        coloredImg.style.width = '100%';

        return false;
    }

    bar.style.left = moveX + 'px'
    coloredImg.style.width = moveX + 'px';
}