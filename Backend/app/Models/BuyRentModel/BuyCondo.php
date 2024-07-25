<?php

namespace App\Models\BuyRentModel;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class BuyCondo extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'buy_condos';
    protected $fillable = [
        'Actions',
        'PropBuildingName',
        'PropBaths',
        'PropBeds',
        'PropFurnish',
        'PropBalcony',
        'PropParking',
        'PropFromRange',
        'PropToRange',
        'PropCity',
        'PropNeigborhood',
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
