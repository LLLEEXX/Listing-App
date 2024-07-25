<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostHouseLot extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'post_house_lots';
    protected $fillable = [
        'user_id',
        'PropTitle',
        'PropDesc',
        'PropCommVill',
        'PropHouseLotType',
        'PropSize',
        'PropLotArea',
        'PropFloorArea',
        'PropRate',
        'PropFurnish',
        'PropPetAllowed',
        'PropAdd',
        'PropCity',
        'PropNeighborhood',
        'PropGoogleLink',
        'selectedAmenities',
    ];

    public function images()
    {
        return $this->morphMany(Images::class, 'imageable');
    }

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function favorites()
    {
        return $this->morphMany(Favorite::class, 'favoritable');
    }
}
