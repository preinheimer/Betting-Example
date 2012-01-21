<?php

namespace app\controllers;
use app\models\Access;
use app\models\Actionmeta;
use app\models\Action;
use app\models\Raw;
use lithium\storage\Session;
use lithium\data\source\Database;
class IndexController extends \app\controllers\BaseController {
    public function index() {
		header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
		header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
		$money = Session::read('money');
		
		if (is_null($money)) {
		    $money = 1000;
		    $message = "Starting you with $1000 high roller!";
		}
		if (isset($_GET['bet']) && ctype_digit($_GET['bet']))
		{
		    $bet = $_GET['bet'];
		    if ($bet > $money)
		    {
			$message = "You don't have enough money";
		    }elseif ($bet > 0)
		    {
			if (rand(0, 10) > 5)
			{
			    $message = "You won " . $bet * 2 . " congrats!";
			    $money += $bet * 2;
			}else {
			    $message = "You lost " . $bet . " sorry :(";
			    $money -= $bet;
			}
		    }
		}
		Session::write('money', $money);
		return compact('money', 'message');
    }
}
