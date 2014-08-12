<?php
	require_once 'config.php';

	$site = isset($config->site) ? $config->site : FALSE;
	$invoker = isset($config->invoker) ? $config->invoker : FALSE;
	$ad_slot_index = isset($config->ad_slot_index) ? $config->ad_slot_index : 0;

	$currentPath = preg_replace('/\/$/', '', preg_replace('/^.*?templates/', 'templates', str_replace('\\', '/', str_replace('index.php', '', __FILE__))));
	$folderName = basename(realpath("."));
	$baseUrl = ($_SERVER['HTTP_HOST'] === 'indieclick.3janecdn.com' ? $_SERVER['HTTP_HOST'] . '/media' : $_SERVER['HTTP_HOST']);


	$query_r = isset($_SERVER['QUERY_STRING']) ? urldecode($_SERVER['QUERY_STRING']) : '';
	if(strlen($query_r) > 0){
		$query_r .=	'&';
	}

	$query_r .= 'cache_buster=' . rand();

	function appendTo($tagName, $str, $html){
		return preg_replace('/<\/' . $tagName . '>/i', $str . '$0', $html);
	}

	function replaceVar($varName, $replaceValue, $str){
		return preg_replace('/<!--\s*\$\s*\{\s*' . $varName . '\s*\}\s*-->/i', $replaceValue, $str);
	}

	function getFolderName(){
		return basename(realpath("."));
	}
	function jsClosure_($src){
		return '(function(){' . $src . '})();';
	}

	function getBaseTag($href){
		return '<base href="' . $href . '"/>';
	}

	function getPageContents($url){
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 15);
		$contents = curl_exec($ch);
		curl_close($ch);

		return $contents;
	}

	function getDevJSInvokerCode($requirePath, $initializer){
		global $baseUrl;
		return (
			'<script type="text/javascript" src="http://' . $baseUrl . '/' . basename(realpath(".")) . '/js/google/closure-library/closure/goog/base.js"></script>' .
			'<script type="text/javascript" src="http://' . $baseUrl . '/' . basename(realpath(".")) . '/js/s6/deps.js"></script>' .
			'<script type="text/javascript">' .
				'goog.require("'.$requirePath.'");' .
			'</script>' .
			'<script type="text/javascript">' .
				$initializer.
			'</script>'
		);
	}

	function getJSInvokerCode($src){
		global $baseUrl;
		global $query_r;

		return (
			'<script type="text/javascript">
				(function(){
					var e="' . $baseUrl . '",
					t="' . basename(realpath(".")) . '",
					n="' . $src . '",
					r="' . $query_r . '",
					c="?";
					var h=new Date,p=t+"_"+h.getTime(),d="http://"+e+"/"+t+"/"+n+c+r;
					document.write("<script id=\"" + p + "\" type=\"text/javascript\" src=\"" + d + "\"></sc"+"ript>")
				})();
			</script>'
		);
	}

	function getPageContentsWithJavaScript($url){
		global $baseUrl;
		global $currentPath;
		global $config;
		global $invoker;
		
		$contents = getPageContents($url);
		$contents = appendTo('head', getBaseTag($url), $contents);

		$contents = preg_replace('/(href\s*=\s*[\'"])\//i', '$1http://' . $config->site . '/' , $contents);
		$contents = preg_replace('/(href\s*=\s*[\'"])\//i', '$1http://' . $config->site . '/' , $contents);
		$contents = str_replace('__TEMPLATE_PATH__', $currentPath, $contents);

		$invokerTag;

		if($config->mode === 'dev'){
			$invokerTag = getDevJSInvokerCode($config->requirePath, $config->initializer);
		}
		else{
			$invokerTag = getJSInvokerCode($invoker);
		}
		$contents = appendTo('head', $invokerTag, $contents);
		return $contents;
	}

	

	$templateUrl = $config->site;

	echo getPageContentsWithJavaScript(urldecode($templateUrl));
?>
