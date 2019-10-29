<?php
require_once 'model/model.php';

	/*------------------------------
	--       API CONTROLLER       --
	------------------------------*/
class ApiCtrl {
	
	function __construct($url){
		
	}

	/*------------------------------
	--       CHECK NICKNAME       --
	------------------------------*/
	private function checkNickname($value){
		$this->status = $this->model->checkNickname($value);
		$this->showResult($this->status,"nickname");
	}

	/*------------------------------
	--       CHECK EMAIL          --
	------------------------------*/
	private function checkEmail($value){
		if (!preg_match ( " /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/ ", $value)){
			die("Email|Mauvais format");
		}
		$this->status = $this->model->checkEmail($value);
		$this->showResult($this->status,"email");
	}
	

	/*------------------------------
	--         GET PAGE           --
	------------------------------*/
	public function getPage(){
		global $router;
		$this->model = new Model;
		if ($router->url[3] == ""){
			die($router->url[2]."|Vide");
		}
		switch ($router->url[2]){
			case "Nickname":
				$this->checkNickname($router->url[3]);
			break;
			case "Email":
				$this->checkEmail($router->url[3]);
			break; 
		}
	}

	private function showResult($sum, $text){
		if($sum == 1) {
			$html = $text . "|Pas valable" ;
		}
		else{
			$html = $text . "|Valable";
		}
		die($html);
	}

}

