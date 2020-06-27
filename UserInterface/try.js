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

function formDiscussion(course_id){

	$("#topic").append("Create a New Discussion:<br>");
	$("#topic").append("<form id='discussionForm' method='post'><br>Enter Title: <input type='text' name='dtitle' placeholder='type a discussion title'><br>Enter Post: <input type='text' name='dmessage' placeholder='type post'><br><input type='submit' value='Create'>");


$('#discussionForm').submit(function(e) {
	e.preventDefault();
    // get all the inputs into an array.
    var $inputs = $('#discussionForm :input');

    // not sure if you wanted this, but I thought I'd add it.
    // get an associative array of just the values.
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
//alert("values "+values['dtitle']+","+values['dmessage']);
	var title=values['dtitle'],message=values['dmessage'];
	
createDiscussion(course_id,title,message);
//$("#topic").load(location.href + " #topic");	
});
}

function showDiscussions(course_id,callback){
	getDiscussionsByCourseID(course_id,function(output){
//		console.log(output);
formDiscussion(course_id);
//		$("#topic").append("<div id='dlist'>")
$.each(output.discussions_topics,function(k,v){
			
			$("#dlist").append("<br><button name='topic-btn' value='"+v.title+"' onclick='showAllData("+course_id+','+v.id+")'>"+v.title+"</button>");
		});
//		$("#topic").append("</div>");
		$("body").on('click', "button[name=topic-btn]", function() {
  			var text = $(this).attr("value");
  			$("#t_name").append("<p>"+text);
		});
	});

	}

function createDiscussion(course_id,title,message) {
//var title = $('#discussionForm').find('input[name="dtitle"]').val();  
//var message = $('#discussionForm').find('input[name="dmessage"]').val();  

$.ajax({
                url: apiUrl+'courses/'+course_id+'/discussion_topics',
                method: "post",
                headers: {"Content-Type": "application/json"},
                data: JSON.stringify({title: title, message: message}),
                dataType: 'json',
                success: function (data) {
                        console.log(data);
			getDiscussionsByCourseID(course_id,function (out){
			console.log(out);
			topics=out.discussions_topics;
			for(i=0;i<topics.length;i++){
				if(topics[i].title == title){
					var id = topics[i].id;
					console.log(id);
				}
			}
			
		$("#dlist").prepend("<br><button name='topic-btn' value='"+data.title+"' onclick='showAllData("+course_id+','+id+")'>"+data.title+"</button>");
//		$("#topic").append("</div>");
		$("body").on('click', "button[name=topic-btn]", function() {
  			var text = $(this).attr("value");
  	//		$("#t_name").append("<p>"+text);
		});
			});
	//		$("#t_name").append("<p>"+data.title);
		//	location.replace(location.pathname);
			//location.refresh();
//			showDiscussions(course_id,function(d){
//				$("#dlist").empty().append(d);
//			console.log(d);
//			});
			//			
                },
                error: function(error){
                        console.log("Error on ajax fetch");
        }});
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
//			console.log(data);
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
			$("#c").hide();
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
//		graph=JSON.stringify(d);
//		graph = JSON.stringify(d);
//		var graph=JSON.stringify(d);
//console.log(graph.links);
//links=JSON.stringify(graph.links).slice()
//var nodes = graph.nodes;		
//console.log(links);
//console.log(nodes);
//var width=960,height=600;	
var links=graph.links,
	nodes=graph.nodes;


//links.sort(function(a,b) {
//    if (a.source > b.source) {return 1;}
//    else if (a.source < b.source) {return -1;}
//    else {
//        if (a.target > b.target) {return 1;}
//        if (a.target < b.target) {return -1;}
//        else {return 0;}
//    }
//});
//any links with duplicate source and target get an incremented 'linknum'
//for (var i=0; i<links.length; i++) {
//    if (i != 0 &&
//        links[i].source == links[i-1].source &&
//        links[i].target == links[i-1].target) {
//            links[i].linknum = links[i-1].linknum + 1;
//        }
//    else {links[i].linknum = 1;};
//};
		
var nodeMap = {};
            nodes.forEach(function(x) { nodeMap[x.user_id] = x; });
            links = links.map(function(x) {
                return {
                    source: nodeMap[x.source],
                    target: nodeMap[x.target],
                };
            });

//console.log(nodes);
//		console.log(links);



//var nodeHash = {};
//  var edgeHash = {};
//  var n = [];
//  var e = [];

//  links.forEach(function (edge) {
//    if (!nodeHash[edge.source]) {
//      nodeHash[edge.source] = {id: edge.source, label: edge.source};
//      n.push(nodeHash[edge.source]);
//      e.push({id: nodeHash[edge.source].id + "-" + nodeHash[edge.target].id, source: nodeHash[edge.source], target: nodeHash[edge.target]});
//    }
//    if (!nodeHash[edge.target]) {
//      nodeHash[edge.target] = {id: edge.target, label: edge.target};
//      n.push(nodeHash[edge.target]);
//      e.push({id: nodeHash[edge.source].id + "-" + nodeHash[edge.target].id, source: nodeHash[edge.source], target: nodeHash[edge.target]});    }
//    if (edge.weight == 5) {
//      e.push({id: nodeHash[edge.source].id + "-" + nodeHash[edge.target].id, source: nodeHash[edge.source], target: nodeHash[edge.target]});
//    }
//  });



var node_data = nodes.map(function (d) {return d.user_id});
var edge_data = links.map(function (d) {return [d.source.user_id, d.target.user_id]; });


console.log(node_data);
console.log(edge_data);

var G = new jsnx.Graph();
G.addNodesFrom(node_data);
G.addEdgesFrom(edge_data);

var betweenness = jsnx.betweennessCentrality(G);
//var eigenvector = jsnx.eigenvectorCentrality(G);
var clustering = jsnx.clustering(G);

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

var degree=degreeCent(graph);
console.log(betweenness);
console.log(clustering);
console.log(degree);
// Toggle for ego networks on click (below).
var toggle = 0;

// Make object of all neighboring nodes.
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


//g.append("circle")
//    .attr("transform", "translate(" + 100 + "," + 100 + ")")
//    .attr("cx", 20)
//    .attr("cy", 20)
//    .attr("r", 20)
//    .style("fill", "#fff")
//    .style("fill", "url(#grump_avatar"+i);	
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
        });
        var sameAlt = _.filter(links, {
            'source': link.target,
            'target': link.source
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
	


//       var dx = (d.target.x - d.source.x),
//            dy = (d.target.y - d.source.y),
//            dr = Math.sqrt(dx * dx + dy * dy),
//		dr=75/d.linknum;
//            unevenCorrection = (d.sameUneven ? 0 : 0.5),
//           arc1 = ((20 * d.maxSameHalf) / (d.sameIndexCorrected + unevenCorrection));
//arc=dr;

//           arc2 = ((35 * d.maxSameHalf) / (d.sameIndexCorrected - unevenCorrection));        if (d.sameMiddleLink) {
//            arc = 0;
//        }



// var index = getIndexOfDuplicateEdge();
//    var degree = 360 / numberOfDuplicateEdges();
//    var degreeForIndex = degree * index;		

	

//        return "M" + d.source.x + "," + d.source.y + "A" + arc1 + "," + arc2 + '"'+degreeForIndex+ " 1," + 
//						d.sameArcDirection + " " 
			
//			+ d.target.x + "," + d.target.y;



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
        .force("center", d3.forceCenter(width / 2, height / 2));


  
        update(links, nodes);
    

    function update(links, nodes) {
   //     link = svg.selectAll(".link")
   //         .data(links)
   //         .enter()
   //         .append("line")
   //         .attr("class", "link")
	    
// add tooltip to HTML body
  var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("padding", "10px")
    .style("z-index", "10")
    .style("width", "300px")
   // .style("height", "1000px")
    .style("background-color", "rgba(230, 242, 255, 0.8)")
    .style("border-radius", "5px")
    .style("visibility", "hidden")
    .text("");


	    link = svg.selectAll(".link")
    .data(links, function(d) { return d.source + ", " + d.target;}).enter().append("path")
    .attr("class", "link")
   .attr('marker-end','url(#arrowhead)');

    

        link.append("title")
            .text(function (d) {return d.type;});

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
            .style("pointer-events", "none");

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
            });

//        edgelabels.append('textPath')
//            .attr('xlink:href', function (d, i) {return '#edgepath' + i})
//            .style("text-anchor", "middle")
//            .style("pointer-events", "none")
//            .attr("startOffset", "50%")
//            .text(function (d) {return d.type});

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


//console.log(node);

// keep track of if tooltip is hidden or not
  var isTooltipHidden = true;

function clickNode(node) {
       // update visibility
       isTooltipHidden = !isTooltipHidden;
       var visibility = (isTooltipHidden) ? "hidden" : "visible";

// D3 v4
var pageX = d3.event.pageX 
var pageY = d3.event.pageY
	
       // load tooltip content (if it changes based on node)
       loadTooltipContent(node);
       
       if (isTooltipHidden) {
         unPinNode(node);
       }
    
       // place tooltip where cursor was
       return tooltip.style("top", (pageY -10) + "px").style("left", (pageX + 10) + "px").style("visibility", visibility);

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
	  var htmlContent="";
     node.fx = null;
     node.fy = null;
  }

  // add html content to tooltip
  function loadTooltipContent(node) {
	//  console.log(node);
	getUserEntries(course_id,topic_id,node.user_id,function(output){
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

		console.log(output);
		var htmlContent= "";
		htmlContent += "<div>";
      htmlContent += "<h4>" + output.name +"  "+"<img width=20 height=20 src='"+output.image+"'><\/h4>";
		htmlContent+="Degree Centrality: "+deg+"<br>";
		htmlContent+="Betweenness Centrality: "+bet+"<br>";
		htmlContent+="Clustering Coefficient: "+clu+"<br>";


//      htmlContent += "<img width=10 height=10 src='"+output.image+"'><br>"
	posts=output.posts;
	posts.forEach(pf);
		
		function pf(item,index){
//			console.log(item);
					
		
      htmlContent += "<form method=\"post\" action=\"\">"
	htmlContent +="Date: <i>"+item.created_at+"</i><br>"     
//	htmlContent+="Degree: "+deg
      htmlContent += "Post: "+item.post+"<br><br>"

      htmlContent += "<button id='\"reply'+index+'\">Reply</button>"
      htmlContent += "<button name=\"Comment\">Comment</button>"	
      htmlContent += "<button name=\"Discuss\" value=\"Discuss\">Discuss</button>"
      htmlContent += "<button name=\"Solve\" value=\"Solve\">Solve</button>"	

      htmlContent += "<\/form>"
   
	}
   htmlContent += "<\/div>"	
      tooltip.html(htmlContent);
	});
  }


// Linear scale for degree centrality.
  var degreeSize = d3.scaleLinear()
  	.domain([d3.min(graph.nodes, function(d) {return d.degree; }),d3.max(graph.nodes, function(d) {return d.degree; })])
  	.range([8,25]);


        node.append("circle")
	    // Calculate degree centrality within JavaScript.
 //   .attr("r", function(d, i) { count = 0; graph.links.forEach(function(l) { if (l.source == i || l.target == i) { count += 1;}; }); return size(count);})
	    .attr("cx",20)
        .attr("cy", 20)
	    .attr("r",20)
	    .attr("preserveAspectRatio","xMidYMid slice")
	    .on("click",clickNode)
		    
		   // function(d){getUserEntries(course_id,topic_id,d.user_id,function(n){
//		   	console.log(n);

		   
	    
//	clickNode(n);	


//	    });
//	    })
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

		//var container = svg.append('g');var container = svg.append('g');	"url(#grump_avatar1)"
	);
//node.forEach(function(d,i){
//        d.append("circle")
//	    .attr("cx",20)
//        .attr("cy", 20)
//       .attr("r", 20)
//	    .attr("preserveAspectRatio","xMidYMid slice")
//        .style("fill", "#fff")
//        .style("fill", "url(#grump_avatar"+i+")");

//});


        node.append("title")
            .text(function (d) {return d.user_id;});

        node.append("text")
            .attr("dy", -3)
            .text(function (d) {return d.name});

        simulation
            .nodes(nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(links);
    }

    function ticked() {

        link.attr("d",linkArc);
       //     .attr("x1", function (d) {return d.source.x;})
       //     .attr("y1", function (d) {return d.source.y;})
       //     .attr("x2", function (d) {return d.target.x;})
       //     .attr("y2", function (d) {return d.target.y;});
//	    .attr("d", function(d) {

//	     var x1 = d.source.x,
//      y1 = d.source.y,
//      x2 = d.target.x,
//      y2 = d.target.y,
//      dx = x2 - x1,
//      dy = y2 - y1,
//      dr = Math.sqrt(dx * dx + dy * dy),

      // Defaults for normal edge.
//      drx = dr,
//      dry = dr,
//      xRotation = 0, // degrees
//      largeArc = 0, // 1 or 0
//      sweep = 1; // 1 or 0

    // Self edge.
//    if (x1 === x2 && y1 === y2) {
      // Fiddle with this angle to get loop oriented.
//      xRotation = -45;

      // Needs to be 1.
//      largeArc = 1;

      // Change sweep to change orientation of loop. 
      //sweep = 0;

      // Make drx and dry different to get an ellipse
      // instead of a circle.
//      drx = 20;
//      dry = 40;

      // For whatever reason the arc collapses to a point if the beginning
      // and ending points of the arc are the same, so kludge it.
//      x2 = x2 + 1;
//      y2 = y2 + 1;
//    }
	

//    return "M" + x1 + "," + y1 + "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep + " " + x2 + "," + y2;
 

//    });

        node
            .attr("transform", function (d) {return "translate(" + d.x + ", " + d.y + ")";});

        edgelabels.attr('d', function (d) {
            return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
        });

//        edgelabels.attr('transform', function (d) {
 //           if (d.target.x < d.source.x) {
//                var bbox = this.getBBox();

//                rx = bbox.x + bbox.width / 2;
//                ry = bbox.y + bbox.height / 2;
//                return 'rotate(180 ' + rx + ' ' + ry + ')';
//            }
//            else {
//                return 'rotate(0)';
//            }
    
//	});


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
//			console.log(data);
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
	//	console.log(tdata);
		var nodes=[];
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

	getDiscussionTopicNodes(course_id,topic_id,function(out){
		console.log(out);
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
//		console.log(output);
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
//		console.log(allnodes);
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
	//	console.log(output);
		var dt=output.discussions_topic;
		tlink['source']=dt.author.id;
		tlink['target']=dt.id;
		tlink['post']=dt.message;
		links.push(tlink);
		console.log(links);
		callback(links);	
	});
	});
}



function getUserEntries(course_id,topic_id,user_id,callback){
	user_entry={};
	var entries=[];
	getDiscussionTopic(course_id,topic_id,function(output){
//		entries=[];
		var dt=output.discussions_topic;
//		console.log(dt);
		if(dt.author.id === user_id){
		post={};
		user_entry['id']=dt.author.id;
		user_entry['name']=dt.author.display_name;
		user_entry['image']=dt.author.avatar_image_url;
		user_entry['link']=dt.author.html_url;
		user_entry['posts']={};
		post['created_at']=dt.created_at;
		post['post']=dt.message;
		entries.push(post);
	//	user_entry['posts']=entries;
		}
	});	
		getAllTopicEntries(course_id,topic_id,function(result){
		//	console.log(result);
	//	tentries=[];

		var te=result.topic_entries;
		for(i=0;i<te.length;i++){
//			console.log(te[i]);
			if(te[i].user_id === user_id){
		user_entry['id']=te[i].user.id;
		user_entry['name']=te[i].user.display_name;
		user_entry['image']=te[i].user.avatar_image_url;
		user_entry['link']=te[i].user.html_url;
		user_entry['posts']={};
				tpost={};
				//console.log(tentry);
				//entry['posts']={};
				tpost['created_at']=te[i].created_at;
				tpost['post']=te[i].message;
				entries.push(tpost);
			//	user_entry['posts']=tentries;
			}
			if(te[i].recent_replies){
				rentries=[];
				replies=te[i].recent_replies;
		//	if(replies){
		//		console.log(replies);
				for(j=0;j<replies.length;j++){
					if(replies[j].user_id === user_id){
						user_entry['id']=replies[j].user.id;
		user_entry['name']=replies[j].user.display_name;
		user_entry['image']=replies[j].user.avatar_image_url;
		user_entry['link']=replies[j].user.html_url;
		user_entry['posts']={};
		
					rpost={};
					rpost['created_at']=replies[j].created_at;
					rpost['post']=replies[j].message;
					entries.push(rpost);
	//				user_entry['posts']=rentries;
				}
			}
			}
		}
			user_entry['posts']=entries;
			callback(user_entry);
		});



//		callback(user_entry);
		
//});	
	
}
  















