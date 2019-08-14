function displayOneAfterOther(array, animationName, delayBetween, firstDelay, firstDelayDifferent){
    let totalDelay = 0;
    if(firstDelay){
        if(firstDelayDifferent !== false)
            totalDelay = firstDelayDifferent;
        else
            totalDelay = delayBetween;
    }

    for(let i = 0;i <array.length;i++){
        array[i].style.animation = animationName + " " + totalDelay + "s";
        totalDelay += delayBetween;
    }
}
