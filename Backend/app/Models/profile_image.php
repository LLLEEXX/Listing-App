<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class profile_image extends Model
{
    use HasFactory;
    protected $table = 'profile_images';
    protected $fillable = ['profile_image'];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
