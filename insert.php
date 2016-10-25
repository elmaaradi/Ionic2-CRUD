<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8-turkish-ci");
try {
     $db = new PDO("mysql:host=localhost;dbname=havsorgs_dagitim", "havsorgs_dagit", "hi1b?BlMis9V");
} catch ( PDOException $e ){
     print $e->getMessage();
}

//http://stackoverflow.com/questions/18382740/cors-not-working-php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}


    $postdata = file_get_contents("php://input");
    if (isset($postdata)) {
        $request = json_decode($postdata);
        $title = $request->title;
        $desc = $request->description;
        $insert= "insert into testingdata (title, description) values ('$title', '$desc')";
        $qr = $conn->query($insert);
        if($qr){
            $results = array(
		   'message' => 'success'
		);
		echo json_encode($results);
        }
    }else {
         echo "No Parameter Available";
    }

    /////////////////////////////////////////////////

        $query = $db->prepare("INSERT INTO uyeler SET
        uye_kadi = ?,
        uye_sifre = ?,
        uye_eposta = ?");
        $insert = $query->execute(array(
            "Tayfun Erbilen", "123456", "tayfunerbilen@gmail.com"
        ));
        if ( $insert ){
            $last_id = $db->lastInsertId();
            print "insert işlemi başarılı!";
        }

        ///////////////////////////////////////////////////

        #INSERT DATA
        //inserting some some data
        $sqlInsert = 'INSERT INTO `testingdata` (`title`, `description`) 
        VALUES (:name1,:job1),
            (:name2,:job3), 
            (:name3,:job3);';
        $preparedStatement = $conn->prepare($sqlInsert);
        $preparedStatement->execute(array(':name1' => 'Tony', ':job1' => 'gardner', ':name2' => 'Dony', ':job2' => 'carpenter', ':name3' => 'Carl', ':job3' => 'policeman'));

?>