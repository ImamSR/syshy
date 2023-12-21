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



let profilePicWrapper = $(".profile-pic-wrapper");
let profilePicNote = $(".profile-pic-note");
profilePicWrapper.on({
    mouseenter: function () {
        profilePicNote.css("top", "110%");
        profilePicNote.css("opacity", "1");
    },
    mouseleave: function () {
        profilePicNote.css("top", "105%");
        profilePicNote.css("opacity", "0");
    }
});

let profileHeaderWrapper = $(".profile-header-img-wrapper");
let profileHeaderNote = $(".profile-header-note");
profileHeaderWrapper.on({
    mouseenter: function () {
        profileHeaderNote.css("top", "110%");
        profileHeaderNote.css("opacity", "1");
    },
    mouseleave: function () {
        profileHeaderNote.css("top", "105%");
        profileHeaderNote.css("opacity", "0");
    }
});




$("#img1").on({
    mouseenter: function () {
        $("#iov1").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov1").css("opacity", "0");
    }
});
$("#img2").on({
    mouseenter: function () {
        $("#iov2").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov2").css("opacity", "0");
    }
});
$("#img3").on({
    mouseenter: function () {
        $("#iov3").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov3").css("opacity", "0");
    }
});
$("#img4").on({
    mouseenter: function () {
        $("#iov4").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov4").css("opacity", "0");
    }
});
$("#img5").on({
    mouseenter: function () {
        $("#iov5").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov5").css("opacity", "0");
    }
});
$("#img6").on({
    mouseenter: function () {
        $("#iov6").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov6").css("opacity", "0");
    }
});
$("#img7").on({
    mouseenter: function () {
        $("#iov7").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov7").css("opacity", "0");
    }
});
$("#img8").on({
    mouseenter: function () {
        $("#iov8").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov8").css("opacity", "0");
    }
});
$("#img9").on({
    mouseenter: function () {
        $("#iov9").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov9").css("opacity", "0");
    }
});
$("#img10").on({
    mouseenter: function () {
        $("#iov10").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov10").css("opacity", "0");
    }
});
$("#img11").on({
    mouseenter: function () {
        $("#iov11").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov11").css("opacity", "0");
    }
});
$("#img12").on({
    mouseenter: function () {
        $("#iov12").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov12").css("opacity", "0");
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
});});