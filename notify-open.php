<?php

$webhook = "https://discord.com/api/webhooks/1486718855253463150/8eqdZh_zUws98I_Gy9qqjL6PRtoBm1tjAPLuio5V2iQiOE1CdMxCQGdHfErK0F2JrWTS";

// simple message
$data = [
  "content" => "🚨 Someone opened your link!"
];

$options = [
  "http" => [
    "header"  => "Content-Type: application/json",
    "method"  => "POST",
    "content" => json_encode($data)
  ]
];

$context = stream_context_create($options);
file_get_contents($webhook, false, $context);