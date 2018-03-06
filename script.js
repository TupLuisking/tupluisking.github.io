console.log("Script imported");

$(".navbar").localScroll();

function changeImage(element, newSrc) {
    
    element.setAttribute('src', "images/art/" + newSrc);
}

function openGame(url) {
    
    var win = window.open(url, '_blank');
    win.focus();
}

function changePortrait(element, newSrc) {
    
    element.setAttribute('src', "images/" + newSrc);
}