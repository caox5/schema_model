<?php

//this file contains authorization key
//require "key.php";

//this calls in all autoload packages installed via composer
require __DIR__ . '/vendor/autoload.php'; 

//bring guzzle client into code
use GuzzleHttp\Client;

//base uri -> it is important it end in /
$uri = "https://miamioh.instructure.com/api/v1/";


//create a new client
$client = new Client([
    // Base URI is used with relative requests
    'base_uri' => $uri,
    // You can set any number of default request options.
    'timeout'  => 2.0,
]);


//gets all courses from canvas
function getAllCourses() {
  global $client;
  try {

  $header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");

  $response = $client->request('get','courses',['headers'=>$header]);
//print_r($response);
} catch (Exception $e) {
  print "There was an error getting all courses from canvas";
  header("content-type: application/json",true);
  print_r($e);
  $a=print_r($e,true);
  error_log($a);
  exit;
}
$body = (string) $response->getBody();
$jbody = json_decode($body);
if (!$jbody) {
  error_log("no json");
  exit;
}
//print_r($jbody);
return $jbody;
}


//gets a specific course by its title
//$title -> course title
function getCourse($course_title){

  global $client;
  try {

  $header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");
  $c=getAllCourses();
  foreach($c as $t){
          if($c->title==$course_title){
                  $course_id=$c->id;
          }
  }

  $response = $client->request('get',"courses/".intval($course_id),['headers'=>$header]);
//print_r($response);
} catch (Exception $e) {
  print "There was an error getting the course from canvas";
  header("content-type: application/json",true);
  print_r($e);
  print_r($response);
  $a=print_r($e,true);
  error_log($a);
  exit;
}
$body = (string) $response->getBody();
$jbody = json_decode($body);
if (!$jbody) {
  error_log("no json");
  exit;
}
//print_r($jbody);
return $jbody;
}


//gets a specific course by its id
//$course_id -> course id
function getCourseByID($course_id){
 global $client;
  try {

  $header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");
$response = $client->request('get',"courses/".intval($course_id),['headers'=>$header]);
//print_r($response);
} catch (Exception $e) {
  print "There was an error getting the course by id from canvas";
  header("content-type: application/json",true);
  print_r($e);
  print_r($response);
  $a=print_r($e,true);
  error_log($a);
  exit;
}
$body = (string) $response->getBody();
$jbody = json_decode($body);
if (!$jbody) {
  error_log("no json");
  exit;
}
//print_r($jbody);
return $jbody;
}


//gets discussions from a course by title
//$course_title -> course title
function getDiscussions($course_title) {
  global $client;
  try {
	
  $header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");
  $c=getAllCourses();
  foreach($c as $t){
          if($c->title==$course_title){
                  $course_id=$c->id;
          }
  }
  $response = $client->request('get','courses/'.intval($course_id).'/discussion_topics',['headers'=>$header]);
//print_r($response);
} catch (Exception $e) {
  print "There was an error getting the discussion topics from canvas";
  header("content-type: application/json",true);
  print_r($e);
  $a=print_r($e,true);
  error_log($a);
  exit;
}
$body = (string) $response->getBody();
$jbody = json_decode($body);
if (!$jbody) {
  error_log("no json");
  exit;
}
//print_r($jbody);
return $jbody;
}


//gets discussions from a course by course id
//$course_id -> course id
function getDiscussionsByCourseID($course_id) {
  global $client;
  try {

  $header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");

  $response = $client->request('get','courses/'.intval($course_id).'/discussion_topics',['headers'=>$header]);
//print_r($response);
} catch (Exception $e) {
  print "There was an error getting the discussion topics from canvas";
  header("content-type: application/json",true);
  print_r($e);
  $a=print_r($e,true);
  error_log($a);
  exit;
}
$body = (string) $response->getBody();
$jbody = json_decode($body);
if (!$jbody) {
  error_log("no json");
  exit;
}
//print_r($jbody);
return $jbody;
}
  

//creates a new discussion topic with title and messages
//$title->discussion topic, $message->discussion message 
function createDiscussion($course_id,$title,$message){

  global $client;
  try {
	  $header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");
	  //print_r($key);)
	  //data to be posted
	  $assignment = array();
	  $assignment['description']=$title;
	  array_push($$assignment,$assignment['description']);
	  $data=array('title'=>$title,'message'=>$message,'discussion_type'=>'threaded','allow_rating'=>'true','published'=>'true','assignment'=>$assignment);
	 //print_r($data);
	 $response = $client->request('post','courses/'.intval($course_id).'/discussion_topics',['headers'=>$header,'form_params'=>$data]);
	 //print_r($response);
} catch (Exception $e) {
	print "There was an error creating the discussion topic";
  	header("content-type: text/plain",true);
  	//print_r($e);
  	$a=print_r($e,true);
  	error_log($a);
  	exit;
}	

$body = (string) $response->getBody();
$jbody = json_decode($body);

if (!$jbody) {
  error_log("no json");
  exit;
}
return $jbody;
}


//updates a discussion topic
//$course_id->course id, $topic_id->discussion topic id, $title->discussion topic, $message->discussion message 
function updateDiscussion($course_id,$topic_id,$title,$message){

 global $client;
try {
         $header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");

	 //data to be posted
         $data=array('title'=>$title,'message'=>$message);
         //print_r($data);

         $response = $client->request('put','courses/'.intval($course_id).'/discussion_topics/'.intval($topic_id),['headers'=>$header,'form_params'=>$data]);
         //print_r($response);
} catch (Exception $e) {
          print "There was an error updating the discussion topic";
        header("content-type: text/plain",true);
        //print_r($e);
        $a=print_r($e,true);
        error_log($a);
        exit;
}

$body = (string) $response->getBody();
$jbody = json_decode($body);
if (!$jbody) {
  error_log("no json");
  exit;
}
return $jbody;

}


//deletes a discussion topic
//$course_id->course id, $topic_id->discussion topic id 
function deleteDiscussion($course_id,$topic_id){
	
 global $client;
try {
         $header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");

         $response = $client->request('delete','courses/'.intval($course_id).'/discussion_topics/'.intval($topic_id),['headers'=>$header]);
         //print_r($response);
} catch (Exception $e) {
          print "There was an error deleting the discussion topic";
        header("content-type: text/plain",true);
        //print_r($e);
        $a=print_r($e,true);
        error_log($a);
        exit;
}

$body = (string) $response->getBody();
//print_r($body);
$jbody = json_decode($body);
//print_r($jbody);
if (!$jbody) {
  error_log("no json");
  exit;
}
return $jbody;

}


//gets a single discussion topic
//$course_id->course id, $topic_id->discussion topic id 
function getDiscussionTopic($course_id,$topic_id){
      
 global $client;
try {
  	$header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");
      
	$response = $client->request('get','courses/'.intval($course_id).'/discussion_topics/'.intval($topic_id),['headers'=>$header]);
//print_r($response);
} catch (Exception $e) {
  print "There was an error getting the discussion topic from canvas";
  header("content-type: application/json",true);
  print_r($e);
  print_r($response);
  $a=print_r($e,true);
  error_log($a);
  exit;
}
$body = (string) $response->getBody();
$jbody = json_decode($body);
if (!$jbody) {
  error_log("no json");
  exit;
}
//print_r($jbody);
return $jbody;
}	


//gets a list of discussion topic entries by discussion topic title
//$course_id->course id, $topic_id->discussion topic id 
function getTopicEntries($course_id,$topic){
	global $client;
	try {
	$d=getDiscussionsByCourseID($course_id);
  	foreach($d as $t){
          if($t->title==$topic){
                  $topic_id=$t->id;
          }
  }	
  	$header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");
  $response = $client->request('get','courses/'.intval($course_id).'/discussion_topics/'.intval($topic_id).'/entries',['headers'=>$header]);
//print_r($response);
} catch (Exception $e) {
  print "There was an error getting the discussion topic entries from canvas";
  header("content-type: application/json",true);
  print_r($e);
  $a=print_r($e,true);
  error_log($a);
  exit;
}
$body = (string) $response->getBody();
$jbody = json_decode($body);
if (!$jbody) {
  error_log("no json");
  exit;
}
//print_r($jbody);
return $jbody;
}


//gets a list of discussion topic entries by discussion topic id
//$course_id->course id, $topic_id->discussion topic id
function getTopicEntriesByDiscussionID($course_id,$topic_id){
	global $client;
  try {
  	$header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");
  	$response = $client->request('get','courses/'.intval($course_id).'/discussion_topics/'.intval($topic_id).'/entries',['headers'=>$header]);
//print_r($response);
} catch (Exception $e) {
  print "There was an error getting the discussion topic entries from canvas";
  header("content-type: application/json",true);
  print_r($e);
  $a=print_r($e,true);
  error_log($a);
  exit;
}
$body = (string) $response->getBody();
$jbody = json_decode($body);
if (!$jbody) {
  error_log("no json");
  exit;
}
//print_r($jbody);
return $jbody;

}


//creates an entry in discussion topic
//$course_id->course id, $topic_id->topic id
function createDiscussionTopicEntry($course_id,$topic_id,$message) {
 global $client;
try {
  $header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");

  $data=array('message'=>$message,'attachment'=>''); 
  $response = $client->request('post','courses/'.intval($course_id).'/discussion_topics/'.intval($topic_id).'/entries',['headers'=>$header,'form_params'=>$data]);
} catch (Exception $e) {
  print "There was an error creating new discussion entry on canvas";
  header("content-type: text/plain",true);
//  print_r($e);
  $a=print_r($e,true);
  error_log($a);
  exit;
}

$body = (string) $response->getBody();
$jbody = json_decode($body);
if (!$jbody) {
  error_log("no json");
  exit;
}
//print_r($jbody);
return $jbody;

}


//updates a discussion topic entry
//$course_id->course id, $topic_id->discussion topic id, $message->discussion message 
function updateDiscussionTopicEntry($course_id,$topic_id,$entry_id,$message){
 global $client;
try {
         $header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");

         //data to be updated
         $data=array('message'=>$message);

         $response = $client->request('put','courses/'.intval($course_id).'/discussion_topics/'.intval($topic_id).'/entries/'.intval($entry_id),['headers'=>$header,'form_params'=>$data]);
         //print_r($response);
} catch (Exception $e) {
          print "There was an error updating the discussion topic entry";
        header("content-type: text/plain",true);
        //print_r($e);
        $a=print_r($e,true);
        error_log($a);
        exit;
}

$body = (string) $response->getBody();
$jbody = json_decode($body);
if (!$jbody) {
  error_log("no json");
  exit;
}
return $jbody;

}


//deletes a discussion topic entry
//$course_id->course id, $topic_id->discussion topic id, $entry_id-> discussion entry id
function deleteDiscussionTopicEntry($course_id,$topic_id,$entry_id){

 global $client;
try {
         $header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");

         $response = $client->request('delete','courses/'.intval($course_id).'/discussion_topics/'.intval($topic_id).'/entries/'.intval($entry_id),['headers'=>$header]);
         //print_r($response);
} catch (Exception $e) {
          print "There was an error deleting the discussion topic";
        header("content-type: text/plain",true);
        //print_r($e);
        $a=print_r($e,true);
        error_log($a);
        exit;
}

$body = (string) $response->getBody();
//print_r($body);
$jbody = json_decode($body);
//print_r($jbody);
if (!$jbody) {
  error_log("no json");
  exit;
}
return $jbody;

}


//gets discussion entry replies
//$course_id->course id, $topic_id->discussion topic id, $entry_id-> discussion entry id
function getDiscussionEntryReplies($course_id,$topic_id,$entry_id){
        global $client;
  try {
  	$header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");
  $response = $client->request('get','courses/'.intval($course_id).'/discussion_topics/'.intval($topic_id).'/entries/'.intval($entry_id).'/replies',['headers'=>$header]);
//print_r($response);
} catch (Exception $e) {
  print "There was an error getting the discussion topic entry replies from canvas";
  header("content-type: application/json",true);
  print_r($e);
  $a=print_r($e,true);
  error_log($a);
  exit;
}
$body = (string) $response->getBody();
$jbody = json_decode($body);
if (!$jbody) {
  error_log("no json");
  exit;
}
//print_r($jbody);
return $jbody;

}


//creates a reply to  entry in discussion topic
//$course_id->course id, $topic_id->topic id, $entry_id->entry id, $message->reply message
function createDiscussionEntryReply($course_id,$topic_id,$entry_id,$message) {
 global $client;
try {
  $header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");

  $data=array('message'=>$message,'attachment'=>'');
  $response = $client->request('post','courses/'.intval($course_id).'/discussion_topics/'.intval($topic_id).'/entries/'.intval($entry_id).'/replies',['headers'=>$header,'form_params'=>$data]);
} catch (Exception $e) {
  print "There was an error creating new discussion entry reply";
  header("content-type: text/plain",true);
  print_r($e);
  $a=print_r($e,true);
  error_log($a);
  exit;
}
//print_r($response);
$body = (string) $response->getBody();
$jbody = json_decode($body);
if (!$jbody) {
  error_log("no json");
  exit;
}
return $jbody;
}



function rateDiscussionEntry($course_id,$topic_id,$entry_id,$rating) {
 global $client;
try {
  $header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");
 
  $data=array('rating'=>intval($rating));

  $response = $client->request('post','courses/'.intval($course_id).'/discussion_topics/'.intval($topic_id).'/entries/'.intval($entry_id).'/rating',['headers'=>$header,'form_params'=>json_encode($data)]);
} catch (Exception $e) {
  print "There was an error creating new discussion entry rating";
  header("content-type: text/plain",true);
  print_r($e);
  $a=print_r($e,true);
  error_log($a);
  exit;
}

$body = (string) $response->getBody();
$jbody = json_decode($body);
if (!$jbody) {
  error_log("no json");
  exit;
}
print_r($jbody);
return $jbody;
}





?>
