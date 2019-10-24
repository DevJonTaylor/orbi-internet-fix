<?php
/**
 * Sends the kill command.
 */
$path = __DIR__ . DIRECTORY_SEPARATOR . 'direction.orders';
file_put_contents($path, 'stop');
header('Access-Control-Allow-Origin: *');
header('content-type: application/json');
echo json_encode(array('status' => 200, 'message' => 'OK'));