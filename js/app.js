let imgContainer = document.querySelector('.wrapper');
let bar = document.querySelector('.bar');
let imgs = imgContainer.querySelectorAll('img');
let coloredImg = document.querySelector('.wrapper .colored-img');
let imgWidth = parseInt(imgs[0].offsetWidth);
let firstImgWidth = parseInt(imgs[0].offsetWidth);
let imgLeft = imgContainer.getBoundingClientRect().left;
let moveX = 0;
let mouseDown = false;
let customClientX;

window.addEventListener('resize', resizeFun);

imgContainer.addEventListener('mousemove', (e) => {
    let event = e;
    window.requestAnimationFrame(() => drawImg(event))
});
imgContainer.addEventListener('touchmove', (e) => {
    let event = e;
    window.requestAnimationFrame(() => drawImg(event))
});

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
        bar.style.paddingRight = 0;
        coloredImg.style.width = '100%';

        return false;
    }

    bar.style.left = moveX + 'px'
    coloredImg.style.width = moveX + 'px';
}

function resizeFun() {
    imgLeft = imgContainer.getBoundingClientRect().left;
    imgWidth = imgContainer.offsetWidth;


    let windowWidth = document.documentElement.clientWidth;
    console.log(imgWidth,imgLeft);

    if (windowWidth < firstImgWidth) imgs.forEach(el => {
        el.style.width = windowWidth - 20 + 'px'
    })
    else if(windowWidth > imgWidth) {
        imgs.forEach(el => {
        })
    }
}

if (document.documentElement.clientWidth < imgWidth) resizeFun();