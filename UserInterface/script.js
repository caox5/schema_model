$(document).ready(function () {

	//	id= 119626;
	//	topic_id = 903292;
	//	entry_id = 3509614;
	//	title="new post";
	//	message="hi there";
	//	rating = 1;
	//	createDiscussion(id,title,message);
	//	getDiscussionTopic(id,topic_id);
	//	updateDiscussion(id,topic_id,title,message);
	//	getDiscussionsByCourseID(id);
		showAllCourses();	
	//	getCourse(id);
	//	getAllTopicEntries(id,topic_id);
	//	createDiscussionTopicEntry(id,topic_id,message);	
	//	updateDiscussionTopicEntries(id,topic_id,entry_id,message);
	//	deleteDiscussionTopicEntry(id,topic_id,entry_id);
	//	getDiscussionEntryReplies(id,topic_id,entry_id);
	//	createDiscussionEntryReply(id,topic_id,entry_id,message);
	//	rateEntry(id,topic_id,entry_id,rating);
});



const apiUrl = "https://ceclnx01.csi.miamioh.edu/~ojhah/cse451-ojhah-web/schema_model/UserInterface/canvasRestServer.php/api/v1/";

function showDiscussions(course_id,callback){
	getDiscussionsByCourseID(course_id,function(output){
		$("#c").hide();
		$.each(output.discussions_topics,function(k,v){
			
			$("#topic").append("<br><button name='topic-btn' value='"+v.title+"' onclick='showAllData("+course_id+','+v.id+")'>"+v.title+"</button>");
		});
		$("body").on('click', "button[name=topic-btn]", function() {
  			var text = $(this).attr("value");
  			$("#t_name").append("<p>"+text);
		});
	});

	}



function getDiscussionsByCourseID(course_id,callback) {	
	$.ajax({
		url: apiUrl+'courses/'+course_id+'/discussion_topics',
		method: "get",	
		headers: {"Content-Type": "application/json"},	
		success: function (data) {
			callback(data);
		
	}});
}

var d={};
function getDiscussionTopic(course_id,topic_id,callback) {
        $.ajax({
                url: apiUrl+'courses/'+course_id+'/discussion_topics/'+topic_id,
                method: "get",
                headers: {"Content-Type": "application/json"},
                success: function (data) {
		//	console.log(data);
             		callback(data);   
		
        }});
}

function getAllCourses(callback) {
	$.ajax({
                url: apiUrl+'courses',
                method: "get",
                headers: {"Content-Type": "application/json"},
                success: function (data) {
      			callback(data);
		}});
}

function showAllCourses(callback){
	getAllCourses(function(output){
		$.each(output.courses,function(k,v){
			$("#course").append("<br><button  name='course-btn' value='"+v.name+"' onclick='showDiscussions("+v.id+")'>"+v.name+"</button>");
		
		//console.log(v.name);
		});	
		$("body").on('click',"button[name=course-btn]",function(){
			var text=$(this).attr("value");

			//console.log(v.name);
			$("#c_name").append("<p>"+text);
		});
       });
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

//window.nodes=[];

function showAllData(course_id,topic_id,callback){
	$("#d").hide();
	var alldata={};
	var d={};
	getNodes(course_id,topic_id,function(output){
//	for(i=0;i<output.length;i++){
//		n.push(output[i]);
//		}
	alldata['nodes'] = output;
//	mapUserPost(course_id,topic_id);
	getLinks(course_id,topic_id,function(data){
		alldata['links'] = data;
		var graph={};
		var d={};
		graph=alldata;

		
var nodeMap = {};
            graph.nodes.forEach(function(x) { nodeMap[x.user_id] = x; });
           graph.links = graph.links.map(function(x) {
                return {
                    source: nodeMap[x.source],
                    target: nodeMap[x.target],
                };
            });


var links=graph.links;
var nodes=graph.nodes;
//sort links by source, then target
links.sort(function(a,b) {
    if (a.source > b.source) {return 1;}
    else if (a.source < b.source) {return -1;}
    else {
        if (a.target > b.target) {return 1;}
        if (a.target < b.target) {return -1;}
        else {return 0;}
    }
});
//any links with duplicate source and target get an incremented 'linknum'
for (var i=0; i<links.length; i++) {
    if (i != 0 &&
        links[i].source == links[i-1].source &&
        links[i].target == links[i-1].target) {
            links[i].linknum = links[i-1].linknum + 1;
        }
    else {links[i].linknum = 1;};
};



var w = 600,
    h = 600;

var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .size([w, h])
    .linkDistance(60)
    .charge(-300)
    .on("tick", tick)
    .start();

var svg = d3.select("body").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

// Per-type markers, as they don't inherit styles.
svg.append("svg:defs").selectAll("marker")
    .data(["comment","reply","discuss","solve"])
  .enter().append("svg:marker")
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

var path = svg.append("svg:g").selectAll("path")
    .data(links)
  .enter().append("svg:path")
    .attr("class", function(d) { return "link " + d.type; })
    .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

var circle = svg.append("svg:g").selectAll("circle")
    .data(force.nodes())
  .enter().append("svg:circle")
    .attr("r", 6)
    .call(force.drag);

var text = svg.append("svg:g").selectAll("g")
    .data(force.nodes())
  .enter().append("svg:g");

// A copy of the text with a thick white stroke for legibility.
text.append("svg:text")
    .attr("x", 8)
    .attr("y", ".31em")
    .attr("class", "shadow")
    .text(function(d) { return d.name; });

text.append("svg:text")
    .attr("x", 8)
    .attr("y", ".31em")
    .text(function(d) { return d.name; });

// Use elliptical arc path segments to doubly-encode directionality.
function tick() {
  path.attr("d", function(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = 75/d.linknum;  //linknum is defined above
    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
  });

  circle.attr("transform", function(d) {
    return "translate(" + d.x + "," + d.y + ")";
  });

  text.attr("transform", function(d) {
    return "translate(" + d.x + "," + d.y + ")";
  });
}






		
	});

	});

}

//	var n = showAllNodes(119626,874525);
//console.log(n);



function getAllTopicEntries(course_id,topic_id,callback) {
        $.ajax({
                url: apiUrl+'courses/'+course_id+'/discussion_topics/'+topic_id+"/entries",
                method: "get",
                headers: {"Content-Type": "application/json"},
                success: function (data) {
			callback(data);
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

function getDiscussionEntryReplies(course_id,topic_id,entry_id,callback) {
        $.ajax({
                url: apiUrl+'courses/'+course_id+'/discussion_topics/'+topic_id+'/entries/'+entry_id+'/replies',
                method: "get",
                headers: {"Content-Type": "application/json"},
                success: function (data) {
               		var replies=[];
			if( data.entry_replies ) {		
				callback(data.entry_replies);
			}
		}
        });
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

function getNodes(course_id,topic_id,callback){
	var nodes = [];
	var o=[];
	getAllTopicEntries(course_id,topic_id,function(data){
		tdata=data.topic_entries;
		var nodes=[];
		for(i=0;i<tdata.length;i++){
			var node ={};
			node['user_id']=tdata[i].user_id;
			node['name']=tdata[i].user_name;
			node['image']=tdata[i].user.avatar_image_url;
			nodes.push(node);
		}

	var nodes = _.uniqBy(nodes,function(u){ return u.user_id; });

	getDiscussionTopicNodes(course_id,topic_id,function(out){
//		console.log(out);
		for(i=0;i<out.length;i++){
 			nodes.push(out[i]);
		}
	var flags = [], o = [], l = nodes.length, i;
	for( i=0; i<l; i++) {
    		if( flags[nodes[i].name]) continue;
    			flags[nodes[i].name] = true;
    			o.push(nodes[i]);
		}
//	console.log(o);
	callback(o);
	});
});
//var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(output));
//var dlAnchorElem = document.getElementById('downloadAnchorElem');
//dlAnchorElem.setAttribute("href",     dataStr     );
//dlAnchorElem.setAttribute("download", "data.json");
//dlAnchorElem.click();
}

function getDiscussionTopicNodes(course_id,topic_id,callback){
	getDiscussionTopic(course_id,topic_id,function(output){
		//console.log(output);
		var allnodes=[];
		var dnode ={};
		dnode['user_id']=output.discussions_topic.id;
		dnode['name']=output.discussions_topic.title;
		dnode['image']="";

		allnodes.push(dnode);
//		console.log(allnodes);
		pnode ={};
		pnode['user_id']=output.discussions_topic.author.id;
		pnode['name']=output.discussions_topic.author.display_name;
		pnode['image']=output.discussions_topic.author.avatar_image_url;
		allnodes.push(pnode);
		callback(allnodes);
	});

}


function getLinks(course_id,topic_id,callback){
	getAllTopicEntries(course_id,topic_id,function(data){
	var links = [];
	var replies=[];
//	console.log(data);
	var edata = data.topic_entries;
//		console.log(edata);
	for(i=0;i<edata.length;i++){
		var link ={};
		link['source']=edata[i].user_id;
		if(edata[i].parent_id==null){
			link['target']=topic_id;
		}
		link['type']="reply";
		link['post']=edata[i].message;
		var r =[];
		if(edata[i].recent_replies){
				r.push(edata[i].recent_replies);
		
		var rlink ={};
		for(j=0;j<r.length;j++){
			var w=[];
			w=r[j];
			for(k=0;k<w.length;k++){
				rlink = {};
				rlink['source']=w[k].user_id;
				for(m=0;m<edata.length;m++){
					if(edata[m].id === w[k].parent_id){
					rlink['target'] = edata[m].user_id;}
				}
				rlink['type']="reply";
				rlink['post']=w[k].message;
				links.push(rlink);
			}
		links.push(link);
		}

	    }
		else{
			links.push(link);
		}

	}

	getDiscussionTopic(course_id,topic_id,function(output){
		var tlink={};
		var dt=output.discussions_topic;
		tlink['source']=dt.author.id;
		tlink['target']=dt.id;
		tlink['post']=dt.message;
		links.push(tlink);
		callback(links);	
	});
	});
}




  















