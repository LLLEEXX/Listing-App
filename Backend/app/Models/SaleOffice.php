<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class SaleOffice extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'post_offices';
    protected $fillable =[
        'user_id',
        'PropTitle',
        'PropDesc',
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
