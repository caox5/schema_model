<?php
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

function getDiscussions() {
  global $client;
  try {
	
  $header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");

  $response = $client->request('get','courses/119626/discussion_topics/',['headers'=>$header]);
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

function createDiscussion($title,$message){
//	$p=checkDiscussion($title);

//	if( isset($p))
//		return $p;

 	global $client;
try {
 	 $header = array("Authorization"=>"Bearer 1053~fxYAgG5UpmgrQsewTrOiJPlzprK1ElHCmCiwmhu8CW2Sz8FXS6kZ2lll32S1w58S");

	$data=array(['title'=>$title,'message'=>$message]);

  	$response = $client->request('post','courses/119626/discussion_topics/',['headers'=>$header,'form_params'=>$data]);
} catch (Exception $e) {
	  print "There was an error creating the discussion topic";
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
return $jbody;


}


function checkDiscussion($title){
$discussion=getDiscussions();
foreach($discussion as $d){
	if($d->title==$title)
	return $d;
}
return;
}




?>
