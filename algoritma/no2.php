<?php
function findLongestWord($kalimat){
    $kata = explode(' ', $kalimat);
    $kata_terpanjang = '';
    foreach($kata as $value){
        if(strlen($value) > strlen($kata_terpanjang)){
            $kata_terpanjang = $value;
        }
    }

    return $kata_terpanjang;
}

$input = "Sayaaaaaaaaaaaaaaa sangat senang mengerjakan soal algoritma";
$output = findLongestWord($input);
echo "Kata terpanjang: " . $output;