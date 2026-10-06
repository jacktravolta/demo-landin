<?php
header('Content-Type: text/html; charset=utf-8');
$log=__DIR__.'/contacts.log';
$n=trim($_POST['nombre']??'');
$e=trim($_POST['email']??'');
$m=trim($_POST['mensaje']??'');
if($n===''||$e===''||$m===''){echo 'Faltan campos';exit;}
if(!filter_var($e,FILTER_VALIDATE_EMAIL)){echo 'Email invalido';exit;}
$f=date('Y-m-d H:i:s');
$line=$f."	".$n."	".$e."	".$m."
";
file_put_contents($log,$line,FILE_APPEND|LOCK_EX);
echo "<h1>Gracias $n!</h1><p>Mensaje: $m</p><a href=landing.html>Volver</a>";
?>