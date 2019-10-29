<?php
require_once 'view/view.php';
require_once 'model/model.php';
require_once 'controller/dataCtrl.php';

	/*------------------------------
	--      PAGE CONTROLLER      --
	------------------------------*/
class PageCtrl {
	
	function __construct($url)
	{
		$this->url = $url;
		$this->dataCtrl = new DataCtrl();
		$this->view = new View();
	}

	/*------------------------------
	--  GET PAGE TODO=FUNCTION    --
	------------------------------*/
	public function getPage() {
			$todo = $this->url[0];                                  //.com/$todo
    		if ($todo == "") $todo = "home";                        //if there's no function go homepage
    		if ( !method_exists ( $this, $todo ) ) $todo = "home";  //if the function doesnt exists go homepage
    		return $this->$todo();
	}

	/*------------------------------
	--         HOME PAGE          --
	------------------------------*/
	private function home() {
		global $safePost;
		$footer = file_get_contents("template/footer.html");
		$intro = file_get_contents("template/intro.html");;
		$loginLogoutTemp = "";
		$nickname = "";
		$scoreForm = "";
		$message = "";
		$auth = "";

		// if there's a session
		if(isset($_SESSION['nickname'])){
			//if it's a player
			$loginLogoutTemp = file_get_contents("template/welcome.html");
			$nickname = $_SESSION['nickname'];
			$scoreForm = file_get_contents("template/scoreForm.html");
			$intro = "";
			// if it's an admin
			if($_SESSION['type'] == '0'){
				$loginLogoutTemp = file_get_contents("template/welcomeAdmin.html");
			}
		}
		// if there is a score you can publish
		if($safePost['score'] !== null){
			$this->dataCtrl->publishScores();
			$message = '<p style="color: green; padding-bottom: 20px;">The score has been saved</p>';
		}
		// if there's no session you can't publish score
		if(!isset($_SESSION['nickname'])){
		    $loginLogoutTemp = file_get_contents("template/loginForm.html");
		    $scoreForm = file_get_contents("template/scoreDisabled.html");
		}

		// login
		if ($safePost["loginNickname"] !== null && $safePost["loginPassword"] !== null){
			$login = new Model;
			$login->loginAccount();
			// if it fails to connect cause there is no login password matching in db
			if($login->loginAccount() == null){
				$auth = '<p style="color: red; padding-bottom: 20px;">Your informations are not correct</p>';
			}
		}
		// template
		return $this->view->mergeWithTemplate([
			"{{ loginLogout }}" => $loginLogoutTemp,
			"{{ scoreForm }}" => $scoreForm,
			"{{ nickname }}" => $nickname,
			"{{ message }}" => $message,
			"{{ auth }}" => $auth,
			"{{ footer }}" => $footer,
			"{{ intro }}" => $intro
		], "home");
	}

	/*------------------------------
	--     BEST SCORES PAGE       --
	------------------------------*/
	private function scores() {
		global $safePost;
		$footer = file_get_contents("template/footer.html");
		$nickname = "";
		$auth = "";
		// if there's a session
		if(isset($_SESSION['nickname'])){
			//if it's a player
			$loginLogoutTemp = file_get_contents("template/welcome.html");
			$nickname = $_SESSION['nickname'];
			$scoreForm = file_get_contents("template/scoreForm.html");
			// if it's an admin
			if($_SESSION['type'] == '0'){
				$loginLogoutTemp = file_get_contents("template/welcomeAdmin.html");
			}
		}
		// if there's no session
		if(!isset($_SESSION['nickname'])){
		    $loginLogoutTemp = file_get_contents("template/loginForm.html");
		    $scoreForm = file_get_contents("template/scoreDisabled.html");
		}
		//login
		if ($safePost["loginNickname"] !== null && $safePost["loginPassword"] !== null){
			$login = new Model;
			$login->loginAccount();
			if($login->loginAccount() == null){
				$auth = '<p style="color: red; padding-bottom: 20px;">Your informations are not correct</p>';
			}
		}
		// template
		return $this->view->mergeWithTemplate([
			"{{ loginLogout }}" => $loginLogoutTemp,
			"{{ scores }}" => $this->dataCtrl->scoresList(),
			"{{ nickname }}" => $nickname,
			"{{ auth }}" => $auth,
			"{{ footer }}" => $footer
		], "scores");
	}

	/*------------------------------
	--     YOUR SCORES PAGE       --
	------------------------------*/
	private function yourScores() {
		if(!$_SESSION["nickname"]) header("location: home");
		$footer = file_get_contents("template/footer.html");
		$loginLogoutTemp = file_get_contents("template/welcome.html");
		$nickname = $_SESSION['nickname'];
		return $this->view->mergeWithTemplate([
			"{{ loginLogout }}" => $loginLogoutTemp,
			"{{ scores }}" => $this->dataCtrl->yourScoresList(),
			"{{ nickname }}" => $nickname,
			"{{ footer }}" => $footer
		], "yourScores");
	}

	/*------------------------------
	--      ALL SCORES PAGE       --
	------------------------------*/
	private function allScores() {
		global $safePost;
		$footer = file_get_contents("template/footer.html");
		$message = "";
		// if there's no admin or session
		if($_SESSION["type"] !== '0'){
			header("location: home");
		}
		// if it's an admin session
		if($_SESSION["type"] === '0'){
			$loginLogoutTemp = file_get_contents("template/welcomeAdmin.html");
			$nickname = $_SESSION['nickname'];
			$id = $safePost['id'];
			//delete score
			if($id !== null){
				$this->dataCtrl->deleteOneScore($id);
				$message = file_get_contents("template/deletedScore.html");
			}

			return $this->view->mergeWithTemplate([
				"{{ loginLogout }}" => $loginLogoutTemp,
				"{{ scores }}" => $this->dataCtrl->allScoresList(),
				"{{ nickname }}" => $nickname,
				"{{ message }}" => $message,
				"{{ footer }}" => $footer
			], "allScores");
		}
		
	}

	/*------------------------------
	--     ALL ACCOUNTS PAGE      --
	------------------------------*/
	private function allAccounts() {
		global $safePost;
		$footer = file_get_contents("template/footer.html");
		$message = "";
		// if there's no admin or session
		if($_SESSION["type"] !== '0'){
			header("location: home");
		}
		// if it's an admin session
		if($_SESSION["type"] === '0'){
			$loginLogoutTemp = file_get_contents("template/welcomeAdmin.html");
			$nickname = $_SESSION['nickname'];
			$id = $safePost['id'];
			//delete account
			if($id !== null){
				$this->dataCtrl->deleteOneAccount($id);
				$message = file_get_contents("template/accountDeleted.html");
			}
		}
		//template
		return $this->view->mergeWithTemplate([
				"{{ loginLogout }}" => $loginLogoutTemp,
				"{{ accounts }}" => $this->dataCtrl->allAccountsList(),
				"{{ message }}" => $message,
				"{{ footer }}" => $footer
			], "allAccounts");
	}
		
	

	/*------------------------------
	--        SIGN UP PAGE        --
	------------------------------*/
	private function signUp() {
		global $safePost;
		$footer = file_get_contents("template/footer.html");
		$message = "";
		//login
		if ($safePost["loginNickname"] !== null && $safePost["loginPassword"] !== null){
			$login = new Model;
			$login->loginAccount();
		}
		//if the form is not null
		if ($safePost["signInNickname"] !== null && $safePost["signInEmail"] !== null && $safePost["signInPassword"] !== null && $safePost["signInPassword2"] !== null){
				$signIn = new Model;
				$signIn->signInAccount();
				$message = file_get_contents("template/signInOk.html");
			}
		
		//template
		return $this->view->mergeWithTemplate([
			"{{ message }}" => $message,
			"{{ footer }}" => $footer
		], "signUp");
	}

	/*------------------------------
	--           LOGOUT           --
	------------------------------*/
	private function logout() {
		if (isset($_SESSION['nickname'])){
			$_SESSION = array();
			session_destroy();
			setcookie('nickname', '');
        	setcookie('password', '');
        	header('Location: home');
		}
	}

}