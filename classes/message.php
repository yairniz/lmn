<?
class Message {
  const LOGIN = "Please enter username and password";
  const LOGIN_FAILED = "Username/Password is wrong";

  public static function loginMessage() {
    if ($_GET["loginError"] == "1") {
      return self::LOGIN_FAILED;
    } else {
      return self::LOGIN;
    }
  }
}
