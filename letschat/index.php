<?php
require_once('../auth/bearer.php');
while (ob_get_level()) ob_end_flush();
ob_implicit_flush(true);

header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');
header('X-Accel-Buffering: no');

$body = file_get_contents('php://input');

$ch = curl_init('https://ai.hackclub.com/proxy/v1/chat/completions');

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $body,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer $HACK_CLUB_AI_API_KEY",
        'Content-Type: application/json'
    ],
    CURLOPT_WRITEFUNCTION => function ($ch, $data) {
        echo $data;
        flush();
        return strlen($data);
    },
]);

curl_exec($ch);
curl_close($ch);

?>