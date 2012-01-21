<?php

namespace app\extensions\adapter\logger;

use app\models\LogEntry;

class Database extends \lithium\core\Object {

	public function __construct(array $config = array()) {
		$defaults = array();
		parent::__construct($config + $defaults);
	}

	public function write($priority, $message) {
		$config = $this->_config;

		return function($self, $params) {
			$rec = LogEntry::create($params['message']);
			try {
				$rec->save();
				return true;
			} catch (\lithium\data\model\QueryException $e) {
				return false;
			}
		};
	}
}

?>
