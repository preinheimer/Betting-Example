<?php

namespace app\extensions\helper;

class Session extends \lithium\template\Helper {

	/**
	 * Classes used by this helper.
	 *
	 * @var array Key/value pair of classes.
	 */
	protected $_classes = array('session' => 'lithium\storage\Session');

	/**
	 * The template strings used by this message.
	 *
	 * @var array
	 */
	protected $_strings = array(
		'message' => '<div class="alert readme{:class}"{:options}><p>{:content}</p></div>'
	);

	/**
	 * Session flash message.
	 *
	 * @param string $key Key of flash message. Defaults to 'message' if not set.
	 * @return string Flash message, or null if not set.
	 */
	public function message($key = 'message', array $options = array()) {
		$defaults = array('class' => null);
		$options += $defaults;
		$session = $this->_classes['session'];

		if (!($content = $session::read($key))) {
			return;
		}
		$class = $options['class'];
		$session::delete($key);
		$template = $this->_strings[__FUNCTION__];
		unset($options['class']);

		if (is_array($content)) {
			extract($content, EXTR_OVERWRITE);
		}
		$class = $class ? " {$class}" : '';
		return $this->_render(__METHOD__, $template, compact('content', 'class', 'options'));
	}

	/**
	 * Read a value from the session.
	 *
	 * @param string $key The key to be fetched.
	 * @return string The value stored in the session, or null if it does not exist.
	 */
	public function read($key = null) {
		$session = $this->_classes['session'];
		return $session::read($key);
	}

	/**
	 * Get the current session ID.
	 *
	 * @return string The currenct session id.
	 */
	public function key() {
		$session = $this->_classes['session'];
		return $session::key();
	}

	public function check($key, array $options = array()) {
		$session = $this->_classes['session'];
		return $session::check($key, $options);
	}
}

?>
