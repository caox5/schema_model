<?php

//require "password.php";
require "canvasModel.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
			
<title>Canvas Discussions</title>
	
</head>
<body>
<div class="display">


	<h1>Discussion topics:</h1>   
		<?php $d=getDiscussionTopics(); 
		foreach($d as $i){
			print "<li>".$i->title."</li>";	
		}
		
?>

    
 <!-- Prompting Messages-->  
    <?php if ($msg != ""):?>  
      <div id = "addmsg" class = "alert alert-info"><?php print $msg;?></div>
    <?php endif;?>



</div>
<footer style=bottom:0;position:absolute><p>Hemraj Ojha, Master's Thesis </p></footer>
</body>
</html>

