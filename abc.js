




var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

    var data1;
    var data2;
    var data3;
    
    // var stepGrid = document.getElementsByClassName("address-change");
    var currentStep = 0;
    var curatedIntent= document.getElementById("first-intent");
    
    

$(window).load(function(){
  
});





$(window).load(function() {
  $messages.mCustomScrollbar();

  for (var i = 0; i < Fake.length; i++) {
    (function(n) {
        setTimeout(function(){
            fakeMessage();
        }, 6000*i);
    }(i));
}

});


var Fake = [
  'Thanks for calling Santander! How can i help you today?',
  'hello',
  'Sure, I can help you with that. Please give me a moment.',
  'Can I have your new address please?',
  'Your address has been updated ',
    'Sure. Before that I need to get some more information from you',
  'Can I have last 4 digits of your account number?',
    'Thanks for the information. Your old card has been blocked now. Is there anything, I can help you with today?',
  "My pleasure.. Have a nice day!"
  
  
]
var cust = [
  'i want',
  'Hi',
  'can you please help me in changing my address',
  'Okay',
  '254- Main Street, London - SW182A', 
  'Thank you, I also need an another help in blocking my old card.',
  'Definitely.',
    '8452',
    "I don't have anything.Thank you for helping",
    ":)"
]





function sendRequestToAPI(req){
  var settings = {
    "url": "http://localhost:3000/getDetectedIntent",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    "data": JSON.stringify({"result":{"parameters":{"queryText":req}}}),
  };
  
  $.ajax(settings).done(function (response) {
   var x = JSON.parse(response).intent;

   const result = document.createElement('result')
   result.id = 'adress-div';
   result.innerHTML = x;                  
   if (x.split(' ')[0] != 'Default') {
   curatedIntent.append(result); 
  
   }
 
  
  
  });
}



  

function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
    }
    var customer_timeout = 1000
  setTimeout(function() {
    //$('<div class="message loading new"><figure class="avatar"><img src="assests/people-customer-woman-512.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="assests/34-256.png" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
    sendRequestToAPI(cust[i]);
    //$('<div class="message loading new"><figure class="avatar"><img src="assests/people-customer-woman-512.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
      i++;
      
      setTimeout(() => {
          $('<div class="message new"><figure class="avatar"><img src="assests/people-customer-woman-512.png"/></figure>' + cust[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
          customer_timeout = 0
      }, 2000)
    setDate();
    updateScrollbar();
  }, 1000);
  }



  



  function setDate(){
    d = new Date()
    if (m != d.getMinutes()) {
      m = d.getMinutes();
      $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    }
  }
  function updateScrollbar() {
    $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
      scrollInertia: 10,
      timeout: 0
    });
  }

{/* <input type="text" class="form-control oracle-search" name="query"  placeholder="Start typing something to search..."> ',
  'Please Enter Your Target Price' */}




  $(document).ready(function(){
    $('.floatingButton').on('click',
        function(e){
            e.preventDefault();
            $(this).toggleClass('open');
            if($(this).children('.fa').hasClass('fa-plus'))
            {
                $(this).children('.fa').removeClass('fa-plus');
                $(this).children('.fa').addClass('fa-close');
            } 
            else if ($(this).children('.fa').hasClass('fa-close')) 
            {
                $(this).children('.fa').removeClass('fa-close');
                $(this).children('.fa').addClass('fa-plus');
            }
            $('.floatingMenu').stop().slideToggle();
        }
    );
    $(this).on('click', function(e) {
        var container = $(".floatingButton");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && $('.floatingButtonWrap').has(e.target).length === 0) 
        {
            if(container.hasClass('open'))
            {
                container.removeClass('open');
            }
            if (container.children('.fa').hasClass('fa-close')) 
            {
                container.children('.fa').removeClass('fa-close');
                container.children('.fa').addClass('fa-plus');
            }
            $('.floatingMenu').hide();
        }
    });
});







var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
// Initial state
var scrollPos = 0;
// adding scroll event
window.addEventListener('scroll', function(){
  if (window.pageYOffset >= sticky) {
  navbar.classList.add("sticky")
  } else {
  navbar.classList.remove("sticky");
  }
});






function flipCover (css, options) {
  var options = options || {}
  if (typeof css === "object") {
    options = css
  } else {
    options.css = css
  }

  var css = options.css
  var url = options.url
  var text = options.text || css
  var width = options.width
  var height = options.height

  var $section = $(".flip-cover-" + css).addClass(css + "-section")
  var $button = $("<div>").addClass(css + "-button")
  var $cover = $("<div>").addClass(css + "-cover")
  var $outer = $("<div>").addClass(css + "-outer")
  var $inner = $("<div>").addClass(css + "-inner")

  if (width) {
    $section.css("width", width)
  }

  if (height) {
    $section.css("height", height)

    var lineHeight = ':after{ line-height: ' + height + ';}'
    var $outerStyle = $('<style>').text('.' + css + '-outer' + lineHeight)
    $outerStyle.appendTo($outer)
    var $innerStyle = $('<style>').text('.' + css + '-inner' + lineHeight)
    $innerStyle.appendTo($inner)
  }

  $cover.html($outer)
  $inner.insertAfter($outer)

  $button.html($("<a>").text(text).attr("href", url))

  $section.html($button)
  $cover.insertAfter($button)
 }



flipCover({
  css: "dribbble",
  url: "https://dribbble.com/vveleva",
  text: "vveleva",
  width: "80px"
})

flipCover("twiter", {
  url: "https://twitter.com/vveleva",
  text: "vveleva",
  width: "80px"
})

flipCover("linkedin", {
  url: "https://linkedin.com/in/vveleva",
  text: "vveleva",
  width: "80px"
})

flipCover("email", {
  text: "vvveleva @gmail",
  width: "80px",
  height: "50px"
})






$(document).ready(function(){
  $('#to').click(function() {
    $('.identified-tags').toggle("slide");
  });
});

/** script of last login */

var acc= document.getElementsByClassName("accordion");
for(var i=0; i<acc.length; i++){
    acc[i].addEventListener("click", function(){
        this.classList.toggle("active");
        var panel=this.nextElementSibling;
        if(panel.style.display==="block"){
            panel.style.display="none";
        }else{
            panel.style.display= "block";
        }
    });
}


$(document).ready(function(){
  $('#dropDown').click(function(){
    $('.drop-down').toggleClass('drop-down--active');
  });
});
















const myString = 
[
  "Step 1:Is there a fraud block on the card"
  
  
];
function curated() {
    document.getElementById("GFG_DOWN").innerHTML = myString;
  }

  const justString = 
[
  "Step 4:Is there a fraud block on the card"
  
  
];


  function function1() {
    document.getElementById("last").innerHTML = justString;
    
     
  }

  function function2() {
    document.getElementById("client-name").innerHTML = "Step 1.";
  }

  function function3() {
    document.getElementById("client-name").innerHTML = "You will be directed immediately!"

  }


var i = 0;
var txt = 'Contactless not working';

var speed = 50;
var text = 'how to change cardholder name';
var sometxt =  'contactless not working,expiry';
var unabletxt =  'unable to use contactless';
var exprtxt='contacless expiry date';


var callOne = true;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("send-msg").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
  callOne = !callOne;
}

function two() {
  if (i < text.length) {
    document.getElementById("msg-send").innerHTML += text.charAt(i);
    i++;
    setTimeout(two, speed);
  }
}



function call(){
  document.getElementById("send-msg").innerHTML =''
  search_value=document.getElementById("search").value;
console.log(search_value);

 if(search_value =='contactless not working'){

    document.getElementById("send-msg").innerHTML = txt;
  
 }

  else if(search_value =='contactless not working,expiry'){

  document.getElementById("last").innerHTML = sometxt;

}
 else if(search_value =='unable to use contactless'){

  document.getElementById("send-msg").innerHTML = unabletxt;

}
else if(search_value =='contacless expiry date')
 {
  document.getElementById("last").innerHTML = exprtxt;
 }

 else{
  
    document.getElementById("msg-send").innerHTML = text;
  }
}


$(document).ready(function(){
  console.log("check");
  $('#useful').click(function() {
    $(".center").css({"visibility":"hidden"})
    document.getElementsByClassName("doc")[0].innerHTML = data1.result.results[0].text;
    $('.doc').toggle("slide");

  });
});



$('#address').click(function () {
    console.log("Address click..")
   var intentPress = document.getElementById("adress-div").innerHTML;
    $("#first-intent").css({"box-shadow":"inset 20px 20px 50px rgb(178 173 173 / 29%);"})
    $(".center").css({ "visibility": "hidden" })
    if ($('[name="graduate"]:checked').is(":checked")) {
        $(".toggle").css({ "visibility": "hidden" })
    } else {
        $(".toggle").css({ "visibility": "visible" })
    }
    $(".address-change").css({ "background": "white" })
    $(".btn-rpa").css({"opacity":"80%"})
    $(".text-center").css({"visibility":"visible"})
    $(".show-steps").css({ "visibility": "visible" }) 
    document.getElementsByClassName("sop_name")[0].innerHTML = data2.sop_name;
      document.getElementsByClassName("address-change")[0].innerHTML = data2.steps.join();

     /* if (intentPress == "changeOfAddress") {
          document.getElementsByClassName("sop_name").innerHTML = "<h3>" + data2.sop_name + "</h3>";
          document.getElementsByClassName("address-change")[0].innerHTML = data2.steps.join();
      }
    
else {
          document.getElementsByClassName("sop_name").innerHTML = "<h3>" + data2.sop_name + "</h3>";
      document.getElementsByClassName("address-change")[0].innerHTML =  data2.steps.join();
}
$('.address-change').toggle("slide");
*/
   
});

















$(document).ready(function(){
  $('#soln').click(function() {
    $('.possible-soln').toggle("slide");
  });

  $('#down-thumb').click(function() {
    $('.another-feedback').toggle("slide");
  });
});

$(document).ready(function(){
  
  $('#rpa-open').click(function() {
    $('.window').toggle("slide");
  });
});



$(document).ready(function(){
  $('#show-link').click(function() {
    $('.link-show').toggle("slide");
  });
});

$(document).ready(function(){
  $('#show').click(function() {
    $('.menu').toggle("slide");
  });
});

$(document).ready(function(){
  $('#process').click(function() {
    $('.menu').toggle("slide");
  });
});

$(document).ready(function(){
  $('#tag').click(function() {
    $('.full-info').toggle("slide");
  });
});

$(document).ready(function(){
  $('#respond').click(function() {
    $('.response').toggle("slide");
  });
});



$(document).ready(function(){
  $('#sent').click(function() {
    $('.panel__content-inner').toggle("slide");
  });
});

$(document).ready(function(){
  $('#send-msg').click(function() {
    $('.curated-material').toggle("slide");
  });
});

$(document).ready(function(){
  $('#appear').click(function() {
    $('.fulldoc').toggle("slide");
  });
});

$(document).ready(function(){
  $('#showup').click(function() {
    $('.displaydoc').toggle("slide");
  });
});

$(document).ready(function(){
  $('#showstep').click(function() {
    $('.displaystep').toggle("slide");
  });
});

$(document).ready(function(){
  $('#msgbubble').click(function() {
    $('.showbubble').toggle("slide");
  });
});



$(document).ready(function(){
  $('#sop').click(function() {
    $('.showsop').toggle("slide");
  });
});

$(document).ready(function(){
  $('#step3').click(function() {
    $('.expiry').toggle("slide");
  });
});

$(document).ready(function(){
  $('#scam').click(function() {
    $('.btn-appear').toggle("slide");
  });
});


$(document).ready(function(){
  $('#card').click(function() {
    $('.btn-rpa').toggle("slide");
  });
});

$(document).ready(function(){
  $('#hide').click(function() {
    $('.hiding').toggle("slide");
  });
});




$(document).ready(function() {
  $("#color_mode").on("change", function () {
      colorModePreview(this);
  })
});

function colorModePreview(ele) {
  if($(ele).prop("checked") == true){
      $('body').addClass('dark-preview');
      $('body').removeClass('white-preview');
  }
  else if($(ele).prop("checked") == false){
      $('body').addClass('white-preview');
      $('body').removeClass('dark-preview');
  }
}








/*  for drop down */

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
// function myFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}




/*  for another step drop down */
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function anotherstep() {
  document.getElementById("my").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

/*  for another step drop down */




/*  for another step drop down */
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function step1() {
  document.getElementById("curation").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

/*  for another step drop down */



function thumbs(x) {
  x.classList.toggle("fa-thumbs-up");


}















  $(".js-panel-toggle").click(function () {
    var $panelContent = $(this).parents(".panel").children(".panel__content");
    if ($panelContent.is(":visible")) {
        $panelContent.slideUp(250).parents(".panel").addClass("panel--is-closed");
    } else {
        $panelContent.slideDown(250).parents(".panel").removeClass("panel--is-closed");
    }
});
  




// for previous next

$(document).ready(function(){
  var totalrows = $(".divControl").length;
  var pageSize=4;
  var noOfPage = totalrows/pageSize;
  noOfPage = Math.ceil(noOfPage);
  for(var i=1;i<=noOfPage;i++)
   {
    $("#divPages").append('<div class="page">'+i+'</div>'); 
   }
   var totalPagenum = $("div.page").length;
   if(totalPagenum >2)
   {
    $("div.page").hide();
    for(var n=1;n<=2;n++)
    {
     $("div.page:nth-child("+n+")").show();
    }
   }
   else{
     $("div.next").hide();
    $("div.prev").hide();
   }
   $("div.divControl").hide();
  for(var j=1;j<=pageSize;j++)
   {
     $("div.divControl:nth-child("+j+")").show();
   }
   displayevent();
    $("div.next").click(function(){
    if($("div.selected:last").nextAll('div.page').length > 2)
   {
        $("div.selected").last().nextAll(':lt(2)').show();
        $("div.selected").hide();
        displayevent();
        //lastposevent();
        $("div.prev").show();
        $("div.next").show();
    }
    else{
     $("div.selected").last().nextAll().show();
     $("div.selected").hide();
     displayevent();
     $("div.next").hide();
     $("div.prev").show();
    }
   });
   $("div.prev").click(function(){
   if($("div.selected:first").prevAll('div.page').length > 2)
   {
        $("div.selected").first().prevAll(':lt(2)').show();
        $("div.selected").hide();
        $("div.prev").show();
        $("div.next").show();
        displayevent();
   }
   else{
   $("div.selected").first().prevAll().show();
        $("div.selected").hide();
        $("div.prev").hide();
        $("div.next").show();
        displayevent();
        }
   });
  $("div.page").click(function(){
   var currentPage = $(this).text();
       $("div.divControl").hide();
    for (var k = (currentPage * pageSize) - (pageSize-1); k <= (currentPage * pageSize); k++) 
   {
     $("div.divControl:nth-child("+k+")").show();
   }  
   });
 });
 function displayevent()
 {
   $("div.page").each(function(){
    if( $(this).css('display') === 'block') {
   $(this).addClass('selected');
   }
   else{
   $(this).removeClass('selected');
   }
   });
 }



  //for clicking up and down

 $(document).ready(function(){
  $(".change").click(function(){
  var x= $(this).find(".click").text();
  if(x=="+")
  {
  $(this).find(".click").text('-');
  $(this).next().slideDown();
  }
  else
  {
  $(this).find(".click").text('+');
  $(this).next().slideUp();
  }
  });
  });


  









/* for closing window*/






$(window).load(function(){
  $.ajax({
    method: 'POST',
    crossDomain: false,
    dataType: 'json',
    crossOrigin: false,
    async: true,
    contentType: 'application/json',
  data:{
    "result": {
      "parameters":{
          "queryText":"change adress"
      }}
  },
    headers: {
        'Access-Control-Allow-Methods': '*',
        "Access-Control-Allow-Credentials": false,
        "Access-Control-Allow-Headers" : "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization",
        "Access-Control-Allow-Origin": "*",
        "Control-Allow-Origin": "*",
        "cache-control": "no-cache",
        'Content-Type': 'contentType: "application/x-www-form-urlencoded"'
    },
    url: 'http://localhost:3000/getNonCuratedSOP',
    success: function(response){
      data1 = response;
        console.log("Respond was: ", response);
    },
    error: function (request, status, error) {
        console.log("There was an error: ", request.responseText);
    }
  })

});


$(window).load(function(){
  var settings1 = {
    "url": "http://localhost:3000/getCuratedSOP",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    "data": JSON.stringify({"result":{"parameters":{"queryText":"balanceTransfer"}}}),
    
  };
  
  $.ajax(settings1).done(function (response) {
    console.log(response);
    data3 = response;
  
  });

  
  var settings = {
    "url": "http://localhost:3000/getCuratedSOP",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    "data": JSON.stringify({"result":{"parameters":{"queryText":"changeOfAddress"}}}),
    
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    data2 = response;
  
  });

});


// $(window).load(function(){
//   var settings = {
//     "url": "http://localhost:3000/getCuratedSOP",
//     "method": "POST",
//     "timeout": 0,
//     "headers": {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     "data": JSON.stringify({"result":{"parameters":{"queryText":"balanceTransfer"}}}),
    
//   };
  
//   $.ajax(settings).done(function (response) {
//     console.log(response);
//     data3 = response;
  
//   });

// });












 // For search,


const users = [
  {
    "id": 1,
    "name": "how can i add new address",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {
    "id": 2,
    "name": "how can i change my card",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Deckow-Crist",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }
  },
  {
    "id": 3,
    "name": "is there any way to update address",
    "username": "Samantha",
    "email": "Nathan@yesenia.net",
    "address": {
      "street": "Douglas Extension",
      "suite": "Suite 847",
      "city": "McKenziehaven",
      "zipcode": "59590-4157",
      "geo": {
        "lat": "-68.6102",
        "lng": "-47.0653"
      }
    },
    "phone": "1-463-123-4447",
    "website": "ramiro.info",
    "company": {
      "name": "Romaguera-Jacobson",
      "catchPhrase": "Face to face bifurcated interface",
      "bs": "e-enable strategic applications"
    }
  },
  {
    "id": 4,
    "name": "Patricia Lebsack",
    "username": "Karianne",
    "email": "Julianne.OConner@kory.org",
    "address": {
      "street": "Hoeger Mall",
      "suite": "Apt. 692",
      "city": "South Elvis",
      "zipcode": "53919-4257",
      "geo": {
        "lat": "29.4572",
        "lng": "-164.2990"
      }
    },
    "phone": "493-170-9623 x156",
    "website": "kale.biz",
    "company": {
      "name": "Robel-Corkery",
      "catchPhrase": "Multi-tiered zero tolerance productivity",
      "bs": "transition cutting-edge web services"
    }
  },
  {
    "id": 5,
    "name": "Chelsey Dietrich",
    "username": "Kamren",
    "email": "Lucio_Hettinger@annie.ca",
    "address": {
      "street": "Skiles Walks",
      "suite": "Suite 351",
      "city": "Roscoeview",
      "zipcode": "33263",
      "geo": {
        "lat": "-31.8129",
        "lng": "62.5342"
      }
    },
    "phone": "(254)954-1289",
    "website": "demarco.info",
    "company": {
      "name": "Keebler LLC",
      "catchPhrase": "User-centric fault-tolerant solution",
      "bs": "revolutionize end-to-end systems"
    }
  },
  {
    "id": 6,
    "name": "Mrs. Dennis Schulist",
    "username": "Leopoldo_Corkery",
    "email": "Karley_Dach@jasper.info",
    "address": {
      "street": "Norberto Crossing",
      "suite": "Apt. 950",
      "city": "South Christy",
      "zipcode": "23505-1337",
      "geo": {
        "lat": "-71.4197",
        "lng": "71.7478"
      }
    },
    "phone": "1-477-935-8478 x6430",
    "website": "ola.org",
    "company": {
      "name": "Considine-Lockman",
      "catchPhrase": "Synchronised bottom-line interface",
      "bs": "e-enable innovative applications"
    }
  },
  {
    "id": 7,
    "name": "Kurtis Weissnat",
    "username": "Elwyn.Skiles",
    "email": "Telly.Hoeger@billy.biz",
    "address": {
      "street": "Rex Trail",
      "suite": "Suite 280",
      "city": "Howemouth",
      "zipcode": "58804-1099",
      "geo": {
        "lat": "24.8918",
        "lng": "21.8984"
      }
    },
    "phone": "210.067.6132",
    "website": "elvis.io",
    "company": {
      "name": "Johns Group",
      "catchPhrase": "Configurable multimedia task-force",
      "bs": "generate enterprise e-tailers"
    }
  },
  {
    "id": 8,
    "name": "Nicholas Runolfsdottir V",
    "username": "Maxime_Nienow",
    "email": "Sherwood@rosamond.me",
    "address": {
      "street": "Ellsworth Summit",
      "suite": "Suite 729",
      "city": "Aliyaview",
      "zipcode": "45169",
      "geo": {
        "lat": "-14.3990",
        "lng": "-120.7677"
      }
    },
    "phone": "586.493.6943 x140",
    "website": "jacynthe.com",
    "company": {
      "name": "Abernathy Group",
      "catchPhrase": "Implemented secondary concept",
      "bs": "e-enable extensible e-tailers"
    }
  },
  {
    "id": 9,
    "name": "Glenna Reichert",
    "username": "Delphine",
    "email": "Chaim_McDermott@dana.io",
    "address": {
      "street": "Dayna Park",
      "suite": "Suite 449",
      "city": "Bartholomebury",
      "zipcode": "76495-3109",
      "geo": {
        "lat": "24.6463",
        "lng": "-168.8889"
      }
    },
    "phone": "(775)976-6794 x41206",
    "website": "conrad.com",
    "company": {
      "name": "Yost and Sons",
      "catchPhrase": "Switchable contextually-based project",
      "bs": "aggregate real-time technologies"
    }
  },
  {
    "id": 10,
    "name": "Clementina DuBuque",
    "username": "Moriah.Stanton",
    "email": "Rey.Padberg@karina.biz",
    "address": {
      "street": "Kattie Turnpike",
      "suite": "Suite 198",
      "city": "Lebsackbury",
      "zipcode": "31428-2261",
      "geo": {
        "lat": "-38.2386",
        "lng": "57.2232"
      }
    },
    "phone": "024-648-3804",
    "website": "ambrose.net",
    "company": {
      "name": "Hoeger LLC",
      "catchPhrase": "Centralized empowering task-force",
      "bs": "target end-to-end models"
    }
  }
]

const conSearch = document.querySelector('.con-search')
function handleRemove() {
  conSearch.querySelector('input').value = ''
  conSearch.classList.add('notValue')
}
function handleFocus(evt) {
  if (evt.target.value) {
      conSearch.classList.add('focus')
  }
}
function handleBlur() {
  conSearch.classList.remove('focus')
}

function handleSearch(evt) {
  const value = evt.target.value
  const newUsers = users.filter((user) => {
      delete user.address
      delete user.company
      delete user.phone
      delete user.id
      delete user.username
      const string = JSON.stringify(user).toLowerCase()
      if (string.indexOf(value.toLowerCase()) !== -1) {
          return user
      }
  })
  renderResults(newUsers, value)
}

function renderResults(results, value) {
  const conResults = document.querySelector('.con-results')
  conResults.innerHTML = ''
  
  if (!value) {
      conSearch.classList.remove('focus')
      conSearch.classList.add('notValue')
      return    
  } 
  conSearch.classList.remove('notValue')
  conSearch.classList.add('focus')
  results.forEach((result) => {
      const resultElement = document.createElement('div')
      resultElement.className = 'result'
      const title = document.createElement('h5')
      const text = document.createElement('p')
      const web = document.createElement('div')
      web.className = 'web'
      title.innerHTML = result.name.toLowerCase().replace(value, `<b>${value}</b>`)
      text.innerHTML = result.email.toLowerCase().replace(value, `<b>${value}</b>`)
      web.innerHTML = result.website.toLowerCase().replace(value, `<b>${value}</b>`)
      resultElement.appendChild(title)
      resultElement.appendChild(text)
      resultElement.appendChild(web)
      resultElement.classList.add('hidden')
      conResults.appendChild(resultElement)
      setTimeout(() => {
          resultElement.classList.remove('hidden')
      }, 20);
  })
}






$(document).ready(function(){
  i=0;
  var currentStep = 0;
  $('[name="graduate"]').change(function(){
      if ($('[name="graduate"]:checked').is(":checked")) {
          $(".toggle").css({ "visibility": "hidden" })
          //console.log("<h3>" + data2.sop_name + "</h3></br>" + data2.steps.join())
          //document.getElementsByClassName("sop_name").innerHTML = "<h3>" + data2.sop_name + "</h3>";
          document.getElementsByClassName("address-change")[0].innerHTML =  data2.steps.join();
      }else{
        $(".address-change").css({"background":"white"})
        $(".show-steps").css({"visibility":"visible"})
        $(".toggle").css({"visibility":"visible"})
        $(".hang").css({"visibility":"visible"})
          var steps = data2.steps;
          //document.getElementsByClassName("sop_name").innerHTML = "<h3>" + data2.sop_name + "</h3>";
        document.getElementsByClassName("address-change")[0].innerHTML = data2.steps[currentStep];
        
      }
  });
});



var i = 0;
function stepRight() {
	if (currentStep != data2.steps[data2.steps.length-1])
        currentStep += 1
    if(data2.steps[currentStep])
        document.getElementsByClassName("address-change")[0].innerHTML = data2.steps[currentStep];
    else
      currentStep-=1
}

function stepLeft() {

    if (currentStep != 0) {
        currentStep -= 1
        document.getElementsByClassName("address-change")[0].innerHTML = data2.steps[currentStep];
    }
}


 // When the user clicks on the button,
 // toggle between hiding and showing the dropdown content

 function showPopup() {
  event.preventDefault();
  document.getElementById("popup_content").classList.toggle("show");
  return false;
}




let twkClickNotification = function(obj) {
  let target = document.querySelector(obj.getAttribute('data-target'));
  let className = ' ' + target.className + ' ';
  if (~className.indexOf(' active ')) {
      target.className = className.replace(' active ', ' ');
  } else {
      target.className += ' active';
  }
}









let initNotifications = function(obj){
  const mainClass = 'twk-notification';
  $(obj).addClass(mainClass);
  if ($(obj).data('direction'))
      $(obj).addClass(mainClass + '__'+$(obj).data('direction'));
  let bellDiv = $('<div></div>');
  bellDiv.append(
      $('<i></i>')
          .addClass(mainClass + '__icon fas fa-bell fa-2x')
          .attr('data-behavior',"toggleNotifications")
          .attr('data-target', $(obj).data('target'))
          .click(function () {
              twkClickNotification(this);
          })
  );
  bellDiv.append(
      $('<span></span>').addClass(mainClass + '__count').text($(obj).data('count'))
  );
  $(obj).prepend(bellDiv);
  let menu = $($(obj).data('target'));
  menu.addClass(mainClass + '__menu');
  let items = menu.find('li');
  menu.html('');
  menu.append('<li class="twk-notification__header">'+menu.data('header')+'</li>');
  items.each(function(){
      menu.append(
          $('<li></li>')
              .addClass(mainClass + '__item')
              .attr('data-object', $(this).data('object'))
              .append(
                  $('<span></span>').addClass(mainClass + '__item-count').text($(this).data('count'))
              )//append span
              .append(
                  $('<a href="'+$(this).data('link')+'"></a>').addClass(mainClass + '__link').text($(this).text())
              )//append link
      );
  });

}

$(document).ready(()=>{
      initNotifications($('[data-object="notifications"]'));
  });

  $(document).ready(function(){
    $('.minimize').on('click', function(){minimize();});
    $('.maximize').on('click', function(){maximize();});
  });
  
  function minimize(){
    $('body').addClass('minimized');
  }
  
  function maximize(){
    $('body').removeClass('minimized');
  }


  // Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var div = document.getElementsByClassName('address-change')[0];

 div.addEventListener('click', function (event) {
    document.getElementsByClassName('panels').innerHTML=div.innerHTML;
 });


// When the user clicks on <span> (x), close the modal





 
  
  


  
 


 

