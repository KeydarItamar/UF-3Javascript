<?php
if(isset($_POST["district"]) && !empty($_POST["district"])){
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "practica6";

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $district = $_POST["district"];

    $sqlid = "SELECT `id` FROM districtes WHERE `name` = '$district'";
    $result_id = $conn->query($sqlid);

    if ($result_id->num_rows > 0) {
        $row_id = $result_id->fetch_assoc();
        $district_id = $row_id["id"];

        $sql = "SELECT * FROM barris WHERE id_districte = $district_id ORDER BY `name` ASC";
        $result = $conn->query($sql);

        $barris = array();

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $barris[] = $row;
            }
            echo json_encode($barris);
        } else {
            echo "0 results";
        }
    } else {
        echo "District ID not found";
    }

    $conn->close();
}
?>
