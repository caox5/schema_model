<?php
//require "password.php";
require "canvasModel.php";
if(isset($_REQUEST['submit'])){
	if(isset($_POST['title'])){
		$title=$_POST['title'];
		$e=getTopicEntries($title);
		$t=getDiscussionTopic($title);
		$nodes=array();

echo "<pre>";
//print_r($e);
echo "</pre>";
		foreach($e as $entry){	
		//	array_push($nodes['user_name'],$entry->user_name);
			if (empty($nodes[$entry->user_name])){
				$nodes[$entry->user_name] = array();
				$nodes[$entry->user_name]['id']=$entry->user->id;
			       	$nodes[$entry->user_name]['image']=$entry->user->avatar_image_url;	
				$nodes[$entry->user_name]['messages']=array();
			}
			$message=array("message"=>$entry->message,"date"=>$entry->created_at, 'id'=>$entry->id,"link"=>$entry->parent_id);
			array_push($nodes[$entry->user_name]['messages'],$message);

		}
//print_r($nodes);

		foreach($entry->recent_replies as $reply){
			if (empty($nodes[$reply->user_name])){
				$nodes[$reply->user_name] = array();
				$nodes[$reply->user_name]['id']=$reply->user->id;
			       	$nodes[$reply->user_name]['image']=$reply->user->avatar_image_url;	
				$nodes[$reply->user_name]['messages']=array();
			}
			$message=array("message"=>$reply->message,"date"=>$reply->created_at,'id'=>$reply->id,"link"=>$reply->parent_id);
			array_push($nodes[$reply->user_name]['messages'],$message);
		}
		
		echo "<pre>";
		print_r($nodes);
		echo "</pre>";


	}
	}
//}

?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" charset="UTF-8">
<link rel="stylesheet" type="text/css" href="style1.css">
<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="https://code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script src="https://d3js.org/d3.v5.min.js"></script>
<script src='script.js'></script>

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
<h3>Select Discussion Board:</h3>  
     
<form action="ui.php" method="post">
<select name="title" class="title" size=<?php echo count($d)?>>
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

<div class="container-root" id="container-root">
	<div class="node">
	<?php echo "<input class='circle' type='image' id='".$t->id."-logo' onclick='toggleForm(".$t->id.")' src='".$t->author->avatar_image_url."'>"; ?>
<?php echo "<br>".$t->title;
?>
	
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
foreach($nodes as $key=>$node){ ?>
<div class="container">
	<div class="node">		
	<?php echo "<input class='circle' type='image' id='".$node['id']."-logo' onclick='toggleForm(".$node['id'].")' src='".$node['image']."'>";  ?>		
	<?php echo "<br>".$key;  ?>
</div>

<div class="show_form" id="<?php echo $node['id'];?>-content"> 
	<?php foreach($node['messages'] as $message){ ?>
	<form class="form-container-main" action="javascript:void(0);">    
	   <label for="post"><b><?php echo $key;?></b></label> 
	    <p><?php echo $message['message'];?></p>  
	    <button type="submit" class="btn" onclick="open_form(<?php echo $message['id'];?>)">Reply</button>
	    <button type="submit" class="btn" onclick="open_form(<?php echo $message['id'];?>)">Comment</button>
	    <button type="submit" class="btn" onclick="open_form(<?php echo $message['id'];?>)">Solution</button>
	    <button type="submit" class="btn" onclick="open_form(<?php echo $message['id'];?>)">Discussion</button>
	</form><br>
<div class="open_form" id='<?php echo $message['id']; ?>-form'>
    <form action="#" class="form-container-post" id="<?php echo $message['id'];?>-post">
    	<label for="psw"><b>Enter Post</b></label><br>
    	<input type="text" placeholder="Enter Post" name="post" required>
    	<button type="submit" class="btn" onclick="enterPost()">Post</button>
    	<button type="submit" class="btn cancel" onclick="toggleForm(<?php echo $message['id'];?>)">Cancel</button>
    </form>
</div>
	<?php } ?>
</div>
</div>
<?php }  ?>



</div>
</body>
</html>
