<?php

require_once "view/view.php" ;
require_once "model/model.php" ;

class DataCtrl{	

	/*------------------------------
	--       GET BEST SCORES      --
	------------------------------*/
	public function scoresList(){
		$myModel = new Model();
		$data = $myModel->getScores();
		$myView = new View();
		return $myView->showScores($data);
	}

	/*------------------------------
	--   GET PLAYER BEST SCORES   --
	------------------------------*/
	public function yourScoresList(){
		$myModel = new Model();
		$data = $myModel->getYourScores();
		$myView = new View();
		return $myView->showYourScores($data);
	}

	/*------------------------------
	--      GET ALL  SCORES       --
	------------------------------*/
	public function allScoresList(){
		$myModel = new Model();
		$data = $myModel->getAllScores();
		$myView = new View();
		return $myView->showAllScores($data);
	}

	/*------------------------------
	--      GET ALL  ACCOUTS      --
	------------------------------*/
	public function allAccountsList(){
		$myModel = new Model();
		$data = $myModel->getAllAccounts();
		$myView = new View();
		return $myView->showAllAccounts($data);
	}

	/*------------------------------
	--        PUBLISH SCORE       --
	------------------------------*/
	public function publishScores(){
		$myModel = new Model();
		return $myModel->publishScore();
	}

	/*------------------------------
	--       DELETE   SCORE       --
	------------------------------*/
	public function deleteOneScore($id){
		$myModel = new Model();
		return $myModel->deleteScore($id);
	}

	/*------------------------------
	--       DELETE   ACCOUT      --
	------------------------------*/
	public function deleteOneAccount($id){
		$myModel = new Model();
		return $myModel->deleteAccount($id);
	}
}