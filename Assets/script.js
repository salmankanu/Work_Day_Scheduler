var nowDate = moment();
     var nowDateID = nowDate.format('YYYY-MM-DD');
     var headerDate = nowDate.format('dddd MMM DD YYYY');
    // var saveBtn = document.querySelector("#saveBtn");
     
     document.getElementById("todayDay").innerHTML = headerDate;
     
     hourUpdate();
      // hour update
   function hourUpdate() {
      var currentHour = moment().hours();

      //To clear the entire items on the scheduler 
      //A confirmation alert gnerated to confirm clearing of the scheduler to prevent accdential deletion
   $("#resetDay").on("click", (e) => {
    if (confirm("Are you sure?")) {
        localStorage.clear();
        location.reload();
        console.log("Welcome to a wonderful new day 🌞");
    } else {
        console.log("good luck on the rest of your day!");
    }
})
      // Dynamically changing time Color code for past, present or future
      $(".time-block").each(function() {
        var timeblockHour = parseInt($(this).attr("id").split("-")[0]);
        
        if (timeblockHour < currentHour) {
          $(this).addClass("past");
        }
        else if (timeblockHour == currentHour) {
          $(this).removeClass("past");
          $(this).addClass("present");
        }
        else {
          $(this).removeClass("past");
          $(this).removeClass("present");
          $(this).addClass("future");
        }
        
        var childText = $(this).children('textarea');
        var childTextID = childText.attr('id');
        var keyID = nowDateID + '_' + childTextID
        var childValue = localStorage.getItem(keyID);
        
        if(childValue){
          childText.val(childValue);
        }
      });
      console.log("timeblockHour");
   };
      // Adding event listener to SaveBtn
  $(document).ready(function() {
        console.log("ready");
      $('body').on('click','.saveBtn',function(e) {
        console.log('click');
         e.stopImmediatePropagation();
            e.preventDefault();
        
        var textInput = $(this).siblings('textarea');
        var textID = textInput.attr('id');
        var keyID = nowDateID + '_' + textID;
        var textValue = textInput.val();
        
        localStorage.setItem(keyID,textValue);
        console.log("ready")
    });
});