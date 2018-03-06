console.log("Script imported");

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

function onGamePanelHover(element) {
    
    console.log("Changing border");
    var gameimg = element.getElementsByClassName("gameimg")[0];
    
    console.log(gameimg);
    gameimg.border = null;
    gameimg.borderColor = "black";
    
}

function onGamePanelOut(element) {
    
    console.log("Changing border");
    var gameimg = element.getElementsByClassName("gameimg")[0];
    
    console.log(gameimg);
    gameimg.border = null;
    gameimg.borderColor = "#e6eaf2";
}