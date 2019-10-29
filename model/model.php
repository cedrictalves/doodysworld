<?php
	/*------------------------------
	--            MODEL           --
	------------------------------*/
class Model{

	protected $db;
	
	/*------------------------------
	--        CONNECT DB          --
	------------------------------*/
	public function __construct()
	{
		try{
			$this->db = new PDO('mysql:host=localhost;dbname=doodysworld;charset=utf8','root','');
    		$this->db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    		$this->db -> setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
		}
		catch (Exception $e) { 
			die('Error : ' . $e->getMessage() . "\n");
		}
		
	}

	/*------------------------------
	--        GET SCORES          --
	------------------------------*/
	public function getScores(){
		$sql = 'SELECT nickname, score FROM scores ORDER BY score ASC LIMIT 50';
		$data = $this->db->query($sql);
		return $data->fetchAll();
	}

	/*------------------------------
	--      PUBLISH SCORE         --
	------------------------------*/
	public function publishScore(){
		global $safePost;
		if ($safePost['score'] !== null){
			$sql = 'INSERT INTO scores (nickname, score) VALUES (:nickname, :score)';
			$data = $this->db->prepare($sql);
			$data->execute(array(
			'nickname' => $_SESSION['nickname'],
			'score' => $safePost['score']
			));
		}
	}

	/*------------------------------
	--      GET ALL SCORES        --
	------------------------------*/
	public function getAllScores(){
		$sql = 'SELECT nickname, score, id FROM scores ORDER BY nickname';
		$data = $this->db->query($sql);
		return $data->fetchAll();
	}

	/*------------------------------
	--     GET YOUR SCORES        --
	------------------------------*/
	public function getYourScores(){
		$nickname = $_SESSION['nickname'];
		$sql = "SELECT score FROM scores WHERE nickname = '".$nickname."' ORDER BY score ASC LIMIT 20";
		$data = $this->db->query($sql);
		return $data->fetchAll();
	}

	/*------------------------------
	--        DELETE SCORE        --
	------------------------------*/
	public function deleteScore($id){
		$sql = "DELETE FROM scores WHERE id=" . $id;
		$data = $this->db->query($sql);
		return $data;
	}

	/*------------------------------
	--        GET ACCOUNTS        --
	------------------------------*/
	public function getAllAccounts(){
		$sql = 'SELECT * FROM users ORDER BY nickname';
		$data = $this->db->query($sql);
		return $data->fetchAll();
	}

	/*------------------------------
	--       DELETE ACCOUNT       --
	------------------------------*/
	public function deleteAccount($id){
		$sql = "DELETE FROM users WHERE id=" . $id;
		$data = $this->db->query($sql);
		return $data;
	}

	/*------------------------------
	--         SIGN UP            --
	------------------------------*/
	public function signInAccount(){
		global $safePost;
		if($safePost['signInNickname'] !== null  && $safePost['signInPassword'] !== null && $safePost['signInPassword2'] !== null && $safePost['signInEmail'] !== null ){
			$password = hash("sha256", $safePost['signInPassword']);
			$password2 = hash("sha256", $safePost['signInPassword2']);
			if($password == $password2){
				$sql = 'INSERT INTO users (nickname, email, password, type) VALUES (:nickname, :email, :password, :type)';
				$data = $this->db->prepare($sql);
				$data->execute(array(
					'nickname' => $safePost['signInNickname'],
					'email' => $safePost['signInEmail'],
					'password' => $password,
					'type' => 1
				));
			}
		}
	}

	/*------------------------------
	--           LOGIN            --
	------------------------------*/
	public function loginAccount(){
		global $safePost;
		if($safePost['loginNickname'] !== null && $safePost['loginPassword'] !== null){
			$nickname = $safePost['loginNickname'];
			$password =  hash("sha256", $safePost['loginPassword']);
			$sql = 'SELECT * FROM users WHERE nickname = ? AND password = ?';
			$data = $this->db->prepare($sql);
			$data->execute(array($nickname, $password));
			$userExist = $data->rowCount();
			if($userExist == 1){
				$userInfo = $data->fetch();
				$_SESSION['id'] = $userInfo['id'];
				$_SESSION['nickname'] = $userInfo['nickname'];
				$_SESSION['email'] = $userInfo['email'];
				$_SESSION['type'] = $userInfo['type'];
				header('location: home');
			}
			
		}
	}

	/*------------------------------
	--       CHECK NICKNAME       --
	------------------------------*/
	public function checkNickname($nickname){
		$sql = 'SELECT nickname FROM users WHERE nickname = :nickname';
		$data = $this->db->prepare($sql);
		$data->execute(['nickname' => $nickname]);
		return $data->rowCount();
	}

	/*------------------------------
	--       CHECK PASSWORD       --
	------------------------------*/
	public function checkEmail($email){
		$sql = 'SELECT email FROM users WHERE email = :email';
		$data = $this->db->prepare($sql);
		$data->execute(['email' => $email]);
		return $data->rowCount();
	}

}
