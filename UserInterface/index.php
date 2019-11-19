<?php
//require "password.php";
require "canvasModel.php";
if(isset($_REQUEST['submit'])){
if(isset($_POST['title'])&&isset($_POST['message'])){
$title=$_POST['title'];
$message=$_POST['message'];
if (empty($title) || empty($message)) {
        	$msg = "  * Field is required";
    	} else {
//if (empty($title) || empty($message)) {
      //  	$msg = "  * Data is required";
    //	} else {
//echo $title." ".$message;
		createDiscussion($title,$message);
		$msg="";
}
}
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
			
<title>Canvas Discussions</title>
	
</head>
<body>
<div class="display">


<h1>Discussion topics:</h1>  
 
<?php
//$iid=752581;
//$d=getTopicEntries($id);
$ids=array();
$d=getDiscussions(); 
foreach($d as $i){
	echo "<h2>".$i->title."</h2>";
	//array_push($ids,$i->id);
	//foreach($ids as $value){
        $e=getTopicEntries($i->id);
        if(empty($e))
                continue;
        else{
        foreach($e as $entry){
		echo "<h4>".$entry->message."</h4>";
			foreach($entry->recent_replies as $r){
				echo "<h6>".$r->message."</h6>";	
		// echo "<h6>".$entry->recent_replies[0]->message."</h6>";
	}
        }
        }
}
//}
//$id=752581;
//print_r(getTopicEntries($id));
	//echo $i->id;
//	foreach($a as $n){
//		echo "<h3>".$n."</h2>";
//	}
	//foreach($topics as $ts){
	//	echo "<h2>".$ts->id."</h2>";
	//}
			//echo "<h2>".$i->title."</h2>";
			//echo "<p>Post: ".$i->message."</p>"; 
			//echo "<p>Created at: ".$i->created_at."</p>";
			//echo "<p>Student ID: ".$i->author->id."</p>"; 
			//echo "<p>Posted By: ".$i->author->display_name."</p>";
			//echo "<img src='".$i->author->avatar_image_url."'>";	
			//echo "<p>Student Profile: <a href='".$i->author->html_url."'>".$author->display_name."</a>";
//		}
//print_r($ids[1]);
//$id= intval($ids[0]);
//echo $id;
//foreach($ids as $values){
//	$entries=getTopicEntries($values);
//	echo $entries;
//for ($i = 0; $i < count($ids); $i++) {
//	echo "<h2>".$ids[$i]."</h2>";
	
//}
//$arr should be array as you mentioned as below
//foreach($ids as $value){
//	$e=getTopicEntries($value);
//	if(empty($e))
//		continue;
//	else{
//	foreach($e as $entry){
//		echo "<h4>".$entry->message."</h4>";
//	}
//	}
//}
//print_r(getTopicEntries($ids[1]));
//print_r($a);

?>


<h3>Create New Discussion Topic and Message:</h3>
    
<form action="index.php" method="post">
	<input type="text" name="title">
	<input type="text" name="message">
	<input type="submit" value="submit" name="submit">
<span id = "errTextInput" class = "error"> <?php echo $msg;?></span><br><br>
</form>




</div>
</body>
</html>

