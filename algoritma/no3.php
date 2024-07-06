<?php
function countWords($input, $query) {
    // Hitung frekuensi kemunculan setiap kata dalam INPUT
    $wordCount = array_count_values($input);
    
    // Array untuk menyimpan hasil
    $result = [];
    
    // Loop melalui setiap kata dalam QUERY dan dapatkan jumlah kemunculannya
    foreach ($query as $q) {
        $result[] = isset($wordCount[$q]) ? $wordCount[$q] : 0;
    }
    
    return $result;
}

$input = ['xc', 'dz', 'bbb', 'dz'];
$query = ['bbb', 'ac', 'dz'];
$output = countWords($input, $query);

print_r($output);
?>