<?php

namespace App\Listeners;

use App\Models\UserSubscription;
use App\Models\SubscriptionPlan;
use App\Providers\UserSignedUp;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UserSignUpListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserSignedUp $event): void
    {
        $freePlan = SubscriptionPlan::where('subscription_type', 'FREE')->first();

        if ($freePlan && $event->user) {
            UserSubscription::create([
                'user_id' => $event->user->id,
                'subscription_plan_id' => $freePlan->id,
                'red_coins' => $freePlan->red_coins,
                'silver_coins' => $freePlan->silver_coins,
                'rental_listing' => $freePlan->rental_listing,
                'sale_listing' => $freePlan->sale_listing
            ]);
        }
    }
}
