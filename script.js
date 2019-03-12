console.log("SCRIPT IMPORTED");

var slideshow;

window.onload = function() {
    
    console.log("WINDOW LOADED");
    
    ChangeSlide(0);
    
    slideshow = setInterval(function() {
        
        ChangeSlideSkip(1);
    }, 4000);
    
    var gamedetails = document.getElementById("game-details");
    
    if(gamedetails != null) {
        
        AdjustGameReel();
    }
}

$(document).ready(function() {
    
    $("#navbar-container").load("navbar.html"); 
    $("#footer-container").load("footer.html"); 
});

var sandwichmenu = $("#sandwichmenu");

$(window).scroll(function() {
    
    var wScroll = $(this).scrollTop();
    var navbar_cont = $("#navbar-container");
    var navbar_height = navbar_cont.height();
    var sandwichmenu = $("#sandwichmenu");

    
    if(wScroll > navbar_height)
        ShowNavbar(navbar_cont, sandwichmenu);
    else
        HideNavbar(navbar_cont, sandwichmenu);
    
    var testimonies = document.getElementsByClassName("smalldialogue");
    
    if(testimonies != null) {
        
        for(var i = 0; i < testimonies.length; i++) {
            
            if(wScroll >= testimonies[i].offsetTop - (window.innerHeight * 0.875))
                testimonies[i].style.opacity = "1";
        }
    }
});

// NAV BAR STUFF

function ShowNavbar(navbar_cont, sandwichmenu) {
    
    navbar_cont.css('background-color', 'black');
    navbar_cont.css('border-bottom', '1px solid white');
    sandwichmenu.css('background-color', 'black');
    sandwichmenu.css('border-bottom', '1px solid white');
    sandwichmenu.css('border-left', '1px solid white');
}

function HideNavbar(navbar_cont, sandwichmenu) {

    navbar_cont.css('background-color', 'transparent');
    navbar_cont.css('border-bottom', 'none');
    sandwichmenu.css('background-color', 'transparent');
    sandwichmenu.css('border-bottom', 'none');
    sandwichmenu.css('border-left', 'none');
}

var showingSandwich = false;

function SandwichClick() {
    
    if(showingSandwich)
        HideSandwich();
    else
        ShowSandwich();
    
    showingSandwich = !showingSandwich;
}

function ShowSandwich() {
    
    var bar1 = document.getElementById("bar1");
    var bar2 = document.getElementById("bar2");
    var bar3 = document.getElementById("bar3");
    var sandwichmenu = document.getElementById("sandwichmenu");
    
    bar1.style.transform = "translateY(6.5px) rotate(315deg)";
    
    bar2.style.opacity = "0";
    bar2.style.transform = "rotateY(270deg)";
    
    bar3.style.transform = "translateY(-6.5px) rotate(-315deg)";
    
    sandwichmenu.style.maxHeight = "275px";
}

function HideSandwich() {
    
    var bar1 = document.getElementById("bar1");
    var bar2 = document.getElementById("bar2");
    var bar3 = document.getElementById("bar3");
    var sandwichmenu = document.getElementById("sandwichmenu");
    
    bar1.style.transform = "translateY(0) rotate(0deg)";
    
    bar2.style.opacity = "1";
    bar2.style.transform = "rotateY(0deg)";
    
    bar3.style.transform = "translateY(0) rotate(0deg)";
    
    sandwichmenu.style.maxHeight = "0px";
}

// HOME PAGE SLIDESHOW

var currentSlide = 0;

var slides = document.getElementsByClassName("slide");
var slide_buttons = document.getElementsByClassName("slide-button");

function ChangeSlideProcess() {
    
    if(slides == null)
        return;
    
    for(var i = 0; i < slides.length; i++) {
        
        if(i == currentSlide) {
            
            slides[i].style.opacity = "1";
//            slide_buttons[i].style.border = "3px solid #2d1f93";
            slide_buttons[i].style.background = "#7fbf7f";
        } else {
         
            slides[i].style.opacity = "0";
//            slide_buttons[i].style.border = "3px solid black";
            slide_buttons[i].style.background = "white";
        }
    }
}

function ChangeSlideSkip(increment) {
    
    currentSlide += increment;
    
    if(currentSlide >= slides.length)
        currentSlide = 0;
    else if(currentSlide < 0)
        currentSlide = slides.length - 1;
    
    ChangeSlideProcess();
}

function ChangeSlide(slideNumber) {
    
    window.clearInterval(slideshow);
    
    currentSlide = slideNumber;
    
    ChangeSlideProcess();
}

function ChangeImage(element, newSrc) {
    
    element.setAttribute('src', "images/art/" + newSrc);
}

function GoTo(page) {
    
    window.location.href = page;
}

// HOME PAGE GAME SECTION

var badGames = [
    
    "https://gamejolt.com/games/GlobalGameJob/315389",
    "https://gamejolt.com/games/PeteredOut/337563",
    "https://gamejolt.com/games/disclaimerdtmp/246215",
    "https://gamejolt.com/games/LiterallyBall/293471",
    "https://gamejolt.com/games/NotSteveRogers/286914",
    "https://gamejolt.com/games/sushi-game-about-sushi/142532",
    "https://gamejolt.com/games/happy-birthgame-to-you/125628",
];

var badGameNames = [
    
    "Global Game Job",
    "Petered Out",
    "Disclaimer: Don't Tell My Parents",
    "Literally Ball",
    "Totally Not Captain America",
    "Sushi Game About Sushi",
    "Happy Birthgame To You",
];

var prevRandom = 0;
var currentRandom = 0;

var reelcountdown = 0;
var reeltimeout = 25;
var reelcounter = 0;

var reelrandomization;

function ShowBadGame() {
    
    var gamereelname = document.getElementById("gamereelname");
    var reelImages = document.getElementsByClassName("reelimg");
    
    currentRandom = Math.floor(Math.random() * badGames.length);
    
    while(currentRandom == prevRandom)
        currentRandom = Math.floor(Math.random() * badGames.length);
        
    prevRandom = currentRandom;
    
    reelcountdown = 0;
    reelcounter = 0;
    
    gamereelname.innerHTML = "???";

    reelrandomization = setInterval(function() {
        
        ReelRandomizer(gamereelname, reelImages);
    }, 25);
}

function ReelRandomizer(gamereelname, reelImages) {
    
    if(reelcounter >= reelImages.length)
        reelcounter = 0;
    
    if(reelcounter == 0) {
        
        reelImages[reelImages.length - 1].style.visibility = "hidden";
    } else {
        
        reelImages[reelcounter-1].style.visibility = "hidden";
    }
    
//    console.log(reelcounter);
    
    reelImages[reelcounter++].style.visibility = "visible";
    
    if(reelcountdown >= reeltimeout) {
        
        for(var i = 0; i < reelImages.length; i++) {
            
            reelImages[i].style.visibility = "hidden";
        }
        
        gamereelname.innerHTML = badGameNames[currentRandom];
        reelImages[currentRandom].style.visibility = "visible";
        window.clearInterval(reelrandomization);   
    }
    
    reelcountdown++;
}

function GoToRandomGame() {
    
    window.open(badGames[currentRandom]);
}

// HOME PAGE ART SECTION

var movingRight = false;
var movingLeft = false;

var posX = 15;
var dX = 0.75;
var boundLeft = 20;
var boundRight = 80;

var moving = setInterval(function() {

    var artball = document.getElementById("artball");

    if(artball == null)
        return;
    
    Moving(artball);
}, 50);

function Moving(artball) {
    
    if(movingRight) {
        
        posX+=dX;
        artball.style.transform = "translate(-50%) scaleX(1)";
    } else if(movingLeft){
        
        posX-=dX;
        artball.style.transform = "translate(-50%) scaleX(-1)";
    }
    
    if(posX < boundLeft)
        posX = boundLeft;
    else if(posX > boundRight)
        posX = boundRight;
    
    artball.style.left = posX + "%";
}

function MoveRight() {
    
    if(movingRight || movingLeft)
        return;
    
    document.getElementById("artball-idle").style.opacity = "0";
    document.getElementById("artball-rolling").style.opacity = "1";
    
    movingRight = true;
}

function MoveLeft() {
    
    if(movingRight || movingLeft)
        return;
    
    document.getElementById("artball-idle").style.opacity = "0";
    document.getElementById("artball-rolling").style.opacity = "1";
    
    movingLeft = true;
}

function StopRight() {
    
    document.getElementById("artball-idle").style.opacity = "1";
    document.getElementById("artball-rolling").style.opacity = "0";
    
    movingRight = false;
}

function StopLeft() {
    
    document.getElementById("artball-idle").style.opacity = "1";
    document.getElementById("artball-rolling").style.opacity = "0";
    
    movingLeft = false;
}

// EXPERIENCE MARKS 

var currentExp = -1;

var exps = [
    
    "Game Developer Freelancer/Ateneo de Manila University/MAY 2017/I developed a 3D first-person game where you play as a teen trying to get by day by day. I was pressed for time as I was only given 3 weeks to finish the project.",
    
    "Game Developer Intern/Anino/JUNE - AUGUST 2017/For the 3 months I was there, I worked on their current project, Double Win Vegas: Slots. My tasks went from bug fixing to feature implementing and finally to creating slot machines.",
    
    "Senior Game Developer/Computer Society of the Ateneo/2017 - 2018/I taught game development with Unity to the other members of the organization.",
    
    "Game Developer/Monstronauts/PRESENT/I'm currently working on Monstronauts' new game, OreBits, which is coming out soon. ;)"
];

function ShowExp(index) {
    
    var overlay = document.getElementById("expoverlay");
    var marks = document.getElementsByClassName("expmark");
    
    if(currentExp == -1) {
    
        overlay.style.opacity = "0";
        currentExp = index;
        
        for(var i = 0; i < marks.length; i++) {
            
            if(i == currentExp) {
                
                marks[i].style.background = "white";  
                marks[i].style.borderColor = "black";  
            } else {
                
                marks[i].style.background = "black";
                marks[i].style.borderColor = "white"; 
            }
        }
        
    } else if(currentExp == index) {
    
        overlay.style.opacity = "1";
        currentExp = -1;
        
        for(var i = 0; i < marks.length; i++) {
            
            marks[i].style.background = "black";
            marks[i].style.borderColor = "white"; 
        }
    } else {
        
        currentExp = index;
        
        for(var i = 0; i < marks.length; i++) {
            
            if(i == currentExp) {
                
                marks[i].style.background = "white";  
                marks[i].style.borderColor = "black";  
            } else {
                
                marks[i].style.background = "black";
                marks[i].style.borderColor = "white"; 
            }
        }
    }
    
    if(currentExp == -1) {
        
        document.getElementById("exptitle").innerHTML = "Title";
        document.getElementById("expplace").innerHTML = "Place";
        document.getElementById("expdate").innerHTML = "Date";
        document.getElementById("expinfo").innerHTML = "Info";
        return;
    }
    
    var datasplit = exps[currentExp].split("/");
    
    document.getElementById("exptitle").innerHTML = datasplit[0];
    document.getElementById("expplace").innerHTML = datasplit[1];
    document.getElementById("expdate").innerHTML = datasplit[2];
    document.getElementById("expinfo").innerHTML = datasplit[3];
    
}

// MEDAL TURNING

var canTurn = [
    
    1,1,1
];

function Turn(index) {
    
    var medals = document.getElementsByClassName("medal");
    
    if(canTurn[index] == 1) {
        
        medals[index].style.transform = "rotateY(360deg)";
        canTurn[index] = 0;
    } else if(canTurn[index] == 0) {
        
        medals[index].style.transform = "rotateY(0deg)";
        canTurn[index] = 1;
    }
}

// GAME REEL

var startingIndex = 0;
var itemwidth = 300;
var itemgap = 0;

var gameDetails = [
    
    "Global Game Job" + "|" +
    "Top 5 Games • Judge's Choice" + "|" +
    "Global Game Job was my team, <a class='bold black italic' href='https://www.facebook.com/bandilagames/' target='_blank' > Bandila Games</a>' entry for Global Game Jam 2018 @ FEU Tech. You play as an I.T. professional managing the bandwidth for teams participating in the game jam within the game. This game won two awards and was featured in GameConPH 2018.",
    
    "Petered Out" + "|" +
    "People's Choice Award" + "|" +
    "Petered Out is our college group's undergraduate thesis. Using different POVs, this game will teach you how to deal with individuals with Post-Traumatic Stress Disorder. Our game won an award for Ateneo's Interlinks event.",
    
    "Disclaimer: Don't Tell My Parents" + "|" +
    "" + "|" +
    "Disclaimer: Don't Tell My Parents is a game I made for my first freelance job. You follow the life of a lonely person. Encounters/choices will determine whether you will make or break the only emotional lifelines you have left.",
    
    "Literally Ball" + "|" +
    "" + "|" +
    "Literally Ball is a personal project. It's a simple platformer with hazards, enemies, an end goal, and a moving animation with more than 4 frames. It currently has only one level. Development has been postponed indefinitely due to lack of level design and art skills.",
    
    "Totally Not Captain America" + "|" +
    "" + "|" +
    "Totally Not Captain America is a game I made to show the members of Computer Society of the Ateneo (CompSAt) what kind of development I'm into. This game is an 'infinite' sidescroller game where you play as Not Captain America and go through Hydro's secret base in order to defeat Rad Skull.",
    
    "Sushi Game About Sushi" + "|" +
    "'Worst Title For A Game' Award" + "|" +
    "Sushi Game About Sushi is a testament to how bad I am at naming my games. I got the idea by randomly asking different people for a category, a specific item from that category, and a mechanic. Their answers were <span class=bold>FOOD</span>, <span class=bold>SUSHI</span>, and <span class=bold>FALLING</span>, respectively. Thus, the game is you play as a sushi that tries to avoid the falling chopsticks trying to get you.",
    
    "Happy Birthgame To You" + "|" +
    "First Game Evur" + "|" +
    "Happy Birthgame is the first game I made. This game is a sidescroller similar to Mario but way worse in terms of movement, jumping, mechanics, and overall look. You collect coins to give a pug dance lessons and go through a pack of cats to go beat the b0ss c@t. Someone build a time machine to go back in time and kick my 17 year old self for being so corny with this game.",
];

function AdjustGameReel() {
    
    console.log("ADJUSTING GAME REEL");
    
    var gamereel = document.getElementById("gamereel");
    
    if(gamereel == null)
        return;
    
    var reelitems = document.getElementsByClassName("reelitem");
    
    for(var i = 0; i < reelitems.length; i++) {
        
        var item = reelitems[i];
        
        if(i == startingIndex) {
          
            item.style.transform = "translateX(" + ((i - startingIndex) * (itemwidth + itemgap)) + "px) scale(1)";
            
            item.style.border = "10px double white";
            
            item.getElementsByClassName("preview")[0].style.opacity = "1";
        } else {
            
            scaleString = "scale(0.8)";
            
            item.style.transform = "translateX(" + ((i - startingIndex) * (itemwidth + itemgap)) + "px) scale(0.8)";
            
            item.style.border = "5px solid white";
            
            item.getElementsByClassName("preview")[0].style.opacity = "0";
        }
    }
    
    var detailsSplit = gameDetails[startingIndex].split("|");
    
    document.getElementById("game-name").innerHTML = detailsSplit[0];
    document.getElementById("game-mentions").innerHTML = detailsSplit[1];
    document.getElementById("game-info").innerHTML = detailsSplit[2];
}

function SpinReel(n) {
    
    startingIndex += n;
    
    var reelitems = document.getElementsByClassName("reelitem");
    
    if(startingIndex < 0)
        startingIndex = reelitems.length - 1;//0;
    else if(startingIndex >= reelitems.length)
        startingIndex = 0;// reelitems.length - 1;
    
    AdjustGameReel();
}

function SkipReel(n) {
    
    startingIndex = n;
    
    AdjustGameReel();
}

function OpenGame() {
    
    window.open(badGames[startingIndex]);
}

// MEME MODAL

function OpenMeme(element) {
    
    var memeModal = document.getElementById("meme-modal");
    var memeContainer = document.getElementById("meme-container");
    
    memeContainer.style.backgroundImage = "url(" + element.src + ")";
    memeModal.style.transform = "translateY(0)";
}

function CloseMeme() {
    
    var memeModal = document.getElementById("meme-modal");
    memeModal.style.transform = "translateY(-100%)";
}
