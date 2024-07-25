<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSubscription extends Model
{
    use HasFactory;

    protected $table = 'user_subscription';
    protected $fillable = [
        'user_id',
        'subscription_plan_id',
        'red_coins',
        'silver_coins',
        'rental_listing',
        'sale_listing'
    ];

    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function plan()
    {
        return $this->belongsTo(SubscriptionPlan::class);
    }
}
