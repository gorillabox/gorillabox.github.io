(function(){
	clickToScroll();
	progressBar();
})();

function progressBar(){
    getMaxHeight();
    window.addEventListener("resize", function(){
    	getMaxHeight();
    });
	window.addEventListener("scroll", function(){
		clientScrollHeight = window.pageYOffset;
		progressPercent = ((clientScrollHeight+window.innerHeight)/height)*100;
		scrollProgress.style.width = progressPercent+"%";
	});
}

function getMaxHeight(){
	height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
	progressPercent = ((clientScrollHeight+window.innerHeight)/height)*100;
	scrollProgress.style.width = progressPercent+"%";
}

function clickToScroll(){
	let navItems = document.getElementsByClassName("navItem");
	for(let i=0;i<navItems.length;i++){
		navItems[i].addEventListener("click", function(e){
			e.preventDefault();
            if(i===0)
                scrollToTop();
			if(i===1)
				scrollTo(projectsAnchor);
			else if(i===2)
				scrollTo(membersAnchor);
            else if(i===3)
                scrollTo(historyAnchor);
			closeMenu(true);
		});
	}
}

function scrollTo(element){
    window.scroll({
        behavior: 'smooth',
        top: element.offsetTop
    });
}

function scrollToTop(){
    window.scroll({
        behavior: 'smooth',
        top: 0
    });
}