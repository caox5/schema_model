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
<div class='list' id='list'>
<h1>Select Discussion Board:</h1>  
     
<form action="ui.php" method="post">	
<select name="title">
<script type="text/javascript">
      for (i=0,len=titles.length;i<len;i++) {
              document.write("<option value='" + titles[i] + "'>" + titles[i] + "</option>");
      }
</script>
</select> 
<button type="submit" class="submit" name="submit">Submit</button>
<span id = "errTextInput" class = "error"> <?php echo $msg;?></span><br><br>
</form>
</div>

<div class="container">
	<div class="node">
	<?php echo "<input class='circle' type='image' id='".$t->id."-logo' onclick='toggleForm(".$t->id.")' src='".$t->author->avatar_image_url."'>";
 	echo "<br>".$t->user_name; ?>
	
</div>
<div class="show_form" id="<?php echo $t->id;?>-content">
<form class="form-container-main" action="javascript:void(0);">
    <label for="post"><b><?php echo $t->user_name;?></b></label> 
    <p><?php echo $t->message;?></p>  
    <button class="btn" onclick="open_form(<?php echo $t->id;?>)">Reply</button>
    <button class="btn" onclick="open_form(<?php echo $t->id;?>)">Comment</button>
    <button class="btn" onclick="open_form(<?php echo $t->id;?>)">Solution</button>
    <button class="btn" onclick="open_form(<?php echo $t->id;?>)">Discussion</button>
</form><br>
<div class="open_form" id='<?php echo $t->id; ?>-form'>
    <form action="#" class="form-container-post" id="<?php echo $t->id;?>-post">
    	<label for="psw"><b>Enter Post</b></label><br>
    	<input type="text" placeholder="Enter Post" name="post" required>
    	<button type="submit" class="btn" onclick="enterPost()">Post</button>
    	<button type="submit" class="btn cancel" onclick="toggleForm(<?php echo $t->id;?>)">Cancel</button>
    </form>
</div>
</div>
</div>

<?php		
foreach($e as $entry){ ?>
<div class="container">
	<div class="node">		
	<?php echo "<input class='circle' type='image' id='".$entry->id."-logo' onclick='toggleForm(".$entry->id.")' src='".$entry->user->avatar_image_url."'>";  ?>		
	<?php echo "<br>".$entry->user_name;?>
</div>
<div class="show_form" id="<?php echo $entry->id;?>-content"> 
<form class="form-container-main" action="javascript:void(0);">    
   <label for="post"><b><?php echo $entry->user_name;?></b></label> 
    <p><?php echo $entry->message;?></p>  
    <button type="submit" class="btn" onclick="open_form(<?php echo $entry->id;?>)">Reply</button>
    <button type="submit" class="btn" onclick="open_form(<?php echo $entry->id;?>)">Comment</button>
    <button type="submit" class="btn" onclick="open_form(<?php echo $entry->id;?>)">Solution</button>
    <button type="submit" class="btn" onclick="open_form(<?php echo $entry->id;?>)">Discussion</button>
</form><br>
<div class="open_form" id='<?php echo $entry->id; ?>-form'>
    <form action="#" class="form-container-post" id="<?php echo $entry->id;?>-post">
    	<label for="psw"><b>Enter Post</b></label><br>
    	<input type="text" placeholder="Enter Post" name="post" required>
    	<button type="submit" class="btn" onclick="enterPost()">Post</button>
    	<button type="submit" class="btn cancel" onclick="toggleForm(<?php echo $entry->id;?>)">Cancel</button>
    </form>
</div>
</div>
</div>
<?php }  ?>


<?php	
foreach($entry->recent_replies as $r){ ?>
<div class="container">
	<div class="node">        
	<?php echo "<input class='circle' type='image' id='".$r->id."-logo' onclick='toggleForm(".$r->id.")' src='".$r->user->avatar_image_url."'>"; ?> 	
	<?php echo "<br>".$r->user_name;?>
</div>
<div class="show_form" id="<?php echo $r->id;?>-content">
<form class="form-container-main" action="javascript:void(0);">
    <label for="post"><b><?php echo $r->user_name;?></b></label> 
    <p><?php echo $r->message;?></p>	
    <button type="submit" class="btn" onclick="open_form(<?php echo $r->id;?>)">Reply</button>
    <button type="submit" class="btn" onclick="open_form(<?php echo $r->id;?>)">Comment</button>
    <button type="submit" class="btn" onclick="open_form(<?php echo $r->id;?>)">Solution</button>
    <button type="submit" class="btn" onclick="open_form(<?php echo $r->id;?>)">Discussion</button>
</form><br>
<div class="open_form" id='<?php echo $r->id; ?>-form'>
    <form action="#" class="form-container-post" id="<?php echo $r->id;?>-post">
    	<label for="psw"><b>Enter Post</b></label><br>
    	<input type="text" placeholder="Enter Post" name="post" required>
    	<button type="submit" class="btn" onclick="">Post</button>
    	<button type="submit" class="btn cancel" onclick="toggleForm(<?php echo $r->id;?>)">Cancel</button>
  </form>
  </div>
</div>	
</div>		
<?php	} ?>
	


</div>
</body>
</html>
