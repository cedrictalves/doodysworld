<?php

	/////////////////////
	///  MAIN VIEW    ///
	/////////////////////
class View {

	/////////////////////////////////////////
	/// REPLACE {{ string }} BY TEMPLATE  ///
	/////////////////////////////////////////
	public function mergeWithTemplate($args, $gabarit){
		return str_replace( array_keys($args), $args, file_get_contents("template/$gabarit.html") ); 
	}

	/////////////////////
	/// BEST SCORES   ///
	/////////////////////
	public function showScores($dataArray){
		$html = "";
		for ($i=0; $i<count($dataArray); $i++) {	
			$html.= '<div class="scores">
						<p>'. ($i + 1) . " - " . $dataArray[$i]["nickname"].' : '.$dataArray[$i]["score"].'</p>
					 </div>';
		}
		return $html;
	}

	/////////////////////
	///  YOUR SCORES  ///
	/////////////////////
	public function showYourScores($dataArray){
		$html = "";
		for ($i=0; $i<count($dataArray); $i++) {	
			$html.= '<div class="scores">
						<p>'. ($i + 1) . " - " .$dataArray[$i]["score"].'</p>
					 </div>';
		}
		return $html;
	}

	/////////////////////
	///  ALL SCORES   ///
	/////////////////////
	public function showAllScores($dataArray){
		$html = "";
		for ($i=0; $i<count($dataArray); $i++) {	
			$html.= '<div class="scores">
						<p>' . $dataArray[$i]["nickname"] . " - " .$dataArray[$i]["score"].'</p>
						<form method="POST" action="allScores">
						<input type="hidden" name="id" value="'. $dataArray[$i]["id"] .'" />
						<input type="submit"  onclick="return confirm(\'Are you sure to want to delete this score?\')" value="Delete this score" />
						</form>
					 </div>';

		}
		return $html;
	}

	/////////////////////
	///  ALL SCORES   ///
	/////////////////////
	public function showAllAccounts($dataArray){
		$html = "";
		for ($i=0; $i<count($dataArray); $i++) {	
			$html.= '<div class="scores">
						<p>' . $dataArray[$i]["nickname"] . " - " .$dataArray[$i]["email"].'</p>
						<form method="POST" action="allAccounts">
						<input type="hidden" name="id" value="'. $dataArray[$i]["id"] .'" />
						<input type="submit" onclick="return confirm(\'Are you sure to want to delete this account?\')" value="Delete this account" />
						</form>
					 </div>';

		}
		return $html;
	}

}