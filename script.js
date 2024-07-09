score = 0;
cross = true;
audio = new Audio("music.mp3");
audiogo = new Audio("gameover.mp3");
document.addEventListener("keydown",function(e){
    // console.log(e.keyCode);
    audio.play();
    if(e.keyCode==38){
        dino = document.querySelector(".dino");
        dino.classList.add("animateDino");
        setTimeout(() => {
            dino.classList.remove("animateDino");
        },700);
    }
    if(e.keyCode==39){
        dino = document.querySelector(".dino");
        dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue("left"));
        dino.style.left = dx + 100 + "px";
    }
    if(e.keyCode==37){
        dino = document.querySelector(".dino");
        dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue("left"));
        dino.style.left = (dx - 100) + "px";
    }
})

setInterval(() => {
    dino = document.querySelector(".dino");
    obstacle = document.querySelector(".obstacle");
    gameOver = document.querySelector(".gameOver");

    dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue("left"));
    dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue("top"));

    ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue("left"));
    oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue("top"));

    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);
    // console.log(offsetX+" "+offsetY);
    if(offsetX<94 && offsetY<120){
        gameOver.innerHTML = "Game Over - Reload To Start"
        obstacle.classList.remove("obstacleAni");
        audiogo.play();
        setTimeout(() => {
          audiogo.pause();
          audio.pause();
        },1000)
    }
    else if(offsetX<145 && cross){
        score++;
        updateScore(score);
        cross = false;
        setTimeout(() => {
          cross = true;
        },1000);
        aniDur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue("animation-duration"));
        newDur = aniDur - 0.01;
        obstacle.style.animationDuration = newDur + 's';
        console.log("New Animation Duration: "+newDur);
    }
},100)

function updateScore(score){
    document.querySelector("#scoreCont").innerHTML = "Your Score: "+score;
}