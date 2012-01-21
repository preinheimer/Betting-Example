<?php

namespace app\extensions\helper;
use \lithium\analysis\Logger;

class Log {
	public static function __callStatic($priority, $params) {
		$fields = array('type' => $params[0],
						'message' => $params[1]);
		if (count($params) > 2) {
			$fields['details'] = json_encode($params[2]);
		}
		$user = \lithium\storage\Session::read('default');
		$fields['user_id'] = $user ? $user['id'] : 0;
		$fields['user_ip'] = $_SERVER['REMOTE_ADDR'];
		$fields['timestamp'] = time();
		$fields['priority'] = $priority;

		Logger::$priority($fields);
	}
}

?>
