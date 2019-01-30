let historyElements = [];
let historyDisplayOffset = 0;
let historyDisplayed = false;

(function(){
	historyDisplayOffset = historyAnchor.offsetTop;

	for(let i=events.length-1;i>=0;i--){
		let div = document.createElement("div");
		div.classList.add("historyElement");
		let dateHistory = document.createElement("div");
		dateHistory.classList.add("dateHistory");
		dateHistory.appendChild(document.createTextNode(events[i][1]));
		let eventHistory = document.createElement("div");
		eventHistory.classList.add("eventHistory");
		eventHistory.innerHTML = events[i][0];
		if(i !== 0){
			eventHistory.style.opacity = "0";
			dateHistory.style.opacity = "0";
			let bar = document.createElement("div");
			bar.classList.add("historyBar");
			div.appendChild(bar);
			dateHistory.classList.add("absolute");
			eventHistory.classList.add("absolute");
			let barHori = document.createElement("div");
			barHori.classList.add("barHori");
			if(i%2 === 0){
                dateHistory.classList.add("dateRight");
                eventHistory.classList.add("eventRight");
			}else{
                dateHistory.classList.add("dateLeft");
                eventHistory.classList.add("eventLeft");
			}
			historyElements.push([dateHistory, eventHistory, barHori]);
			div.appendChild(barHori);
		}else{
			dateHistory.classList.add("historyLast");
			eventHistory.classList.add("historyLast");
			historyElements.push([dateHistory, eventHistory]);
		}
		div.appendChild(dateHistory);
		div.appendChild(eventHistory);
		historyAnchor.appendChild(div);
	}

	window.addEventListener("scroll", function(){
		if(window.pageYOffset >= (historyDisplayOffset-(window.innerHeight/2)) && historyDisplayed === false){
			historyDisplayed = true;
			for(let i=historyElements.length-1;i>=0;i--){
			    if(i !== historyElements.length-1) {
			        if((historyElements.length-1) % 2 === 0){
                        if (i % 2 === 0) {
                            historyAnim(historyElements[i][0], i, "dateRight");
                            historyAnim(historyElements[i][1], i, "eventRight");
                            setAnimListenerOpen(historyElements[i][2], i);
                        } else {
                            historyAnim(historyElements[i][0], i, "dateLeft");
                            historyAnim(historyElements[i][1], i, "eventLeft");
                            setAnimListenerOpen(historyElements[i][2], i);
                        }
                    }else{
                        if (i % 2 === 0) {
                            historyAnim(historyElements[i][0], i, "dateLeft");
                            historyAnim(historyElements[i][1], i, "eventLeft");
                            setAnimListenerOpen(historyElements[i][2], i);
                        } else {
                            historyAnim(historyElements[i][0], i, "dateRight");
                            historyAnim(historyElements[i][1], i, "eventRight");
                            setAnimListenerOpen(historyElements[i][2], i);
                        }
                    }
                }
			}
		}
	});
})();

function historyAnim(object, delay, anim){
	object.style.animation = anim+" 1s "+(delay/8)+"s";
	object.addEventListener("animationend", historyAnimEvent);
}
function historyAnimEvent(e){
    e.target.style.opacity = "1";
    e.target.style.animation = "";
	e.target.removeEventListener("animationend", historyAnim);
}