<?php
	$config = (object) array(
		'site' => 'dev.society6.com/prints',
		//'invoker' => 'bin/js/dev.js',
		'invoker' => 'js/s6/main.js',
		'requirePath' => 's6.Main',
		'initializer' => 's6.Main.getInstance();',
		'mode' => 'dev'
	);
?>
