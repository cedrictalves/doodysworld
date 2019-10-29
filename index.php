<?php

$safePost = filter_input_array(INPUT_POST, [
	'loginNickname' => FILTER_SANITIZE_SPECIAL_CHARS,
	'loginPassword' => FILTER_SANITIZE_SPECIAL_CHARS,
	'signInNickname' => FILTER_SANITIZE_SPECIAL_CHARS,
	'signInEmail' => FILTER_SANITIZE_SPECIAL_CHARS,
	'signInPassword' => FILTER_SANITIZE_SPECIAL_CHARS,
	'signInPassword2' => FILTER_SANITIZE_SPECIAL_CHARS,
	'id' => FILTER_SANITIZE_NUMBER_INT,
	'score' => FILTER_SANITIZE_SPECIAL_CHARS
]);

$auth="";

require_once 'router.php';

session_start();

$router = new Router();

$route = $router->get();

require_once 'controller/' . $route['controller'] . '.php';

$controller = new $route['controller'] ($route['arguments']);

echo $controller->getPage();

