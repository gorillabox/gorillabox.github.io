let bannerImg1, bannerImg2, bannerImg3, bannerImg4, bannerImg5, bannerImg6, bannerImg7;

(function(){
	bannerImg1 = document.getElementsByClassName("bannerImg")[0];
	bannerImg2 = document.getElementsByClassName("bannerImg")[1];
	bannerImg3 = document.getElementsByClassName("bannerImg")[2];
	bannerImg4 = document.getElementsByClassName("bannerImg")[3];
	bannerImg5 = document.getElementsByClassName("bannerImg")[4];
	bannerImg6 = document.getElementsByClassName("bannerImg")[5];
	bannerImg7 = document.getElementsByClassName("bannerImg")[6];
	document.addEventListener("mousemove", function(e){
		if(nav.classList.contains("translateHide")){
			let screenWidth = window.innerWidth;
			//let screenHeight = window.innerHeight;
			bannerImg1.style.backgroundPosition = "calc(50% + "+(-((e.clientX-(screenWidth/2))*0.14))+"px) bottom";
			bannerImg2.style.backgroundPosition = "calc(50% + "+(-((e.clientX-(screenWidth/2))*0.11))+"px) bottom";
			bannerImg3.style.backgroundPosition = "calc(50% + "+(-((e.clientX-(screenWidth/2))*0.08))+"px) bottom";
			bannerImg4.style.backgroundPosition = "calc(50% + "+(-((e.clientX-(screenWidth/2))*0.1))+"px) bottom";
			//bannerImg4.style.transform = "rotateX("+(-(e.clientY-(screenHeight/2))*0.001)+"deg)";
			bannerImg5.style.backgroundPosition = "calc(50% + "+(-((e.clientX-(screenWidth/2))*0.08))+"px) bottom";
			//bannerImg5.style.transform = "rotateX("+(-(e.clientY-(screenHeight/2))*0.007)+"deg)";
			bannerImg6.style.backgroundPosition = "calc(50% + "+(-((e.clientX-(screenWidth/2))*0.06))+"px) bottom";
			//bannerImg6.style.transform = "rotateX("+(-(e.clientY-(screenHeight/2))*0.002)+"deg)";
			bannerImg7.style.backgroundPosition = "calc(50% + "+(-((e.clientX-(screenWidth/2))*0.12))+"px) bottom";
			projectsAnchor.style.backgroundPosition = "calc(50% + "+(-((e.clientX-(screenWidth/2))*0.1))+"px) bottom";
		}
	});
})();
