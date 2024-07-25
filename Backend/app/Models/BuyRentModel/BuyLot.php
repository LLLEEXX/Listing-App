<?php

namespace App\Models\BuyRentModel;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\User;

class BuyLot extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'buy_lots';
    protected $fillable =[
        'Actions',
        'PropLotPref',
        'PropLotUse',
        'PropSize',
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
