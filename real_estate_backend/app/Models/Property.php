<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    // Allow mass assignment of these fields
    protected $fillable = [
        'title',
        'description',
        'location',
        'price',
        // 'image',
    ];
//     protected $casts = [
//     'images' => 'array'
// ];
}

