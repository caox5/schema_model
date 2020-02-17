<?php
//require "password.php";
require "canvasModel.php";
if(isset($_REQUEST['submit'])){
	if(isset($_POST['title'])){
		$title=$_POST['title'];
		$e=getTopicEntries($title);
	}
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
<script type="text/javascript" language="javascript">
    var titles = new Array();
    <?php 
        $d=getDiscussions();
        foreach($d as $val){ ?>
        titles.push('<?php echo $val->title; ?>');
    <?php } ?>
</script>			
<title>Canvas Discussions</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<div>

<h1>Select Discussion Board:</h1>  
     
<form action="index.php" method="post">	
<select name="title">
<script type="text/javascript">
      for (i=0,len=titles.length;i<len;i++) {
              document.write("<option value='" + titles[i] + "'>" + titles[i] + "</option>");
      }
</script>
</select> 
<input type="submit" value="submit" name="submit">
<span id = "errTextInput" class = "error"> <?php echo $msg;?></span><br><br>
</form>
<?php  
	
		echo "Posts: <br><br>";
		foreach($e as $entry){

		echo "<br><br><img src='".$entry->user->avatar_image_url."'>";
		echo "<br>".$entry->user_name;
		echo $entry->message;
		echo "<br>Replies:<br><br>";
		foreach($entry->recent_replies as $r){
				echo "<img src='".$r->user->avatar_image_url."'>";
				echo "<br>".$r->user_name;
				echo $r->message;

		}

      
        }
      


?>

</div>
</body>
</html>
