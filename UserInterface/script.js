
const apiUrl = "https://miamioh.instructure.com/api/v1/courses/79158/discussion_topics/";

function getProjects() {
	$.ajax({
		url: apiUrl,
		method: 'get',
		headers: { 'Authorization': 'Bearer 1053~zZZ1cOaoEPq97H3BIPS9f9OdGiTh8UgTmtAKDISNr8olmUNN6Xx4H31iMuKiomrM',
			"Access-Control-Allow-Origin": "http://ceclnx01.csi.miamioh.edu/~ojhah/cse451-ojhah-web/Thesis/home.html",
			"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
			"Access-Control-Allow-Credentials":"true",
			"Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
		
		},
		success: function(data) {
			$("#uList").append("<li>"+JSON.stringify(data)+"</li>");
		},
        error: function(data) {
        	// Prompting error
        	$("#prompt").html("Error on ajax fetch while getting projects.\n");
        }
    });
}


$(document).ready(function(){
$("#ajaxButton").click(function(){
		getProjects();
		});

});
