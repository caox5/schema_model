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
<ul> 
<?php 

$d=getDiscussions(); 
		foreach($d as $i){
			echo "<li>".$i->title."</li>";	
		}
		
?>
</ul>

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

