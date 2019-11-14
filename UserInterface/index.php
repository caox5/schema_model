<?php

//require "password.php";
require "canvasModel.php";

if(isset($_POST['title'])&&isset($_POST['message'])){

$title=$_POST['title'];
$message=$_POST['message'];
createDiscussion($title,$message);
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
		<?php $d=getDiscussions(); 
		foreach($d as $i){
			print "<li>".$i->title."</li>";	
		}
		
?>

    
<form action="index.php" method="post">
	<input type="text" name="title">
	<input type="text" name="message">
	<input type="submit" value="Add Title">
</form>




</div>
<footer style=bottom:0;position:absolute><p>Hemraj Ojha, Master's Thesis </p></footer>
</body>
</html>

