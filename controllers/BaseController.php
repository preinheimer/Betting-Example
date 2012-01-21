<?php

namespace app\controllers;
use lithium\storage\Session;

class BaseController extends \lithium\action\Controller {

	public function redirect($url, array $options = array())
	{
		if (isset($options['message'])) {
			Session::write('message', array(
				'content' => $options['message'],
				'class' => isset($options['class']) ? $options['class'] : 'error'
			));
			unset($options['message'], $options['class']);
		}
		return parent::redirect($url, $options);
	}
	
	
	public function render(array $options = array())
	{
		if ($this->_render['type'] != 'json') {
			$options['data']['user'] = Session::read('default');
		}
		return parent::render($options);
	}

}
