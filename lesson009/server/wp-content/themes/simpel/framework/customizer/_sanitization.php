<?php
//Checkbox Sanitizer
function simpel_sanitize_checkbox( $i ) {
    if ($i == 1) {
        return 1;
    } else {
        return '';
    }
}

//Radio Sanitizer
function simpel_sanitize_radio($a) {
    $valid = array(
        'left' => 'Left Sidebar',
        'right' => 'Right Sidebar',
    );

    if (array_key_exists($a, $valid)) {
        return $a;
    }
    else {
        return '';
    }
}

function simpel_sanitize_positive_number( $input ) {
    if ( ($input >= 0) && is_numeric($input) )
        return $input;
    else
        return '';
}