<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleCondo extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'rent__condos';
    protected $fillable =[
        'user_id',
        'PropTitle',
        'PropDesc',
        'PropBuildingName',
        'PropBaths',
        'PropBeds',
        'PropRate',
        'PropFurnish',
        'otherInclusions',
        'PropPetAllowed',
        'PropAdd',
        'PropCity',
        'PropNeighborhood',
        'PropGoogleLink',
        'selectedAmenities',
        'selectedInclusions',
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
