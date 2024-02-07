<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPolls extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "gender",
        "fragrance",
        "location",
        "ingredients",
        "texture",
        "design",
        "age_bracket",
        "frequency",
        "bath_type",
    ];
}
