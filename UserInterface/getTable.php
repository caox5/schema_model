<?php
/*
Hemraj Ojha
CSE 551
Spring 2019
Week 3A- Assigment making REST calls
February 18, 2019
*/
require_once("password.php");

$mysqli = mysqli_connect("localhost:3306", $user,$pass,"discussion_board");
if (mysqli_connect_errno($mysqli)) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
        die;
}

function getCities() {
        global $mysqli;
        $sql = "select city from temperature";
        $res = $mysqli->query($sql);
        if (!$res) {
                error_log("Error on getCities" . $mysqli->error);
                return null;
        }

        $cities = array();
        while( $row = mysqli_fetch_assoc($res)) {
                array_push($cities,$row['city']);
        }
        return $cities;
}

function getData($c) {
        global $mysqli;
        $stmt = $mysqli->prepare("select time,temp from temperature where city=?");
        if (!$stmt) {
                error_log("Error on getData" . $mysqli->error);
                return null;
        }

        $stmt->bind_param("s",$c); //stc -> check for errors
        $stmt->execute();
        $stmt->bind_result($time, $temp);
        $stmt->fetch();

        return array($time, $temp);
}

function updateTemp($id, $c, $t, $temp) {
        global $mysqli;
        // Updating the time in case the city is already there
        $data = getData($c);
        if (empty($data)) {
                return "error";
        }
        $sql =  $mysqli->prepare("UPDATE temperature SET time=?,temp=? WHERE pk=?");
        if (!$sql) {
                error_log("error in updateTemp".$mysqli->error);
                return "error";
        }
        $sql->bind_param("idi", $t, $temp, $id);
        $sql->execute();
        return "OK";
}

function addTable($c,$t,$temp) {
        global $mysqli;
        $stmt = $mysqli->prepare("insert into temperature (city,time,temp) values (?,?,?)");
        if (!$stmt) {
                error_log("error on addTable " . $mysqli->error);
                return "error";
        }
        $stmt->bind_param("sid",$c, $t, $temp);
        $stmt->execute();
        return "OK";
}

function timeCheck($c, $currentTime) {
        $data = getData($c);
        if ($currentTime - $data[0] > 3600) {
                return false;
        }
        return true;
}
?>

