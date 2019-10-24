<?php
/**
 * Kills the server if it is running.
 * Starts the server.
 */
$dir = __DIR__ . DIRECTORY_SEPARATOR;
$server = "{$dir}index.js";
$stdoutAndDisown = '&>/dev/null &disown';
file_put_contents($dir . 'direction.orders', 'stop');

shell_exec("node {$server} {$stdoutAndDisown}");

header('Access-Control-Allow-Origin: *');
header('content-type: application/json');
echo json_encode(array('status' => 200, 'message' => 'OK'));
