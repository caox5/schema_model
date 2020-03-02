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
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
<head>
<link rel="stylesheet" type="text/css" href="style1.css">
<script type="text/javascript" language="javascript">
    var titles = new Array();
    <?php 
        $d=getDiscussions();
        foreach($d as $val){ ?>
        titles.push('<?php echo $val->title; ?>');
    <?php } ?>
</script>			
<title>Canvas Discussions</title>
<link rel="stylesheet" href="style1.css">
</head>
<body>
<div>

<h1>Select Discussion Board:</h1>  
     
<form action="ui.php" method="post">	
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
	
		//echo "Posts: <br><br>";
		foreach($e as $entry){ ?>
		<div class='card'> 
		<div class='circle'>
		<?php
		echo "<img src='".$entry->user->avatar_image_url."'>"; ?>
			</div><div class='container'> 
			<?php
			echo "<br>".$entry->user_name;
		echo "<br>".$entry->message;
?>
		</div></div>
<?php
			//echo "<br><h4>Replies:</h4><br>";
		}
?>
		<?php	
		foreach($entry->recent_replies as $r){ ?>
			<div class='card'>
			<div class='circle'>
			<?php
				echo "<img src='".$r->user->avatar_image_url."'>"; ?>
				</div><div class='container'>
				<?php 
		 		echo "<br>".$r->user_name;
		echo "<br>".$r->message; ?>
		</div></div>
			<?php
			} ?>
		


</div>
</body>
</html>
