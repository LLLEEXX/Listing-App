<?php

namespace App\Models\BuyRentModel;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class BuyCommSpace extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'buy_comm_spaces';
    protected $fillable = [
        'Actions',
        'PropPurpose',
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
