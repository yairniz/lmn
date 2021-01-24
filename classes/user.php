<?
function getBaseDir() {
  $s = "/";
  $dir = explode($s, getcwd());

  if (end($dir) == "api") {
    return implode(array_slice($dir, 0, -1),$s);
  } else {
    return implode($dir, $s);
  }
}

class User {
  const SECRET = "not a secret";
  const USERS_CRED = "/../data/users.json";
  const USERS_STATUS = "/../data/loggedin.json";

  public static function usersIfApproved($username, $password) {
    $users = json_decode(file_get_contents(getBaseDir().self::USERS_CRED), true);
    if ($users[$username] && $users[$username]["p"] == md5(self::SECRET.$password)) {
      $loggedin = json_decode(file_get_contents(getBaseDir().self::USERS_STATUS), true);
      return $loggedin;
    }
  }

  public static function login($username, $password) {
    if ($users = self::usersIfApproved($username, $password)) {
      $users[$username]["ip"] = $_SERVER["REMOTE_ADDR"];
      $users[$username]["ua"] = $_SERVER["HTTP_USER_AGENT"];
      $users[$username]["lt"] = date("d/m/Y h:i:sa");
      $users[$username]["sl"] = intval($users[$username]["sl"]) + 1;
      file_put_contents(getBaseDir().self::USERS_STATUS, json_encode($users));
      return true;
    } else {
      return false;
    }
  }

  public static function getAll($username, $password) {
    if ($users = self::usersIfApproved($username, $password)) {
      $func = function($value) {
        return [ 
          'lt' => $value['lt'],
          'ip' => $value['ip'],
        ];
      };
      return array_map($func, $users);
    }
  }

  public static function getUser($username, $password, $searchUser) {
    if ($users = self::usersIfApproved($username, $password)) {
      return $users[$searchUser];
    }
  }
}