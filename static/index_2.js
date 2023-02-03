$('body').ready(function(){
    setInterval(function(){
        $.ajax({
            type: 'GET',
            url : url,
            success: function(response) {
                console.log(response);
                $("#display").empty();
    
                var recentUserDate = "";
                var recentUserName = "";
    
                for (var key in response.messages)
                {
                    var currentUserDate = response.messages[key].date.slice(0,10);
                    if (currentUserDate != recentUserDate) {
                        recentUserDate =
                            "<div class='date-tab'>"+
                            currentUserDate
                            +"</div>";
                        $("#display").append(recentUserDate);
                        recentUserDate = currentUserDate;
                    }
    
                    var currentUserName = response.messages[key].user;
                    if (currentUserName != recentUserName) {
                        var usertext = 
                            "<b>"+
                            response.messages[key].user
                            +"</b><p class='paragraph'>"+
                            response.messages[key].value
                            +"</p>";
                    } else {
                        var usertext = 
                            "<p class='paragraph'>"+
                            response.messages[key].value
                            +"</p>";
                    };

                    var temp =
                        "<div class='container darker'>"+
                        usertext
                        +"<span class='time-right'>"+
                        response.messages[key].date.slice(11,16)
                        +"</span></div>";

                    if (currentUserName != recentUserName) { 
                        $("#display").append("<br>"); 
                    };
                    if (currentUserName != user_name) {
                        $("#display").append(temp);
                    } else {
                        var mymessage = 
                            "<div class='container lighter'><p class='paragraph'>"+
                            response.messages[key].value
                            +"</p><span class='time-right'>"+
                            response.messages[key].date.slice(11,16)
                            +"</span></div>";
                        $("#display").append(mymessage);
                    };
                    recentUserName = currentUserName;
                }
            },
            error: function(response){
                alert('An error occured')
            }
        });
    },1000);
})