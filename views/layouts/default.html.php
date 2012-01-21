<?php
/**
 * Lithium: the most rad php framework
 *
 * @copyright     Copyright 2011, Union of RAD (http://union-of-rad.org)
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 */
?><!DOCTYPE html>
<html>
<head>
	<?php echo $this->html->charset();
	?>
	<title>Casino Gambling</title>

	<?php echo $this->html->style(array('debug','lithium','fonts/league-gothic','jquery.selectbox.css')); ?>
	<?php echo $this->scripts(); ?>
	<?php echo $this->html->link('Icon', null, array('type' => 'icon')); ?>
	<link rel="stylesheet" type="text/css" href="/css/cta-styles.css" />

	<!-- <link href='http://fonts.googleapis.com/css?family=PT+Sans+Narrow:700' rel='stylesheet' type='text/css' />  -->
	
	<script src="/js/jquery-1.6.2.js"></script>
	<script src="/js/jquery-ui-1.8.14.custom.min.js"></script>
	<script src="/js/jquery.selectbox-0.1.3.min.js"></script>
	<script src="/js/ct1.jquery.js"></script>
	
</head>
<body class="app">
	<div id="container">
		<div id="header">
			<h1>
				<a href="/">Casino <em>Gambling</em></a>
				<span class="version_tag">Secure!</span>
			</h1>
		</div>
		<div id="nav">
			Your Current Balance: <b><?php echo $money; ?></b>
			
		</div>
		<br style="clear:both" />
		<div id="content">
			<?php echo $this->content(); ?>
		</div>
		<div id="footer">

			<p>
				
			</p>

		</div>
	</div>
</body>
</html>
