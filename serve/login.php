<?
  include ("../classes/user.php");

  $username = $_GET["username"];
  $password = $_GET["password"];

  if (!User::login($username, $password)) {
    header('Location: /?loginError=1'); 
  }
?>
<html>
  <? include ("../includes/header.php") ?>
 <body>
  <script type="module" src="js/userList.js"></script>
  <script>
    Common.addCss("css/loggedInBox.css");
   </script>
  <div class="full-flex">
    <div class="main-box">
      <h1>Welcome <?=$username?></h1>
      <ul is="user-list" class="user-list"></ul>
    </div>
  </div>
</body>
</html>