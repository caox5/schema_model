
$(document).ready(function () {

const apiUrl = "https://ojhah.451.csi.miamioh.edu/cse451-ojhah-web/schema_model/UserInterface/canvas_restserver.php/api/v1/info";
//form handler to get temp
var uid = document.getElementById("uid").value;
console.log(uid);
function formHandler(evt)  {
    evt.preventDefault();
    //get values
    cty = $("select option:selected").text();
    latlong = $("select option:selected").val();
    $("#city").html(cty);  
    $("#displayTemp").show();   
    $("#error").html("getting temperature");
    $.ajax({
        url:apiUrl,
	method:"post",
        dataType:'json',
	data: JSON.stringify({city:cty, uid:uid}),
        success: function(data) {

		if(data.data[0] == null){
		$('#displayerror').html("Data not available for this city");
		$('#tempOutput').html('');
		return;
} else if (isNaN(data.data[3])) {
//	console.log(data.cities[3]);	
                $("#error").html("Error retrieving temp");
            } else {
                $("#error").html("");
		$('#displayerror').html('');
                $("#tempOutput").html(data.data[3]);
                var ut = new Date();
                ut.setTime(data.data[2]*1000) 
                $("#updateTime").html(ut.toString());
                console.log(data);
            }
        },
        error: function(data) {
            $("#error").html("Error retrieving temp");
        }

    });

}

function clearerror() {
    $("#errorDelete").html("");
}


//setup doc
    $("#displayTemp").hide();
    $("form").on('submit',formHandler);
    $("#deleteCache").click(deleteCache);
});


