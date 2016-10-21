<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$conn = new mysqli("localhost", "textkhmernews", "Excellent0", "khmernews");
    $data= array();
    $select = "select * from testingdata";
    $qr = $conn->query($select);
    while($row = $qr->fetch_assoc()){
        $data[]=$row;
    }
echo json_encode($data);
?>