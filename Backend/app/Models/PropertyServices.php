<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class PropertyServices extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'property_services';
    protected $fillable = [
        'comp_Name',
        'address',
        'city' ,
        'email',
        'contact_Num' ,
        'service',
        'image',
    ];
}
