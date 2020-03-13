
$(document).ready(function () {

//setup doc
$("#container-root").hide();

	

function close(){

	$("#list").hide();
	$("#container-root").show();

}

});



function toggleForm(id){
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





