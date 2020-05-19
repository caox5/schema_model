$(document).ready(function () {

		id= 119626;
		topic_id = 837117;
		entry_id = 3509614;
	//	title="new post";
		message="hi there";
		rating = 1
	$("#msg").click(function(){
	//		createDiscussion(id,title,message);
	//	getDiscussionTopic(id,topic_id);
	//	updateDiscussion(id,topic_id,title,message);
	//	getDiscussionsByCourseID(id);
	//	getAllCourses();	
	//	getCourse(id);
	//	getAllTopicEntries(id,topic_id);
	//	createDiscussionTopicEntry(id,topic_id,message);	
	//	updateDiscussionTopicEntries(id,topic_id,entry_id,message);
	//	deleteDiscussionTopicEntry(id,topic_id,entry_id);
	//	getDiscussionEntryReplies(id,topic_id,entry_id);
	//	createDiscussionEntryReply(id,topic_id,entry_id,message);
		rateEntry(id,topic_id,entry_id,rating);
	});

});

const apiUrl = "https://ceclnx01.csi.miamioh.edu/~ojhah/cse451-ojhah-web/schema_model/UserInterface/canvasRestServer.php/api/v1/";

function getDiscussionsByCourseID(course_id) {	
	$.ajax({
		url: apiUrl+'courses/'+course_id+'/discussion_topics',
		method: "get",	
		headers: {"Content-Type": "application/json"},	
		success: function (data) {
		console.log(data);
	}});
}


function getDiscussionTopic(course_id,topic_id) {
        $.ajax({
                url: apiUrl+'courses/'+course_id+'/discussion_topics/'+topic_id,
                method: "get",
                headers: {"Content-Type": "application/json"},
                success: function (data) {
                console.log(data);
        }});
}

function getAllCourses() {
	$.ajax({
                url: apiUrl+'courses',
                method: "get",
                headers: {"Content-Type": "application/json"},
                success: function (data) {
                console.log(data);
        }});
}

function getCourse(course_id) {
	$.ajax({
                url: apiUrl+'/courses/'+course_id,
                method: "get",
                headers: {"Content-Type": "application/json"},
                success: function (data) {
                console.log(data);
        }});
}

function getAllTopicEntries(course_id,topic_id) {
        $.ajax({
                url: apiUrl+'courses/'+course_id+'/discussion_topics/'+topic_id+"/entries",
                method: "get",
                headers: {"Content-Type": "application/json"},
                success: function (data) {
                console.log(data);
        }});
}

function createDiscussion(course_id,title,message) {
        $.ajax({
                url: apiUrl+'courses/'+course_id+'/discussion_topics',
                method: "post",
                headers: {"Content-Type": "application/json"},
                data: JSON.stringify({title: title, message: message}),
                dataType: 'json',
                success: function (data) {
                        console.log(data);
                },
                error: function(error){
                        console.log("Error on ajax fetch");
        }});
}

function updateDiscussion(course_id,topic_id,title,message) {
        $.ajax({
                url: apiUrl+'courses/'+course_id+'/discussion_topics/'+topic_id,
                method: "put",
                headers: {"Content-Type": "application/json"},
                data: JSON.stringify({title: title, message: message}),
                dataType: 'json',
                success: function (data) {
                        console.log(data);
                },
                error: function(error){
                        console.log("Error on ajax fetch");
        }});
}

function createDiscussionTopicEntry(course_id,topic_id,message) {
        $.ajax({
                url: apiUrl+'courses/'+course_id+'/discussion_topics/'+topic_id+'/entries',
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                data: JSON.stringify({message: message}),
                dataType: 'json',
                success: function (data,textStatus,xhr) {
                        console.log(data);
		 },
                error: function(jqXHR,error,errorThrown){
                       console.log(errorThrown);
			console.log(jqXHR.responseText);
        }});
}

function updateDiscussionTopicEntries(course_id,topic_id,entry_id,message) {
        $.ajax({
                url: apiUrl+'courses/'+course_id+'/discussion_topics/'+topic_id+'/entries/'+entry_id,
                method: "put",
                headers: {"Content-Type": "application/json"},
                data: JSON.stringify({message: message}),
                dataType: 'json',
                success: function (data) {
                        console.log(data);
                },
                error: function(error){
                        console.log("Error on ajax fetch");
        }});
}

//not working properly
function deleteDiscussionTopicEntry(course_id,topic_id,entry_id) {
        $.ajax({
                url: apiUrl+'courses/'+course_id+'/discussion_topics/'+topic_id+'/entries/'+entry_id,
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                success: function (data) {
                        console.log(data);
                },
                error: function(jqXHR,error,errorThrown){
                        console.log(errorThrown);
			console.log(jqXHR.responseText);
        }});
}

function getDiscussionEntryReplies(course_id,topic_id,entry_id) {
        $.ajax({
                url: apiUrl+"courses/"+course_id+"/discussion_topics/"+topic_id+"/entries/"+entry_id+"/replies",
                method: "get",
                headers: {"Content-Type": "application/json"},
                success: function (data) {
               		 console.log(data);
		},
                error: function(jqXHR,error,errorThrown){
                        console.log(errorThrown);
                        console.log(jqXHR.responseText);
        }});
}

//not working
function createDiscussionEntryReply(course_id,topic_id,entry_id,message) {
        $.ajax({
                url: apiUrl+'courses/'+course_id+'/discussion_topics/'+topic_id+'/entries/'+entry_id+'/replies',
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                data: JSON.stringify({message: message}),
                dataType: 'json',
                success: function (data,textStatus,xhr) {
                        console.log(data);
                },
                error: function(jqXHR,error,errorThrown){
                        console.log(errorThrown);
                        console.log(jqXHR.responseText);
        }});
}

//not working
function rateEntry(course_id,topic_id,entry_id,rating) {
        $.ajax({
                url: apiUrl+'courses/'+course_id+'/discussion_topics/'+topic_id+'/entries/'+entry_id+'/rating',
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                data: JSON.stringify({rating: rating}),
                dataType: 'json',
                success: function (data,textStatus,xhr) {
                        console.log(data);
        }});
}


function nodes(course_id,topic_id){



}







