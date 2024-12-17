let membersList = $(".member-finsify");

$.getJSON("members.json",{}, function(data){
  if (data.length > 0) {
    membersList.empty();
    data.forEach(function(member){
      membersList.append('<div class="box" style="background-image:url(\''+ member.avatarUrl +'\'); background-size: cover; background-position: top">'
        + '<span class="info">'
        + '<p>'+member.name+'<br/><span>'+member.position+'</span></p>'
        + '</span></div>')
    });

    autoSlideMembersList(data.length)
  }
});


//auto translate members list
function autoSlideMembersList(membersLength){
  var firstLine = $(".member-finsify > .box:nth-child(1)").offset().top;
  var secondLine = $(".member-finsify > .box:nth-child(7)").offset().top;

  var currentIndex = 0;
  var distance;

  setInterval(function(){
    if (currentIndex*6 + 1 < membersLength) {
      distance = secondLine - firstLine;
      currentIndex++;
    } else {
      distance = 0;
      currentIndex = 0;
    }

    $(".member-finsify").animate({
        scrollTop: distance
    }, 500);
  }, 3000);
}
