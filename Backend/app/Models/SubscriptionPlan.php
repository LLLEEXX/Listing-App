<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubscriptionPlan extends Model
{
    use HasFactory;

    protected $table = 'subscription_plan';

    protected $fillable = [
        'price'
    ];

    public function subscriptions()
    {
        return $this->hasMany(UserSubscription::class);
    }
}
