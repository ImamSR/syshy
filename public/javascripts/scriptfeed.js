$(function() {
    // navbar button
    let navBtn = $('#nav-button');
    
    navBtn.click(function() {
        if(navBtn.hasClass('open')) {
            navBtn.toggleClass('open');
            navBtn.css("transform", "rotate(0deg)");
        } else {
            navBtn.toggleClass('open');
            navBtn.css("transform", "rotate(90deg)");
        }
    });
    
    // navbar profile picture wrapper
    let profilePicture = $(".profile-picture");
    let dmenu = $("#dropdownmenu");
    
    profilePicture.click(function() {
    
        if(dmenu.hasClass('open')) {
            dmenu.toggleClass('open');
            dmenu.css("display", "none");
        } else {
            dmenu.toggleClass('open');
            dmenu.css("display", "block");
        }
    
    });


    $("#switch").on('click', function () {
        if ($("body").hasClass("light")) {
            $("body").removeClass("light");
            $("#switch").removeClass("switched");
            $("#switch a").html('<i class="uil uil-sunset"></i> Light Mode');
        }
        else {
            $("body").addClass("light");
            $(".switch").addClass("switched");
            $("#switch a").html('<i class="uil uil-moonset"></i> Dark Mode');
        }
        });
        
});