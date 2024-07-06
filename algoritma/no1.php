<?php

function reverseString($string){
    $huruf = preg_replace('/[^a-zA-Z]/', '', $string);
    $angka = preg_replace('/[^\d]/', '', $string);

    // Reverse huruf
    $reversed = strrev($huruf);
    
    // concate with digits
    $result = $reversed . $angka;
    
    return $result;
}

$input = "NEGIE1";
$output = reverseString($input);
echo $output;