<?php

namespace App\Models\BuyRentModel;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class RentHouseLot extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'buy_house_lots';
    protected $fillable = [
        'Actions',
        'PropCommVill',
        'PropLotArea',
        'PropFloorArea',
        'PropFurnish',
        'PropBalcony',
        'PropMoveInDate',
        'LengthOfStay',
        'Nationality',
        'Occupants',
        'PetTypes',
        'PropCarGarage',
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
