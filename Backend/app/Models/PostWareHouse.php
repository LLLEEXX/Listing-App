<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostWareHouse extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'post_ware_houses';
    protected $fillable = [
        'user_id',
        'PropTitle',
        'PropDesc',
        'PropCommVill',
        'PropSize',
        'PropPurpose',
        'PropRate',
        'PropAdd',
        'PropCity',
        'PropNeighborhood',
        'PropGoogleLink',
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
