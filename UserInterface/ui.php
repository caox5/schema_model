<?php
//require "password.php";
require "canvasModel.php";
if(isset($_REQUEST['submit'])){
	if(isset($_POST['title'])){
		$title=$_POST['title'];
		$e=getTopicEntries($title);
		$t=getDiscussionTopic($title);
	}
}

?>

<!DOCTYPE html>
<html lang="en">
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
<head>
<link rel="stylesheet" type="text/css" href="style1.css">
<script src="http://code.jquery.com/jquery-1.10.2.js"></script>
<script src="http://code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script src='script1'></script>
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
</form><div class="node">
<?php  		
		//echo "Posts: <br><br>";
		//$t=getDiscussionTopic($title); 
    // print_r($t);	
	//echo "<br>".$t->title."<br>";
	echo "<input class='circle' type='image' id='".$t->id."-logo' onclick='toggleForm(".$t->id.")' src='".$t->author->avatar_image_url."'>";
?>	
	</div><div class="show_form" id="<?php echo $t->id;?>-content">
<?php	
	//echo "<br>".$t->title;
	//echo "<br>".$t->message;

?>

<form action="/action_page.php" class="form-container">

    <label for="post"><b><?php echo $t->title;?></b></label> 
	<p><?php echo $t->message;?></p>  
    <button type="submit" class="btn">Reply</button>
    <button type="submit" class="btn">Comment</button>
    <button type="submit" class="btn">Solution</button>
    <button type="submit" class="btn">Discussion</button><br>
   <label for="psw"><b>Enter Post</b></label><br>
    <input type="text" placeholder="Enter Post" name="post" required>
    <button type="submit" class="btn" onclick="enterPost()">Post</button>
    <button type="submit" class="btn cancel" onclick="closeForm()">Cancel</button>
  </form>

</div><div class="node">
<?php		
		foreach($e as $entry){ 
		echo "<input class='circle' id='".$entry->id."-logo' type='image'  onclick='toggleForm(".$entry->id.")' src='".$entry->user->avatar_image_url."'>"; ?>
		</div><div class="show_form" id="<?php echo $entry->id;?>-content"> 
			<?php
		//	echo "<br>".$entry->user_name;
	//	echo "<br>".$entry->message;
?>

<form action="/action_page.php" class="form-container">

    <label for="post"><b><?php echo $entry->user_name;?></b></label> 
	<p><?php echo $entry->message;?></p>  
    <button type="submit" class="btn">Reply</button>
    <button type="submit" class="btn">Comment</button>
    <button type="submit" class="btn">Solution</button>
    <button type="submit" class="btn">Discussion</button><br>
   <label for="psw"><b>Enter Post</b></label><br>
    <input type="text" placeholder="Enter Post" name="post" required>
    <button type="submit" class="btn" onclick="enterPost()">Post</button>
    <button type="submit" class="btn cancel" onclick="closeForm()">Cancel</button>
  </form>
		</div>
<?php
			//echo "<br><h4>Replies:</h4><br>";
		}
?>
		<?php	
		foreach($entry->recent_replies as $r){ ?>
			<div class='node'>
		<!--	<div class='circle'>   -->
			<?php
				echo "<input class='circle' type='image' id='".$entry->id."-logo' onclick='toggleForm(".$r->id.")' src='".$r->user->avatar_image_url."'>"; ?>
			</div><div class='show_form' id="<?php echo $r->id;?>-content">
				<?php 
		 	//	echo "<br>".$r->user_name;
	//	echo "<br>".$r->message; ?>

<form action="/action_page.php" class="form-container">

    <label for="post"><b><?php echo $r->user_name;?></b></label> 
   <p> <?php echo $r->message;?></p>	
    <button type="submit" class="btn">Reply</button>
    <button type="submit" class="btn">Comment</button>
    <button type="submit" class="btn">Solution</button>
    <button type="submit" class="btn">Discussion</button><br>
   <label for="psw"><b>Enter Post</b></label><br>
    <input type="text" placeholder="Enter Post" name="post" required>
    <button type="submit" class="btn" onclick="enterPost()">Post</button>
    <button type="submit" class="btn cancel" onclick="closeForm()">Cancel</button>
  </form>
		</div>
			<?php
			} ?>
		


</div>
</body>
</html>
