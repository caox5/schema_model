/*
var elements=document.getElementsByClassName('node');
Array.from(elements).forEach(v => v.addEventListener('click', function() {
  this.parentElement.getElementsByClassName('show_form').classList.toggle('hidden');
}));

document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || target.innerText;   
}, false);

*/

function close(){
	document.getElementById('list').style.display = 'none';
}


 function toggleForm(id){
	 close();
    var content_id = id + '-content';

    var elem=document.getElementById(content_id);
    //for(i=0;i<elem.length;i++){       
//var text;
// $('.node').click(function(){



    if (elem.style.display == "none") {
      		elem.style.display = 'block';
    		//  document.getElementsByClassName("show-more")[0].innerText = "See Less";
	
    } else {
    		elem.style.display = 'none';
    		//  document.getElementsByClassName("show-more")[0].innerText = "See More";
    }   
  

    //}
}

function open_form(id) {

	var form_id = id + '-form'; 
	var elem = document.getElementById(form_id);
	  if (elem.style.display == "none") {
                elem.style.display = 'block';
                //  document.getElementsByClassName("show-more")[0].innerText = "See Less";

    } else {
                elem.style.display = 'none';
                //  document.getElementsByClassName("show-more")[0].innerText = "See More";
    }

}

//Function To Display Popup

/*

    $("#node").click(function ()
    {
        var buttonData = $(this);

        // Call interesting function...
        document.getElementById(buttonData).style.display='block';
    });


function toggleForm(){
	var clicked;

 $('.node').click(function(){
 clicked=$(this).text();
  
 });

}*/

/*
var modal=document.getElementById('755771-content');
window.onclick = function(event) {
  if (event.target != modal) {
    modal.style.display = "none";
  }
}

var modal=document.getElementById('755771-content');
window.onclick = function(event) {
   if (!event.target.matches('#755771-content')) {
      document.getElementById('755771-content').style.display = 'none';
   }
}
*/
