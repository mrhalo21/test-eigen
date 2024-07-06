<?php

function diagonalDifference($matrix) {
    $n = count($matrix);  // Ukuran matriks NxN
    $primaryDiagonalSum = 0;
    $secondaryDiagonalSum = 0;
    
    // Loop untuk menghitung jumlah elemen pada diagonal utama dan diagonal sekunder
    for ($i = 0; $i < $n; $i++) {
        $primaryDiagonalSum += $matrix[$i][$i];
        $secondaryDiagonalSum += $matrix[$i][$n - $i - 1];
    }
    
    // Menghitung selisih absolut antara kedua jumlah diagonal
    $difference = $primaryDiagonalSum - $secondaryDiagonalSum;
    
    return $difference;
}

$matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
];

$result = diagonalDifference($matrix);
echo "Hasil pengurangan dari jumlah diagonal: " . $result; 
?>