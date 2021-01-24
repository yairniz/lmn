<? include ("../classes/message.php") ?>
<html>
  <? include ("../includes/header.php") ?>
 <body>
   <script>
    Common.addCss("css/form.css");
   </script>
   <div class="full-flex">
      <form class="main-box" action="login.php" id="loginForm" method="get">
        <div class="message"><?=Message::loginMessage()?></div>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <input type="submit" class="submit" value="Submit" />
      </form>
    </div>
 </body>
</html>