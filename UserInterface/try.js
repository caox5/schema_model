$(document).ready(function () {

		showAllCourses();
});



const apiUrl = "https://ceclnx01.csi.miamioh.edu/~ojhah/cse451-ojhah-web/schema_model/UserInterface/canvasRestServer.php/api/v1/";


function showDiscussions(course_id,callback){
	getDiscussionsByCourseID(course_id,function(output){
	$("#greet").show();
	$("#intro").empty();
	$("#intro").append("<h3><i>Please select a discussion topic: </i></h3>");
	getCourse(course_id,function(course){
//	$("#db").empty();
	$("#db").append("<h4>Course Details</h4><p>Course Name: <i>"+course.course.name+"</i><p>Start Date: <i>"+course.course.start_at+"</i>");	
	if(course.course.end_at) {
		$("#db").append("<p>"+course.course.end_at);
	}
		console.log(course.course);

	});

$.each(output.discussions_topics,function(k,v){
			
			$("#dlist").append("<br><button class=\"button menu-btn\" name='topic-btn' value='"+v.title+"' onclick='showAllData("+course_id+','+v.id+")'>"+v.title+"</button>");
		});
		$("body").on('click', "button[name=topic-btn]", function() {
  			var text = $(this).attr("value");
  			$("#c_name").append(" <i class=\"arrow right\"></i>&nbsp; "+"<a id=\"topic_link\">"+text+"</a>");
//			$("#d").hide();
//	$("#db").hide();	
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
//			console.log(data);
		
	}});
}

var d={};
function getDiscussionTopic(course_id,topic_id,callback) {
        $.ajax({
                url: apiUrl+'courses/'+course_id+'/discussion_topics/'+topic_id,
                method: "get",
                headers: {"Content-Type": "application/json"},
                success: function (data) {
             		callback(data);   
		
        }});
}

function getAllCourses(callback) {
	$.ajax({
                url: apiUrl+'courses',
                method: "get",
                headers: {"Content-Type": "application/json"},
                success: function (data) {
		//	console.log(data);
      			callback(data);
		}});
}


function getAuth(callback) {
	$.ajax({
                url: apiUrl+'audit/authentication/users/self',
                method: "get",
                headers: {"Content-Typei": "application/json"},
                success: function (data) {
			//console.log(data.events.linked.users[0].name);
      			callback(data);
		}});
}

function showAllCourses(callback){
	getAuth(function (data){
	$("#greet").html("<h2>Welcome, "+data.events.linked.users[0].name+"!</h2>");
		$("#db").html("<h4>About This Tool</h4><p><i>This user interface is a  graphical representation of Canvas LMS discussion board based on a schema with a goal to make discussion boards more structured. <br>This is a Web 2.0 tool created mainly with the help of PHP, Javascript, Ajax, jQuery and D3.js where all the data is manipulated using Canvas LMS REST API.<br><p>Author: Hemraj Ojha</i>");
		$("#intro").html("<h3><i>Please select a course to begin:</i></h3>");
	$("#c_name").append("<a href=\"index.html\" id=\"home link\">Home</a>");	

	getAllCourses(function(output){
		courses=output.courses;
		var active_courses=courses.filter(function (el){
		return el.restrict_enrollments_to_course_dates==false;
		});
		$.each(active_courses,function(k,v){
			$("#course").append("<br><button class=\"button menu-btn\" name='course-btn' value='"+v.name+"' onclick='showDiscussions("+v.id+")'>"+v.name+"</button>");
		});	
		$("body").on('click',"button[name=course-btn]",function(){
			var text=$(this).attr("value");
			
			$("#c_name").append( " <i class=\"arrow right\"></i>&nbsp; "+"<a id=\"course_link\">"+text+"</a>");
			$("#c").hide();
			$("#intro").empty();
			$("#db").empty();
			$("#greet").hide();
			var home_link=document.getElementById('home_link');
			if(home_link){
			home_link.onclick=showAllCourses;}
	//		var course_link=document.getElementById('course_link');
	//		course_link.onclick=showDiscussions(v.id,v.name);
		});
       });
	});
}	

function getCourse(course_id,callback) {
	$.ajax({
                url: apiUrl+'/courses/'+course_id,
                method: "get",
                headers: {"Content-Type": "application/json"},
                success: function (data) {
  //              console.log(data);
			callback(data);
        }});
}

function showAllData(course_id,topic_id,callback){
	$("#d").hide();
	$("#highlights").empty();
	$("#greet").empty();
	$("#intro").empty();
	$("#db").empty();
	$("#db").show();
	//	$("#c").empty();
//	$("#d").empty();
	
	var alldata={};
	var d={};
	getNodes(course_id,topic_id,function(output){
	alldata['nodes'] = output;
	getLinks(course_id,topic_id,function(data){
		alldata['links'] = data;
		var graph={};
		var d={};
		graph=alldata;
var links=graph.links,
	nodes=graph.nodes;

//console.log(links);
		$.each(output,function(k,v){
			if(v.user_id==topic_id)
	$("#greet").append("<h2>"+v.name+"</h2>");
		});

var nodeMap = {};
            nodes.forEach(function(x) { nodeMap[x.user_id] = x; });
		if(links){
		links = links.map(function(x) {
                return {
                    source: nodeMap[x.source],
                    target: nodeMap[x.target],
                };
            });
		}

var node_data = nodes.map(function (d) {return d.user_id});
var edge_data = links.map(function (d) {return [d.source.user_id, d.target.user_id]; });


var G = new jsnx.Graph();
G.addNodesFrom(node_data);
G.addEdgesFrom(edge_data);


var degreeCent = function(g) {
  var counts;
  var total = 0;
  counts = {};
  // Figure out which nodes have most links
  g.links.forEach(function(i) {
    if (counts[i["source"]]) {
      counts[i["source"]] += 1;
    }
    else {
      counts[i["source"]] = 1;
    }
    if (counts[i["target"]]) {
      counts[i["target"]] += 1;
    }
    else {
      counts[i["target"]] = 1;
    }
    total += 1;
  });
  return counts;
};

var degreeCentOut = function(g){
var counts;
  var total = 0;
  counts = {};
  // Figure out which nodes have most links
  g.links.forEach(function(i) {
    if (counts[i["source"]]) {
      counts[i["source"]] += 1;
    }
    else {
      counts[i["source"]] = 1;
    }
//    if (counts[i["target"]]) {
//      counts[i["target"]] += 1;
//    }
//    else {
//      counts[i["target"]] = 1;
//    }
    total += 1;
  });
  return counts;



};

//var degree=degreeCent(graph);

//cliques in a graph
//var cliques=jsnx.findCliques(G);
//  console.log(cliques);




// Toggle for ego networks on click (below).
var toggle = 0;


 var linkedByIndex = {};
  graph.links.forEach(function(d) {
	  linkedByIndex[d.source + ',' + d.target] = 1;
	  linkedByIndex[d.target + ',' + d.source] = 1;
  });

  // A function to test if two nodes are neighboring.
  function neighboring(a, b) {
	  return linkedByIndex[a.index + ',' + b.index];
  }



var colors = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3.select("svg").attr("id","graph"),
  width = +svg.attr("width"),
  height = +svg.attr("height"),
        node,
        link;

svg.call(d3.zoom().on('zoom',zoomed));

    svg.append('defs').append('marker')
        .attrs({'id':'arrowhead',
            'viewBox':'-0 -5 10 10',
            'refX':13,
            'refY':0,
            'orient':'auto',
            'markerWidth':13,
            'markerHeight':13,
            'xoverflow':'visible'})
        .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', '#999')
        .style('stroke','none');


var defs =svg.select('defs');
var container=svg.append('g');
//		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear()
	.range([0,width]);

var y = d3.scaleBand()
	.range([0,height]);


nodes.forEach(function(d, i) {
  defs.append("svg:pattern")
    .attr("id", "grump_avatar"+i)
    .attr("width", 40) 
    .attr("height", 40)
    .attr("patternUnits", "userSpaceOnUse")
    .append("svg:image")
    .attr("xlink:href", d.image)
    .attr("width", 40)
    .attr("height", 40)
    .attr("x", 0)
    .attr("y", 0);


});

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



 _.each(links, function(link) {

        // find other links with same target+source or source+target
        var same = _.filter(links, {
            'source': link.source,
            'target': link.target
//		'post_id':link.post_id
        });
        var sameAlt = _.filter(links, {
            'source': link.target,
            'target': link.source
//		'post_id':link.post_id
        });
        var sameAll = same.concat(sameAlt);
	 
//console.log(sameAll);
        _.each(sameAll, function(s, i) {
            s.sameIndex = (i + 1);
            s.sameTotal = sameAll.length;
            s.sameTotalHalf = (s.sameTotal / 2);
            s.sameUneven = ((s.sameTotal % 2) !== 0);
            s.sameMiddleLink = ((s.sameUneven === true) && (Math.ceil(s.sameTotalHalf) === s.sameIndex));
            s.sameLowerHalf = (s.sameIndex <= s.sameTotalHalf);
            s.sameArcDirection = s.sameLowerHalf ? 0 : 1;
            s.sameIndexCorrected = s.sameLowerHalf ? s.sameIndex : (s.sameIndex - Math.ceil(s.sameTotalHalf));
        });
    });

    var maxSame = _.chain(links)
        .sortBy(function(x) {
            return x.sameTotal;
        })
        .last()
        .value().sameTotal;

    _.each(links, function(link) {
        link.maxSameHalf = Math.floor(maxSame / 3);
    });






function linkArc(d) {
	if(d.source.x === d.target.x && d.source.y === d.target.y){
	



	     var x1 = d.source.x,
      y1 = d.source.y,
      x2 = d.target.x,
      y2 = d.target.y,
      dx = x2 - x1,
      dy = y2 - y1,
      dr = Math.sqrt(dx * dx + dy * dy),


		
		
		// Self edge.
      // Fiddle with this angle to get loop oriented.
     xRotation = -45;

      // Needs to be 1.
      largeArc = 1;

      // Change sweep to change orientation of loop. 
      sweep = 0;

      // Make drx and dry different to get an ellipse
      // instead of a circle.
      drx = 20;
     dry = 40;

      // For whatever reason the arc collapses to a point if the beginning
      // and ending points of the arc are the same, so kludge it.
      x2 = x2 + 1;
      y2 = y2 + 1;


    return "M" + x1 + "," + y1 + "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep + " " + x2 + "," + y2;
 
    }
	
		
	else{
        var dx = (d.target.x - d.source.x),
            dy = (d.target.y - d.source.y),
            dr = Math.sqrt(dx * dx + dy * dy),
//		dr=75/d.linknum;
            unevenCorrection = (d.sameUneven ? 0 : 0.5),
           arc = ((dr * d.maxSameHalf) / (d.sameIndexCorrected - unevenCorrection));
//arc=dr;
        if (d.sameMiddleLink) {
            arc = 0;
        }


	

        return "M" + d.source.x + "," + d.source.y + "A" + arc + "," + arc + " 0 0," + 
			
			d.sameArcDirection + " " 
			
			+ d.target.x + "," + d.target.y;
    }
}




    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) {return d.name;}).strength(0.003))
        .force("charge", d3.forceManyBody().strength([-120]).distanceMax([100]))
	.force("collide",d3.forceCollide().radius(5))
        .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked);

// Terminate the force layout when this cell re-runs.
//  invalidation.then(() => simulation.stop());
  
        update(links, nodes);
    





    function update(links, nodes) {
	    
// add tooltip to HTML body
  var tooltip = d3.select("body").select("#tool")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("padding", "10px")
    .style("z-index", "10")
    .style("width", "300px")
   // .style("height", "1000px")
    .style("background-color", "#98FB98")
    .style("border-radius", "5px")
    .style("visibility", "hidden")
    .text("");



        node = svg.selectAll(".node")
            .data(nodes)
	    .enter()
            .append("g")
            .attr("class", "node")
            .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
            );


        node.append("circle")
	    .attr("cx",20)
        .attr("cy", 20)
	    .attr("r",20)
	    .attr("preserveAspectRatio","xMidYMid slice")
	    .on("click",clickNode)
        .style("fill", "#fff")
        .style("fill", 
	function(d,i){ 
		if(d.image!==""){
		return "url(#grump_avatar"+i+")"; } 
		else
		{
			return colors("#54d");
		}
	}	
	);

        node.append("title")
            .text(function (d) {return d.user_id;});

        node.append("text")
            .attr("dy", -3)
            .text(function (d) {return d.name})
		.merge(node);
node.exit().remove();

//	    node.merge(node);





	    link = svg.selectAll(".link")
    .data(links, function(d) { return d.source + ", " + d.target;})
		.enter().append("path")
    .attr("class", "link")
   .attr('marker-end','url(#arrowhead)');

   

        link
		   .append("title")
            .text(function (d) {return d.type;})
		.merge(link);
	    link.exit().remove();

//	    .merge(link);
		
        
	    edgepaths = svg.selectAll(".edgepath")
            .data(links)
		    .enter()
            .append('path')
            .attrs({
                'class': 'edgepath',
                'fill-opacity': 0,
                'stroke-opacity': 0,
                'id': function (d, i) {return 'edgepath' + i}
           })
            .style("pointer-events", "none")
//	.merge(edgepaths);


        edgelabels = svg.selectAll(".edgelabel")
            .data(links)
            .enter()
            .append('text')
            .style("pointer-events", "none")
            .attrs({
                'class': 'edgelabel',
                'id': function (d, i) {return 'edgelabel' + i},
                'font-size': 10,
                'fill': '#aaa'
            })
		   // .merge(edgelabels);

        simulation
            .nodes(nodes);

        simulation.force("link")
            .links(links);
	
	//simulation.alpha(1).restart();



	    
	    
	    
	    //console.log(node);

// keep track of if tooltip is hidden or not
  var isTooltipHidden = true;

//var toggle;

function postNode(){
	
	var htmlContent= "";
		htmlContent += "<div>";
//      htmlContent += "<h4>" + output.name +"  "+"<img width=20 height=20 src='"+output.image+"'><\/h4>";

      htmlContent += "<form method=\"post\"  action=\"\">"
	htmlContent +="Post: <textarea id=\"postText\" class=\"text\" cols=\"30\" rows =\"4\" name=\"postText\"></textarea><br>"     
//	htmlContent+="Degree: "+deg
      htmlContent += "<button name=\"reply\" value=\"Reply\">Reply</button>"
      htmlContent += "<\/form>"
   
   	htmlContent += "<\/div>"	
      tooltip.html(htmlContent);


}

// global listener
//  d3.select('body').on('click', clickNode);

function clickNode(node) {
       // update visibility
       isTooltipHidden = !isTooltipHidden;
       var visibility = (isTooltipHidden) ? "hidden" : "visible";

// D3 v4
var pageX = d3.event.pageX 
var pageY = d3.event.pageY
	
       // load tooltip content (if it changes based on node)
	
       //loadTooltipContent(node);
       
       if (isTooltipHidden) {
	    d3.event.stopPropagation();
	      // loadTooltipContent(node);
         unPinNode(node);
	$("#sna").empty();
       }
	else
	{
		//unPinNode(node);
		loadTooltipContent(node);
	}
    
       // place tooltip where cursor was
       return tooltip.style("top", (pageY-10) + "px").style("left", (pageX + 10) + "px").style("visibility", visibility);

	if (toggle == 0) {
		      // Ternary operator restyles links and nodes if they are adjacent.
		      d3.selectAll('.link').style('stroke-opacity', function (l) {
			      return l.target == d || l.source == d ? 1 : 0.1;
		      });
		      d3.selectAll('.node').style('opacity', function (n) {
			      return neighboring(d, n) ? 1 : 0.1;
		      });
		      d3.select(this).style('opacity', 1);
		      toggle = 1;
	      }
	      else {
		      // Restore nodes and links to normal opacity.
		      d3.selectAll('.link').style('stroke-opacity', '0.6');
		      d3.selectAll('.node').style('opacity', '1');
		      toggle = 0;
	      }
  }		    



	


		     // reset nodes to not be pinned
  function unPinNode(node) {
//	  var htmlContent="";
	  $(".tooltip").empty();
     node.fx = null;
     node.fy = null;
//	  toggle=1;
  }


var betweenness = jsnx.betweennessCentrality(G);
//var eigenvector = jsnx.eigenvectorCentrality(G);
var clustering = jsnx.clustering(G);
between=betweenness._numberValues;
clust=clustering._numberValues;

var maxb=0;
var userb;
var user_nameb;
for(b in between){
	if(between[b]>=maxb) {
		maxb=between[b];
		userb=b;
	}
}

for(n in nodes){
	console.log(nodes[n].user_id);
	console.log(userb);
	if(nodes[n].user_id==userb) user_nameb=nodes[n].name;
}

var maxc=0;
var userc;
var user_namec;
for(c in clust){
	if(clust[c]>=maxc) {
		maxc=clust[c];
		userc=c;
	}
}

for(n in nodes){
	console.log(nodes[n].user_id);
	console.log(userb);
	if(nodes[n].user_id==userc) user_namec=nodes[n].name;
}


var degout=degreeCentOut(graph);

var maxd=0;
var userd;
var user_named;
for(d in degout){
	if(degout[d]>=maxd) {
		maxd=degout[d];
		userd=d;
	}
}

for(n in nodes){
	console.log(nodes[n].user_id);
	console.log(userb);
	if(nodes[n].user_id==userd) user_named=nodes[n].name;
}


var db="<div id=\"highlights\">";
db+="<h4>Discussion Board Highlights</h4>";
db+="<p>Total Participants: &nbsp; "+nodes.length;
db+="<p>Total Interactions: &nbsp; "+links.length;
db+="<p>Top Contributor: &nbsp;"+user_named;
db+="<p>Top Facilitator: &nbsp;"+user_nameb;
db+="<p>Potential Top Friend:"+user_namec;
db+="<p>Potential Team Leader(s): &nbsp;"
console.log(links);
jsnx.genFindCliques(G).then(function(cliques) {
  console.log(cliques);
});

//$.each(cliques)
//db+=





var largestClq=jsnx.graphCliqueNumber(G);
console.log(largestClq);

db+="<p>Size of largest group: &nbsp; "+largestClq+"<br>";

//Return a list of nodes connected to node n.
var neighbors=jsnx.neighbors(G,node_data[1]);
console.log(neighbors);



db+="<button class=\"btn-report\" name=\"btn-report\">Download Report</button>";

//var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(output));
//var dlAnchorElem = document.getElementById('downloadAnchorElem');
//dlAnchorElem.setAttribute("href",     dataStr     );
//dlAnchorElem.setAttribute("download", "data.json");
//dlAnchorElem.click();







db+="</div>";

$("#db").append(db);
console.log(db);






  // add html content to tooltip
  function loadTooltipContent(node) {
//	  console.log(node);
	  //toggle=0;
	  $(".tooltip").empty();
	  uid=node.user_id;
	  getUserEntries(course_id,topic_id,uid,function(output){
		console.log(output);
     			var deg;
			var degree=degreeCent(graph);
//			console.log(degree);
var betweenness = jsnx.betweennessCentrality(G);
//var eigenvector = jsnx.eigenvectorCentrality(G);
var clustering = jsnx.clustering(G);
between=betweenness._numberValues;
clust=clustering._numberValues;
for(b in between){
	if(node.user_id == b) bet=between[b];
}
for(c in clust){
	if(node.user_id == c) clu=clust[c];
}
for (var d in degree){
//console.log(d);
//console.log(degree[d]);
	if(node.user_id == d) deg=degree[d];
}


//		console.log(output);
getUserRole(course_id,function(id){
//console.log(id);

		var htmlContent= "";


		htmlContent += "<div id=\"container-main\">";
      htmlContent += "<h4>" + output.name +"<\/h4>";
if(id.type!="student"){
//	$("#sna").empty();
	$("#sna").append("<br><h4>"+output.name+"  Details</h4>"
		+"<p>Interactions Frequency: "+deg+"<br>"
		+"Most Interacted with: ");

}
//});
//      htmlContent += "<img width=10 height=10 src='"+output.image+"'><br>"
var entries=[];
getLinks(course_id,topic_id,function(n){
	console.log(n);
	getNodes(course_id,topic_id,function(x){
	for(i=0;i<n.length;i++){
		entry={};
	entry['source']=n[i].source;
		if(n[i].target){
	entry['target']=n[i].target;}
		else{
	entry['target']=topic_id;	
		}
	entry['post_id']=n[i].post_id;
	entry['post']=n[i].post;
		entries.push(entry);
}
//console.log(entries);
//});
nodeNames=[];
for(j=0;j<x.length;j++){
	nn={};
	nn['user_id']=x[j].user_id;
	nn['name']=x[j].name;
	nodeNames.push(nn);
}
	posts=output.posts;
if(posts){
posts.forEach(pf);}
//entries.forEach(ent);
//console.log(posts);







		function pf(item,index){
	//		if(typeof entries==='undefined'){
			for(j=0;j<nodeNames.length;j++){
				if(nodeNames[j].user_id==topic_id)
				var name=nodeNames[j].name;
			}
	//				}			
	//		else{
			for(i=0;i<entries.length;i++){
				if(entries[i].post_id==item.entry_id){ 
					var posted_to=entries[i].target;	
				for(j=0;j<nodeNames.length;j++){
					if(posted_to==nodeNames[j].user_id){
						name=nodeNames[j].name;
					}
					
				}
			}
			}
	//		}
htmlContent+="<div class=\"form-container-main\" id='container-post-"+index+"'>"		
      htmlContent += "<form id='postForm-"+index+ "' method=\"post\">"
	htmlContent +="Date: <i>"+item.created_at+"</i><br>"     
      htmlContent+="Posted to: "+name+"</br>"
	htmlContent+="<div class=\"text_div\" id="+item.entry_id+">"

if(id.type!="student"){
	htmlContent +=item.post+"<input type=\"button\" class=\"edit-btn\" value=\"Edit\"></div><br>"  }
else{
	htmlContent+=item.post+"</div><div class='edit_div'></div><br>"
}

      htmlContent += "<input type=\"button\" class=\"reply-btn\" value=\"Reply\">"
      htmlContent += "<input type=\"button\" class=\"comment-btn\" value=\"Comment\">"	
      htmlContent += "<input type=\"button\" class=\"discuss-btn\" value=\"Discuss\">"
      htmlContent += "<input type=\"button\" class=\"solve-btn\" value=\"Solve\">"	

      htmlContent += "<\/form>"
   htmlContent+="</div>"
//		});
	}
//});
//});
   htmlContent += "<\/div>"	
      tooltip.html(htmlContent);


		$(".edit-btn").on('click',function(e){
			//var text=$(this).attr("value");
			//(this).form
		//	var text=$("#"+item.entry_id).text();
//		
			//var id=item.entry_id;
			
			
			e.preventDefault();
		//	$(".text_div").hide();
			var parent_id = $(this).parent().parent().attr('id');
			var text = $(this).siblings(".text_div").text();
			var htmlE= "";
			htmlE+="";
      htmlE += "<form id=\"editForm\" method=\"put\">"
	htmlE +="<textarea id=\"editText\" class=\"text\" cols=\"40\" rows =\"4\" name=\"editText\">"+text+"</textarea><br>"     
//	htmlContent+="Degree: "+deg
      htmlE += "<input type=\"submit\" class=\"edit\" value=\"Edit\">"
      htmlE+="<input type=\"button\" class=\"cancel\" value=\"Cancel\">"
      htmlE += "<\/form>"
   
   	htmlE += "";	
	
	$("#postForm-"+index).replaceWith(htmlE);
//	$('#'+parent_id).append(htmlE);
   //   tooltip.html(htmlContent);

		
$('#editForm').submit(function(e) {
	e.preventDefault();
    var $inputs = $('#editForm :input');
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
//	console.log($inputs);
var etext=values['editText'];
//	console.log(values);
var entry_id=$(this).parent().siblings("form").children("span").attr('id');
//	console.log(output);
	updateDiscussionTopicEntry(course_id,topic_id,entry_id,etext);
	$("#editForm").hide();
	loadTooltipContent(node);
//	getUserEntries(course_id,topic_id,uid,function(ui){
//		p=ui.posts;
//		console.log(p);
//		for(i=0;i<p.length;i++){
//			$("#"+p[i].entry_id).empty();
//			$("#"+p[i].entry_id).append(p[i].post);
//		}
//			$("span").show();
//		}
//	});
//	$(".tooltip").hide();
//	$(".tooltip").show();
});

$('.cancel').click(function() {
    $(this).parent().hide();
	$("span").show();
});

	});




		$(".reply-btn").on('click',function(){
			//var text=$(this).attr("value");
			//(this).form
			
			var parent_id = $(this).parent().parent().attr('id');
// console.log(parent_id);
	var htmlC= "";
		htmlC += "<div>";
//      htmlContent += "<h4>" + output.name +"  "+"<img width=20 height=20 src='"+output.image+"'><\/h4>";

      htmlC += "<form id=\"replyForm\" method=\"post\">"
	htmlC +="<textarea id=\"postText\" class=\"text\" cols=\"40\" rows =\"4\" name=\"postText\"></textarea><br>"     
//	htmlContent+="Degree: "+deg
      htmlC += "<input type=\"submit\" class=\"reply\" value=\"Reply\">"
      htmlC+="<input type=\"button\" class=\"cancel\" value=\"Cancel\">"
      htmlC += "<\/form>"
   
   	htmlC += "<\/div>";	
	$('#'+parent_id).append(htmlC);
   //   tooltip.html(htmlContent);

		
$('#replyForm').submit(function(e) {
	e.preventDefault();
    var $inputs = $('#replyForm :input');
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
	var names={};
	$inputs.each(function(){
		names[this.value]=$(this).val();
	});
var reply=values['postText'];
var rel_type=names['Reply'];
console.log(rel_type);
var entry_id=$(this).parent().siblings('form').children('span').attr('id');
	if(entry_id==topic_id){
	createDiscussionTopicEntry(course_id,topic_id,reply);
		$(this).parent().hide();
	$(".tooltip").hide();
		$("#graph").empty();
		$(".tooltip").remove();
		showAllData(course_id,topic_id,callback);
	}		
	else{
	createDiscussionEntryReply(course_id,topic_id,entry_id,reply);
		$(this).parent().hide();
		$(".tooltip").hide();
		$("#graph").empty();
		$(".tooltip").remove();
		showAllData(course_id,topic_id,callback);
		}
});

$('.cancel').click(function() {
    $(this).parent().hide();
});

	});

		$(".comment-btn").on('click',function(){
			//var text=$(this).attr("value");
			//(this).form
			
			var parent_id = $(this).parent().parent().attr('id');
// console.log(parent_id);
	var htmlC= "";
		htmlC += "<div>";
//      htmlContent += "<h4>" + output.name +"  "+"<img width=20 height=20 src='"+output.image+"'><\/h4>";

      htmlC += "<form id=\"commentForm\" method=\"post\">"
	htmlC +="<textarea id=\"postText\" class=\"text\" cols=\"40\" rows =\"4\" name=\"postText\"></textarea><br>"     
//	htmlContent+="Degree: "+deg
      htmlC += "<input type=\"submit\" class=\"comment\" value=\"Comment\">"
      htmlC+="<input type=\"button\" class=\"cancel\" value=\"Cancel\">"
      htmlC += "<\/form>"
   
   	htmlC += "<\/div>";	
	$('#'+parent_id).append(htmlC);
   //   tooltip.html(htmlContent);

		
$('#commentForm').submit(function(e) {
	e.preventDefault();
    var $inputs = $('#commentForm :input');
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
	var names={};
	$inputs.each(function(){
		names[this.value]=$(this).val();
	});
var reply=values['postText'];
var rel_type=names['Comment'];
console.log(rel_type);
var entry_id=$(this).parent().siblings('form').children('span').attr('id');
	if(entry_id==topic_id){
	createDiscussionTopicEntry(course_id,topic_id,reply);
		$(this).parent().hide();
	$(".tooltip").hide();
		$("#graph").empty();
		$(".tooltip").remove();
		showAllData(course_id,topic_id,callback);
	}		
	else{
	createDiscussionEntryReply(course_id,topic_id,entry_id,reply);
		$(this).parent().hide();
		$(".tooltip").hide();
		$("#graph").empty();
		$(".tooltip").remove();
		showAllData(course_id,topic_id,callback);
		}
});

$('.cancel').click(function() {
    $(this).parent().hide();
});

	});



		$(".discuss-btn").on('click',function(){
			//var text=$(this).attr("value");
			//(this).form
			
			var parent_id = $(this).parent().parent().attr('id');
// console.log(parent_id);
	var htmlC= "";
		htmlC += "<div>";
//      htmlContent += "<h4>" + output.name +"  "+"<img width=20 height=20 src='"+output.image+"'><\/h4>";

      htmlC += "<form id=\"discussForm\" method=\"post\">"
	htmlC +="<textarea id=\"postText\" class=\"text\" cols=\"40\" rows =\"4\" name=\"postText\"></textarea><br>"     
//	htmlContent+="Degree: "+deg
      htmlC += "<input type=\"submit\" class=\"discuss\" value=\"Discuss\">"
      htmlC+="<input type=\"button\" class=\"cancel\" value=\"Cancel\">"
      htmlC += "<\/form>"
   
   	htmlC += "<\/div>";	
	$('#'+parent_id).append(htmlC);
   //   tooltip.html(htmlContent);

		
$('#discussForm').submit(function(e) {
	e.preventDefault();
    var $inputs = $('#discussForm :input');
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
	var names={};
	$inputs.each(function(){
		names[this.value]=$(this).val();
	});
var reply=values['postText'];
var rel_type=names['Discuss'];
console.log(rel_type);
var entry_id=$(this).parent().siblings('form').children('span').attr('id');
	if(entry_id==topic_id){
	createDiscussionTopicEntry(course_id,topic_id,reply);
		$(this).parent().hide();
	$(".tooltip").hide();
		$("#graph").empty();
		$(".tooltip").remove();
		showAllData(course_id,topic_id,callback);
	}		
	else{
	createDiscussionEntryReply(course_id,topic_id,entry_id,reply);
		$(this).parent().hide();
		$(".tooltip").hide();
		$("#graph").empty();
		$(".tooltip").remove();
		showAllData(course_id,topic_id,callback);
		}
});

$('.cancel').click(function() {
    $(this).parent().hide();
});

	});




		$(".solve-btn").on('click',function(){
			//var text=$(this).attr("value");
			//(this).form
			
			var parent_id = $(this).parent().parent().attr('id');
// console.log(parent_id);
	var htmlC= "";
		htmlC += "<div>";
//      htmlContent += "<h4>" + output.name +"  "+"<img width=20 height=20 src='"+output.image+"'><\/h4>";

      htmlC += "<form id=\"solveForm\" method=\"post\">"
	htmlC +="<textarea id=\"postText\" class=\"text\" cols=\"40\" rows =\"4\" name=\"postText\"></textarea><br>"     
//	htmlContent+="Degree: "+deg
      htmlC += "<input type=\"submit\" class=\"solve\" value=\"Solve\">"
      htmlC+="<input type=\"button\" class=\"cancel\" value=\"Cancel\">"
      htmlC += "<\/form>"
   
   	htmlC += "<\/div>";	
	$('#'+parent_id).append(htmlC);
   //   tooltip.html(htmlContent);

		
$('#solveForm').submit(function(e) {
	e.preventDefault();
    var $inputs = $('#solveForm :input');
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
	var names={};
	$inputs.each(function(){
		names[this.value]=$(this).val();
	});
var reply=values['postText'];
var rel_type=names['Solve'];
console.log(rel_type);
var entry_id=$(this).parent().siblings('form').children('span').attr('id');
	if(entry_id==topic_id){
	createDiscussionTopicEntry(course_id,topic_id,reply);
		$(this).parent().hide();
	$(".tooltip").hide();
		$("#graph").empty();
		$(".tooltip").remove();
		showAllData(course_id,topic_id,callback);
	}		
	else{
	createDiscussionEntryReply(course_id,topic_id,entry_id,reply);
		$(this).parent().hide();
		$(".tooltip").hide();
		$("#graph").empty();
		$(".tooltip").remove();
		showAllData(course_id,topic_id,callback);
		}
});

$('.cancel').click(function() {
    $(this).parent().hide();
});

	});








});
});
});
});
  }

//toggle=1;
}
    

    function ticked() {

        link.attr("d",linkArc);

        node
            .attr("transform", function (d) {return "translate(" + d.x + ", " + d.y + ")";});

        edgelabels.attr('d', function (d) {
            return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
        });


    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }  
// Zooming function translates the size of the svg container.
function zoomed() {
	  container.attr("transform", "translate(" + d3.event.transform.x + ", " + d3.event.transform.y + ") scale(" + d3.event.transform.k + ")");
}
//	});
	});
	});
}

function getAllTopicEntries(course_id,topic_id,callback) {
        $.ajax({
                url: apiUrl+'courses/'+course_id+'/discussion_topics/'+topic_id+"/entries",
                method: "get",
                headers: {"Content-Type": "application/json"},
                success: function (data) {
			callback(data);
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

function updateDiscussionTopicEntry(course_id,topic_id,entry_id,message) {
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


//var nodes=[];
function getNodes(course_id,topic_id,callback){
	var allnodes=[];
	var nodes = [];
	var o=[];
	getDiscussionTopicNodes(course_id,topic_id,function(out){
	nodes.push(out);
	allnodes=nodes;	
	getAllTopicEntries(course_id,topic_id,function(data){
		if(data){
		var nodes=[];
		tdata=data.topic_entries;
		for(i=0;i<tdata.length;i++){
			var node ={};
			node['user_id']=tdata[i].user_id;
			node['name']=tdata[i].user_name;
			node['image']=tdata[i].user.avatar_image_url;
			nodes.push(node);
			replies=tdata[i].recent_replies;
			if(replies){
				for(j=0;j<replies.length;j++){
				var rnode={};
				rnode['user_id']=replies[j].user_id;
				rnode['name']=replies[j].user_name;
				rnode['image']=replies[j].user.avatar_image_url;
				nodes.push(rnode);
			}
			}
		}
	var nodes = _.uniqBy(nodes,function(u){ return u.user_id; });
		for(i=0;i<nodes.length;i++)
			allnodes.push(nodes[i]);
		//	console.log(allnodes);
	}
		callback(allnodes);
});

});
//	callback(allnodes);
//var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(output));
//var dlAnchorElem = document.getElementById('downloadAnchorElem');
//dlAnchorElem.setAttribute("href",     dataStr     );
//dlAnchorElem.setAttribute("download", "data.json");
//dlAnchorElem.click();
}

function getDiscussionTopicNodes(course_id,topic_id,callback){
	getDiscussionTopic(course_id,topic_id,function(output){
		var allnodes=[];
		var dnode ={};
		dnode['user_id']=output.discussions_topic.id;
		dnode['name']=output.discussions_topic.title;
		dnode['image']="";

		callback(dnode);
	});

}


function getLinks(course_id,topic_id,callback){
	getAllTopicEntries(course_id,topic_id,function(data){
	var links = [];
	var replies=[];
	var edata = data.topic_entries;
	for(i=0;i<edata.length;i++){
		var link ={};
		link['source']=edata[i].user_id;
		if(edata[i].parent_id==null){
			link['target']=topic_id;
		}
		link['post']=edata[i].message;
		link['post_id']=edata[i].id;
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
				for(l=0;l<w.length;l++){
				if(w[k].parent_id===w[l].id){
					rlink['target']=w[l].user_id;
				}
				else{
				for(m=0;m<edata.length;m++){
					if(edata[m].id === w[k].parent_id){
					rlink['target'] = edata[m].user_id;
						}
			//		else if(edata[m].parent_id==null)
			//		{
			//			rlink['target']=edata[m].user_id;
		//			}
				
				rlink['post']=w[k].message;
				rlink['post_id']=w[k].id;
			}
				}
				}
				links.push(rlink);
			}
		}



		}


		links.push(link);
		}

	    
		callback(links);	
	});
}


function getUserEntries(course_id,topic_id,user_id,callback){
	user_entry={};
	var entries=[];
	getDiscussionTopic(course_id,topic_id,function(output){
		var dt=output.discussions_topic;
		if(topic_id === user_id){
		post={};
		user_entry['id']=dt.id;
		user_entry['name']=dt.title;
		user_entry['image']="";
		user_entry['link']=dt.html_url;
		
		user_entry['posts']={};
		post['created_at']=dt.created_at;
		post['entry_id']=dt.id;		
		post['post']=dt.message;
		entries.push(post);
		}
//	});	
		getAllTopicEntries(course_id,topic_id,function(result){
		var te=result.topic_entries;
		for(i=0;i<te.length;i++){
			if(te[i].user_id === user_id){
		user_entry['id']=te[i].user.id;
		user_entry['name']=te[i].user.display_name;
		user_entry['image']=te[i].user.avatar_image_url;
		user_entry['link']=te[i].user.html_url;
				user_entry['posts']={};
				tpost={};
				tpost['created_at']=te[i].created_at;
				tpost['entry_id']=te[i].id;
				tpost['post']=te[i].message;
				entries.push(tpost);
			}
			if(te[i].recent_replies){
				rentries=[];
				replies=te[i].recent_replies;
				for(j=0;j<replies.length;j++){
					if(replies[j].user_id === user_id){
						user_entry['id']=replies[j].user.id;
		user_entry['name']=replies[j].user.display_name;
		user_entry['image']=replies[j].user.avatar_image_url;
		user_entry['link']=replies[j].user.html_url;
		user_entry['posts']={};
		
					rpost={};
					rpost['created_at']=replies[j].created_at;
					rpost['entry_id']=replies[j].id;
					rpost['post']=replies[j].message;
					entries.push(rpost);
				}
			}
			}
		}
			user_entry['posts']=entries;
			callback(user_entry);
		});

	});
}
  
function getUserRole(course_id,callback){
	getCourse(course_id,function(output){
		//console.log(output);
		callback(output.course.enrollments[0]);
	});
}

