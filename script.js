console.log("Script Imported");

var isHomePage;

// NAVBAR FIELDS

var navbar;
var navbarLogoContainer;
var navbarHeight;
var navbarLinks;
var navbarBurgerSticks;
var navbarBurgerLinksContainer;
var navbarTransitionDuration;

// GAMES PAGE FIELDS

var gameGalleryItems;
var gameGalleryItemGap;
var gameGalleryItemWidth;
var gameDetailsSection;
var currentGameIndex = 0;
var gameDetailsAnimationDuration = 0.125 * 1000;

window.onload = function ()
{
	InitializeWindow();
}

$(window).scroll(function ()
{
	var wScroll = $(this).scrollTop();
	UpdateNavbar(wScroll);
});

var testCounter = 0;

function Test()
{
	console.log("TEST " + testCounter);
	testCounter++;
}

function UpdateNavbar(wScroll)
{
	if (navbar === null)
		return;

	var simple = isHomePage && wScroll < navbarHeight * 3;
	
	if (isHomePage)
	{
		navbar.css("transition-duration", navbarTransitionDuration);
		navbarLogoContainer.css("transition-duration", navbarTransitionDuration);
	}

	//navbar.css("border-bottom", simple ? "none" : "1px solid black");

	navbar.css("background", simple ? "rgba(0,0,0,0)" : "#f0f8ff");
	navbar.css("box-shadow", simple ? "none" : "0px -10px 15px 10px rgba(0,0,0,0.5)");

	navbarBurgerLinksContainer.css("background", simple ? "rgba(0,0,0,0)" : "#d5dde3");
	
	navbarLogoContainer.css("opacity", simple ? "0" : "1");
	navbarLogoContainer.css("flex-grow", simple ? "0" : "1");
	navbarLogoContainer.css("transition-timing-function", simple ? "ease-in" : "ease-out");

	if (navbarLinks != null)
	{
		for (var i = 0; i < navbarLinks.length; i++)
		{
			navbarLinks[i].style.color = simple ? "white" : "black";
		}
	}
	
	if (navbarBurgerSticks != null)
	{
		for (var i = 0; i < navbarBurgerSticks.length; i++)
		{
			navbarBurgerSticks[i].style.borderBottomColor = simple ? "white" : "black";
		}
	}
}

function AdjustGameGallery(index)
{
	if (gameGalleryItems === null)
		return;
	
	if (currentGameIndex !== index)
	{
		// Animate
		gameDetailsSection.css("transition", "0s all");
		gameDetailsSection.css("opacity", "0");
		setTimeout(() =>
		{
			gameDetailsSection.css("transition", "1s all");
			gameDetailsSection.css("opacity", "1");
		}, gameDetailsAnimationDuration);
	}

	currentGameIndex = index;

	for (var i = 0; i < gameGalleryItems.length; i++)
	{
		var item = gameGalleryItems[i];
		var offsetIndex = i - currentGameIndex;

		var xPos = (offsetIndex * (gameGalleryItemWidth + gameGalleryItemGap));
		var scale = i !== index ? 1 : 1.125;

		var offsetPos = 0;

		if (i < currentGameIndex)
			offsetPos = -gameGalleryItemGap;
		else if (i > currentGameIndex)
			offsetPos = gameGalleryItemGap;

		xPos += offsetPos;

		var xPosString = xPos + "px";

		item.style.transform =
			"translateX(" + xPosString + ")" +
			"scale(" + scale + ")";
	}
}

function CloseBurgerMenu()
{
	console.log("close burger menu");
	$(".navbar-burger-toggle").prop("checked", false);
}

function RevalidateBurgerMenu()
{
	var checked = $(".navbar-burger-toggle").prop("checked");
	
	navbarBurgerLinksContainer.css("max-height", checked ? "400px" : "0px");
}

function ReinitializeWindow()
{
	setTimeout(
		function ()
		{
			InitializeWindow();
		},
		2
	)
}

function InitializeWindow()
{
	navbar = $(".navbar");
	navbarLogoContainer = $(".navbar-logo-container");
	navbarHeight = navbar.height();
	navbarLinks = document.getElementsByClassName("navbar-link");
	navbarBurgerSticks = document.getElementsByClassName("navbar-burger-stick");
	navbarBurgerLinksContainer = $(".navbar-burger-links-container");
	navbarTransitionDuration = "0.69s";

	isHomePage = CheckHomePage();

	var wScroll = $(this).scrollTop();
	UpdateNavbar(wScroll);

	gameDetailsSection = $('.game-details-section');
	gameGalleryItems = document.getElementsByClassName("games-gallery-item");
	if (gameGalleryItems !== null && gameGalleryItems.length !== 0)
	{
		gameGalleryItemWidth = gameGalleryItems[0].offsetWidth;
		gameGalleryItemGap = gameGalleryItemWidth * 0.1;
	}

	AdjustGameGallery(0);
}

function CheckHomePage()
{
	return !window.location.href.includes("portfolio");
}