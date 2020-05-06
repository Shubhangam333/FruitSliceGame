var playing=false;
var score;
var trialsleft;
var step;
var action;
var fruits=['apple','banana','grapes','mango','orange','pineapple'];
$(function(){
    //click on start reset button
    $('#startreset').click(function(){
       //if we are playing
        if(playing==true){
            //reload page
            location.reload();
        }else{
            //we are not playing
            playing=true;//game initiated
            //set score
            score=0;//set score to 0
            $("#scorevalue").html(score);
            //show trials left
            $("#trialsleft").show();
            trialsleft=3;
            addHearts();
            $("#gameOver").hide();
            //change button text to reset game
            $("#startreset").html("Reset Game");
            //start sending fruits
            startAction();
        }
    })
$("#fruit1").mouseover(function(){
score++;
$("#scorevalue").html(score)//update score
$('#slicesound')[0].play();//play sound
  //stop fruit
  clearInterval(action);
    
  //hide fruit
  $("#fruit1").hide("explode", 500); //slice fruit
  
  //send new fruit
  setTimeout(startAction, 500);
})

function addHearts(){
    $("#trialsleft").empty();
    for(i=0;i<trialsleft;i++){
        $("#trialsleft").append('<img src="images/heart.png" class="life">');
    }
}
function startAction(){
    //generate a fruit
    $("#fruit1").show();
    chooseFruit();//choose random fruit
    $("#fruit1").css({'left':Math.round(550*Math.random()),'top':-50})
    //generate a random step
    step=1+Math.round(5*Math.random())//change step

    //Move fruit down one step after every 10s
    action=setInterval(function(){
        $('#fruit1').css('top',
        $('#fruit1').position().top+step)

        //check if fruit is too low
        if($('#fruit1').position().top>
        $('#fruitsContainer').height()){
            //check if we hae trials left
            if(trialsleft>1){
               //generate a fruit
    $("#fruit1").show();
    chooseFruit();//choose random fruit
    $("#fruit1").css({'left':Math.round(550*Math.random()),'top':-50})
    //generate a random step
    step=1+Math.round(5*Math.random())//change step
    //reduce trials by one
    trialsleft--;
    //populate trialsleft box;
    addHearts();
            }else{
                //game over
               playing=false;//we are not playing anymore
               $('#startreset').html('Start Game');//change button to start game
               $('#gameOver').show();
               $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
               $("#trialsleft").hide();
               stopAction();
            }
        }
    },10)

}
function chooseFruit(){
    $("#fruit1").attr('src','images/'+fruits[Math.round(5*Math.random())]+'.png');
}

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}

})