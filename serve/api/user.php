<?
  header('Content-Type: application/json');

  include ("../../classes/user.php");

  $json = file_get_contents('php://input');
  $p = json_decode($json, true);
  
  if ($p["action"]=="getAll") {
    $data = User::getAll($p["username"], $p["password"]);
    echo json_encode($data);
  }

  if ($p["action"]=="getUser") {
    $data = User::getUser($p["username"], $p["password"], $p["searchUser"]);
    echo json_encode($data);
  }


