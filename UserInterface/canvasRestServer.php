<?php
	 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("content-type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

include "canvasModel.php";

function sendJson($status, $msg, $result) {
	$returnData = array();
	$returnData['status'] = $status;
	$returnData['msg'] = $msg;
	foreach ($result as $k=>$v) {
		$returnData[$k] = $v;
	}

	print json_encode($returnData);
	exit;
	
}


if (isset($_SERVER["PATH_INFO"])) {
	$parts = explode("/", $_SERVER["PATH_INFO"]);
	// Sanitize
	for ($i = 0; $i < count($parts); $i++) {
		$parts[$i] = htmlspecialchars($parts[$i]);
	}
} else {
	$parts = array();	
}		
	
// get rid of first part of url.
array_shift($parts);
	
$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method == "options") {
	exit;
}


if ($method == "get" &&  sizeof($parts) == 3 && $parts[0] == "api"  && $parts[1] == "v1" && $parts[2] == "courses") {
	$courses = getAllCourses();
	$retData = array("courses"=>$courses);
	sendJSON("OK","",$retData);
}

else if ($method == "get" &&  sizeof($parts) == 4 && $parts[0] == "api"  && $parts[1] == "v1" && $parts[2] == "courses") {
	$course_id = intval($parts[3]);
	$course = getCourseByID($course_id);
	$retData = array("course"=>$course);
	sendJSON("OK","",$retData);
}


else if ($method == "get" &&  sizeof($parts) == 5 && $parts[0] == "api"  && $parts[1] == "v1" && $parts[2] == "courses" && $parts[4] == "discussion_topics") {	
	$course_id = intval($parts[3]);
	$discussion_topics = getDiscussionsByCourseID($course_id);
	$retData = array("discussions_topics"=>$discussion_topics);
	sendJSON("OK","",$retData);
} 


else if ($method == "post" &&  sizeof($parts) == 5 && $parts[0] == "api"  && $parts[1] == "v1" && $parts[2] = "courses"  && $parts[4] == "discussion_topics") {
	//get and parse body
	$course_id = intval($parts[3]);
	$jsonBody = array();
	$errormsg = "none";
	try {
		# Get JSON as a string
		$json_str = file_get_contents('php://input');

		# Get as an object
		$jsonBody = json_decode($json_str,true);
	} catch (Exception $e) {
		$errormsg = $e->getMessage();
		sendJson("FAIL","JSON DECODE ERROR " . $errormsg,array());
	}

	if (!isset($jsonBody['title'])) {
		$errormsg=$e->getMessage();
		sendJson("FAIL","JSON DECODE ERROR no title".$errormsg,array());
	}
	$title = htmlspecialchars($jsonBody['title']);
	$message = htmlspecialchars($jsonBody['message']); 
	createDiscussion($course_id,$title,$message);
	sendJson("OK","",array('title'=>$title,'message'=>$message));
}


else if ($method=="put" &&  sizeof($parts) == 6 && $parts[0] == "api"  && $parts[1] == "v1" && $parts[2] = "courses"  && $parts[4] == "discussion_topics") {
	//get and parse body
	$course_id = intval($parts[3]);
	$topic_id = intval($parts[5]);
	$jsonBody = array();
	$errormsg = "none";
	try {
		# Get JSON as a string
		$json_str = file_get_contents('php://input');

		# Get as an object
		$jsonBody = json_decode($json_str,true);
	} catch (Exception $e) {
		$errormsg = $e->getMessage();
		sendJson("FAIL","JSON DECODE ERROR " . $errormsg,array());
	}

	if (!isset($jsonBody['title'])) {
		$errormsg=$e->getMessage();
		sendJson("FAIL","JSON DECODE ERROR no title".$errormsg,array());
	}
	$title = htmlspecialchars($jsonBody['title']);
	$message = htmlspecialchars($jsonBody['message']); 
	updateDiscussion($course_id,$topic_id,$title,$message);
	sendJson("OK","",array('title'=>$title,'message'=>$message));
}


else if ($method=="delete" &&  sizeof($parts) == 6 && $parts[0] == "api"  && $parts[1] == "v1" && $parts[2] = "courses"  && $parts[4] == "discussion_topics") {
        //get and parse body
        $course_id = intval($parts[3]);
        $topic_id = intval($parts[5]);
        deleteDiscussion($course_id,$topic_id);
        sendJson("OK","",array());
}


else if ($method == "get" &&  sizeof($parts) == 6 && $parts[0] == "api"  && $parts[1] == "v1" && $parts[2] == "courses" && $parts[4] == "discussion_topics") {	
	$course_id = intval($parts[3]);
	$topic_id = intval($parts[5]);
	$discussion_topic = getDiscussionTopic($course_id,$topic_id);
	$retData = array("discussions_topic"=>$discussion_topic);
	sendJSON("OK","",$retData);
}


else if ($method == "get" &&  sizeof($parts) == 7 && $parts[0] == "api"  && $parts[1] == "v1" && $parts[2] == "courses" && $parts[4] == "discussion_topics" && $parts[6] == "entries") {
        $course_id = intval($parts[3]);
        $topic_id = intval($parts[5]);
        $topic_entries = getTopicEntriesByDiscussionID($course_id,$topic_id);
        $retData = array("topic_entries"=>$topic_entries);
        sendJSON("OK","",$retData);
}


else if ($method == "post" &&  sizeof($parts) == 7 && $parts[0] == "api"  && $parts[1] == "v1" && $parts[2] == "courses"  && $parts[4] == "discussion_topics" && $parts[6] == "entries") {
	//get and parse body
	$course_id = intval($parts[3]);
	$topic_id = intval($parts[5]);
	$jsonBody = array();
	$errormsg = "none";
	try {
		# Get JSON as a string
		$json_str = file_get_contents('php://input');

		# Get as an object
		$jsonBody = json_decode($json_str,true);
	} catch (Exception $e) {
		$errormsg = $e->getMessage();
		sendJson("FAIL","JSON DECODE ERROR " . $errormsg,array());
	}

	if (!isset($jsonBody['message'])) {
		$errormsg=$e->getMessage();
		sendJson("FAIL","JSON DECODE ERROR no message".$errormsg,array());
	}
	$message = htmlspecialchars($jsonBody['message']);
       	
//	createDiscussionTopicEntry($course_id,$topic_id,$message);
	createDiscussionTopicEntry($course_id,$topic_id,$message);
	sendJson("OK","",array('message'=>$message));
}


else if ($method == "put" &&  sizeof($parts) == 8 && $parts[0] == "api"  && $parts[1] == "v1" && $parts[2] == "courses"  && $parts[4] == "discussion_topics" && $parts[6] == "entries") {
	//get and parse body
	$course_id = intval($parts[3]);
	$topic_id = intval($parts[5]);
	$entry_id = intval($parts[7]);
	$jsonBody = array();
	$errormsg = "none";
	try {
		# Get JSON as a string
		$json_str = file_get_contents('php://input');

		# Get as an object
		$jsonBody = json_decode($json_str,true);
	} catch (Exception $e) {
		$errormsg = $e->getMessage();
		sendJson("FAIL","JSON DECODE ERROR " . $errormsg,array());
	}

	if (!isset($jsonBody['message'])) {
		$errormsg=$e->getMessage();
		sendJson("FAIL","JSON DECODE ERROR no message".$errormsg,array());
	}
	$message = htmlspecialchars($jsonBody['message']); 
	updateDiscussionTopicEntry($course_id,$topic_id,$entry_id,$message);
	sendJson("OK","",array("message"=>$message));
}


else if ($method == "delete" &&  sizeof($parts) == 8 && $parts[0] == "api"  && $parts[1] == "v1" && $parts[2] == "courses"  && $parts[4] == "discussion_topics" && $parts[6] == "entries") {
        //get and parse body
	$course_id = intval($parts[3]);
	$topic_id = intval($parts[5]);
	$entry_id = intval($parts[7]);
	$result=deleteDiscussionTopicEntry($course_id,$topic_id,$entry_id);
        sendJson("OK","",array());
}


else if ($method == "get" &&  sizeof($parts) == 9 && $parts[0] == "api"  && $parts[1] == "v1" && $parts[2] == "courses" && $parts[4] == "discussion_topics" && $parts[6] == "entries" && $parts[8] == "replies") {
        $course_id = intval($parts[3]);
	$topic_id = intval($parts[5]);
	$entry_id = intval($parts[7]);
	$entry_replies = getDiscussionEntryReplies($course_id,$topic_id,$entry_id);
	//print_r($entry_replies);
	$retData = array("entry_replies"=>$entry_replies);
	//print_r($retData);
        sendJSON("OK","",$retData);
}

else if ($method == "post" &&  sizeof($parts) == 9 && $parts[0] == "api"  && $parts[1] == "v1" && $parts[2] == "courses"  && $parts[4] == "discussion_topics" && $parts[6] == "entries" && $parts[8] == "replies") {
        //get and parse body
        $course_id = intval($parts[3]);
	$topic_id = intval($parts[5]);
	$entry_id = intval($parts[7]);
        $jsonBody = array();
        $errormsg = "none";
        try {
                # Get JSON as a string
                $json_str = file_get_contents('php://input');

                # Get as an object
                $jsonBody = json_decode($json_str,true);
        } catch (Exception $e) {
                $errormsg = $e->getMessage();
                sendJson("FAIL","JSON DECODE ERROR " . $errormsg,array());
        }

        if (!isset($jsonBody['message'])) {
                $errormsg=$e->getMessage();
                sendJson("FAIL","JSON DECODE ERROR no message".$errormsg,array());
        }
        $message = htmlspecialchars($jsonBody['message']);
        createDiscussionEntryReply($course_id,$topic_id,$entry_id,$message);
        sendJson("OK","",array('message'=>$message));
}


else if ($method == "post" &&  sizeof($parts) == 9 && $parts[0] == "api"  && $parts[1] == "v1" && $parts[2] == "courses"  && $parts[4] == "discussion_topics" && $parts[6] == "entries" && $parts[8] == "rating") {
        //get and parse body
        $course_id = intval($parts[3]);
        $topic_id = intval($parts[5]);
        $entry_id = intval($parts[7]);
        $jsonBody = array();
        $errormsg = "none";
        try {
                # Get JSON as a string
                $json_str = file_get_contents('php://input');

                # Get as an object
                $jsonBody = json_decode($json_str,true);
        } catch (Exception $e) {
                $errormsg = $e->getMessage();
                sendJson("FAIL","JSON DECODE ERROR " . $errormsg,array());
        }

        if (!isset($jsonBody['rating'])) {
                $errormsg=$e->getMessage();
                sendJson("FAIL","JSON DECODE ERROR no message".$errormsg,array());
        }
        $rating = intval(htmlspecialchars($jsonBody['rating']));
        rateDiscussionEntry($course_id,$topic_id,$entry_id,$rating);
	sendJson("OK","",array());
}




//sendJson("FAIL", "Unknown Uri", array());
header($_SERVER['SERVER_PROTOCOL'] . ' 404 Invalid URL' , true, 400);
?>

