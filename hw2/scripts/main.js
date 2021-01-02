var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var indexCurrImage = 0;

function setDetails(imageUrl, titleText) {
    //tells the browser that they conform to the most recent std version of JS
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}
/*======================= image cycle <> =============================*/
function setDetailsFromThumb(thumbnail) {
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function setindexCurrImage(newIndex) {
    indexCurrImage = newIndex;
}
/*==================================================================*/
function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);

    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        /*console.log(event.keyCode);*/
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}
/*============================ Image Cycle <> ========================================*/
function addCycleImagesLeftHandler() {
    document.getElementById('cycleImagesLeftButton').addEventListener('click', function () {
        var thumbnailsAr = getThumbnailsArray();
        var previousImageIndex;
        if (indexCurrImage === 0) {
            previousImageIndex = thumbnailsAr.length - 1;
        } else {
            previousImageIndex = (indexCurrImage - 1) % thumbnailsAr.length;

        }
        setindexCurrImage(previousImageIndex);
        setDetailsFromThumb(thumbnailsAr[previousImageIndex]);
        showDetails();
    });
}

function addCycleImagesRightHandler() {
    document.getElementById('cycleImagesRightButton').addEventListener('click', function () {
        var thumbnailsAr = getThumbnailsArray();
        var nextImageIndex = (indexCurrImage + 1) % thumbnailsAr.length;
        setindexCurrImage(nextImageIndex);
        setDetailsFromThumb(thumbnailsAr[nextImageIndex]);
        showDetails();
    });
}
/*========================================================================================*/
function initialiseEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    /*========= Cycle ==========*/
    addCycleImagesLeftHandler();
    addCycleImagesRightHandler();
    /*=========================*/
    addKeyPressHandler();
}
initialiseEvents();