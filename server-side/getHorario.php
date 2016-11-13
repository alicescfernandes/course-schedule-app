<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
$flag = false;
$ss= true;
if($ss){
if (isset($_GET['token']))
	{
	$xml = simplexml_load_file('secrets.xml');
	foreach($xml as $secret)
		{
		if ($_GET['token'] == $secret['id'])
			{
			$flag = true;
			echo(file_get_contents("sample-data.json"));
			}
		}

	if (!$flag)
		{
		echo ('[{"error":"Token inválido","error_type":"2"}]');
		}
	}
  else
	{
	echo ("[{'error':'Access Denied'}]");
	}
}else{
		echo ('[{"error":"Servidor desligado", "error_type":"1"}]');
		}
?>	