<?php

/*this file create the database and tables and create some basic data.

Run this first

*/

ini_set('register_argc_argv', 0);  

if (!isset($argc) || is_null($argc))
{ 
    echo 'Not CLI mode';
	die;
}


//create database -connect directly to mysql

require_once("password.php");
$mysqli = mysqli_connect("localhost:3306", $user,$pass,"discussion_board");
if (mysqli_connect_errno($mysqli)) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
	die;
}

print "connected\n";
print "droping db\n";
$r = $mysqli->query("drop database if exists " . $db);
print_r($r);
print $mysqli->error;
$mysqli->query("create database " . $db);
print $mysqli->error;
$mysqli->close();

//require_once("getTable.php");
function createTempTable() {
        global $mysqli;
        $mysqli->query("drop table if exists temperature");
        //print "hereeeeee-e-e-e-e-e-e-e-e-";
        print $mysqli->error;
        print "creating db\n";
        $r = $mysqli->query("CREATE TABLE `temperature` (
        `pk` int(11) NOT NULL AUTO_INCREMENT,
        `city` text NOT NULL,
        `time` bigint NOT NULL,
        `temp` double NOT NULL,
        PRIMARY KEY (`pk`)
        )");
        print_r($r);
        print $mysqli->error;
        print_r(addTable("Oxford",1550456706,30.5));  
        print_r(addTable("California",1550456706,20.1));
        print_r(addTable("Texas",1550456706,2.12));
        print_r(addTable("Cincinnati",1550456706,10.4));
        print_r(addTable("LasVegas",1550456706,9.32));
        print "\n\ngetData - should return 2 cities\n";
        print_r(getCities());
        print ("\n\nget test1 - should return 'Oxford, NewYork'\n");
        print_r(getData("Chicago"));
        print ("\n\nget invalid - should return null, nothing\n");
        print_r(getData("Oxford"));
        print "\n- should return: [1550456706, 30.5]";
        print_r(updateTemp(1, "Oxford",1550527819,39.9));
        print_r(getData("Oxford"));
        print "\n- should return [1550527819, 39.9]";
        print "----> checking: ".timeCheck("Oxford",  1550531420);
}
createTempTable();
?>

