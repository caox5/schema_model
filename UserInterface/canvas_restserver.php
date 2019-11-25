<?php
	 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("content-type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

include_once "canvasModel.php";

$course_id = ;
$user   = "Unknown";

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


if ($method=="get" &&  sizeof($parts) == 5 && $parts[0] == "api"  && $parts[1] == "v1" && $parts[2] == "courses" && $parts[3]==$course_id && $parts[4]=="discussion_topics") {
	$discussion_topics = getDiscussions();
	$retData = array("discussions_topics"=>$discussion_topics);
	sendJSON("OK","",$retData);

}

else if ($method == "get" &&  sizeof($parts) == 6 && $parts[0] == "api" &&  $parts[1] == "v1" && $parts[2] == "courses" && $parts[3] == $course_id && $parts[4]=="discussion_topics" && $parts[5]==$discussion_id) {
	$retData = getDiscussionTopic($topic);
        sendJSON("OK","",$retData);

}  

else if ($method == "get" &&  sizeof($parts) == 7 && $parts[0] == "api" && $parts[1] == "v1" && $parts[2] == "courses" && $parts[3]==$course_id && $parts[4]=="discussion_topics" && $parts[5]==$discussion_id && $parts[6]=="entries") {

	$topic_entries = getTopicEntries($topic);
        $retData = array("topic_entries"=>$topic_entries);
        sendJSON("OK","",$retData);


}  

else if ($method == "post" &&  sizeof($parts) == 4 && $parts[0] == "api" && $parts[1] == "v1" && $parts[2] == "game" && $parts[3] == "status") {
	// Get and parse body.
	$jsonBody = array();
	try {
		ini_set("allow_url_fopen", true);
		// Get JSON as a string.
		$json_str = file_get_contents("php://input");   // Reading raw data.
		// Get as an object.
		$jsonBody = json_decode($json_str, true);
	} catch (Exception $e) {    // Error Checking.
		$errormsg = $e->getMessage();
		sendJson("FAIL", "JSON DECODE ERROR while getting game status. ".$errormsg, array());
	}   

	if (!isset($jsonBody['game_id'])) { // Error Checking.
		$err_msg = "No game_id. ";
		sendJson("FAIL", "JSON DECODE ERROR. ".$err_msg, array());
	}   
	$gameId = intval(htmlspecialchars($jsonBody['game_id']));	// Error Checking.
    
	$status = getElement("status", $gameId);
	if(!isset($status)) {   // Error Checking.
		$err_msg = "Error in getting game status. No such gameId/status. ".$status;
		sendJson("FAIL", $err_msg, array());
	}
    
	sendJson("OK", "", array("game_status" => $status));
} 

else if ($method == "post" &&  sizeof($parts) == 4 && $parts[0] == "api" && $parts[1] == "v1" && $parts[2] == "game" && $parts[3] == "play") {
	// Get and parse body.
	$jsonBody = array();
	try {
		ini_set("allow_url_fopen", true);
		// Get JSON as a string.
		$json_str = file_get_contents("php://input");	// Reading raw data.
		// Get as an object.
		$jsonBody = json_decode($json_str, true);
	} catch (Exception $e) {	// Error Checking.
		$errormsg = $e->getMessage();
		sendJson("FAIL", "aaJSON DECODE ERROR while getting game status. ".$errormsg, array());
	}

	if (!isset($jsonBody['game_id'])) {	// Error Checking.
		$err_msg = "No game_id. ";
		sendJson("FAIL", "JSON DECODE ERROR. ".$err_msg, array());
	}   
	$gameId = intval(htmlspecialchars($jsonBody['game_id']));	// Error Checking.
    
	if (!isset($jsonBody['player_id'])) {	// Error Checking.
		$err_msg = "No player_id. ";
		sendJson("FAIL", "bbJSON DECODE ERROR. ".$err_msg, array());
	}
	$playerId = intval(htmlspecialchars($jsonBody['player_id']));	// Error Checking.
	
	if (!isset($jsonBody['move_number']) or 
		!($jsonBody['move_number'] >= 1 && $jsonBody['move_number'] <= 9)) {
		$err_msg = "No/Wrong move_number. ";
		sendJson("FAIL", "ccJSON DECODE ERROR. ".$err_msg, array());
	}

	$moveNum = intval(htmlspecialchars($jsonBody['move_number']));	// Error Checking.
	
	$status = addMove($gameId, $playerId, $moveNum);
	if(!isset($status)) {	// Error Checking.
		$err_msg = "Error in updating the game status.";
		sendJson("FAIL", $err_msg, array());
	}    
    
	sendJson("OK", $status, array());
}  
 
else if ($method == "delete" and  sizeof($parts) == 3 and $parts[0] == "api" && $parts[1] == "v1" and $parts[2] == "game" ) {
	// Get and parse body.
	$jsonBody = array();
	$errormsg = "none";
	$action   = "DELETE";
	try {
		// Get JSON as a string.
		$json_str = file_get_contents("php://input");	// Reading raw data.
		// Get as an object.
		$jsonBody = json_decode($json_str, true);
	} catch (Exception $e) {	// Error Checking.
		$err_msg = $e->getMessage();
		sendJson("FAIL", "JSON DECODE ERROR in deleting a game. ".$err_msg, array());
	}
	
	if (!isset($jsonBody['game_id'])) {	// Error Checking.
		$err_msg = "No game_id. ";
		sendJson("FAIL", "JSON DECODE ERROR. ".$err_msg, array());
	}
	$gameId = intval(htmlspecialchars($jsonBody['game_id']));	// Error Checking.

	$status = deleteGame($gameId);
	if (!isset($status) or $status != "OK") {
		$err_msg = "Error in removing from dataBase. ".$status;
		sendJson("FAIL", $err_msg, array());
	}

	sendJson("OK", $status, array());

}
sendJson("FAIL", "Unknown Uri", array());
header($_SERVER['SERVER_PROTOCOL'] . ' 404 Invalid URL' , true, 400);
?>

