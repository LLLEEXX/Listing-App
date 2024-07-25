<?php

namespace App\Http\Controllers;

use App\Http\Resources\LeadsResource;
use App\Http\Resources\userLeads\commSpaceLeadsResource;
use App\Http\Resources\userLeads\CondoRentLeadResource;
use App\Http\Resources\userLeads\houseLotLeadsResource;
use App\Http\Resources\userLeads\houseLotRentLeadsResource;
use App\Http\Resources\userLeads\lotLeadsResource;
use App\Http\Resources\userLeads\userLeadsResource;
use App\Http\Resources\userLeads\warehouseLeadsResource;
use App\Models\BuyRentModel\BuyCommSpace;
use App\Models\BuyRentModel\BuyCondo;
use App\Models\BuyRentModel\BuyHouseLot;
use App\Models\BuyRentModel\BuyLot;
use App\Models\BuyRentModel\BuyOffice;
use App\Models\BuyRentModel\BuyWareHouse;
use App\Models\BuyRentModel\RentCondo;
use App\Models\BuyRentModel\RentHouseLot;
use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Validator;

class LeadsController extends Controller
{
    public function getLeads(Request $request)
    {
        $requestData = $request->all();
        $city = $requestData['city'];
        $sortBy = $requestData['sortBy'];

        $rules = [
            'city' => 'nullable|string|max:255',
            'sortBy' => 'nullable|string|',
        ];

        // Validate the request data
        $validator = Validator::make($requestData, $rules);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = auth()->user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        // Retrieve the subscription plan
        $subscriptionPlan = $user->subscription;

        if (!$subscriptionPlan) {
            return response()->json(['error' => 'User does not have a subscription'], 404);
        }

        $subscriptionPlanId = $user->subscription->subscription_plan_id;

        $subscriptionPlan = SubscriptionPlan::find($subscriptionPlanId);

        if (!$subscriptionPlan) {
            return response()->json(['error' => 'Subscription plan not found'], 404);
        }
        $subscriptionType = $subscriptionPlan->subscription_type;

        switch ($subscriptionType) {
            case 'FREE':

                $query1 = BuyCommSpace::where('Actions', 'buy')
                    ->orWhere('Actions', 'rent')
                    ->where('PropToRange', '<', 30000)
                    ->get();

                $query2 = BuyCondo::where('Actions', 'buy')
                    ->where('PropToRange', '<', 30000)
                    ->get();

                $query3 = BuyHouseLot::where('Actions', 'buy')
                    ->where('PropToRange', '<', 30000)
                    ->get();
                $query4 = BuyLot::where('Actions', 'buy')
                    ->orWhere('Actions', 'rent')
                    ->where('PropToRange', '<', 30000)
                    ->get();
                $query5 = BuyOffice::where('Actions', 'buy')
                    ->orWhere('Actions', 'rent')
                    ->where('PropToRange', '<', 30000)
                    ->get();
                $query6 = BuyWareHouse::where('Actions', 'buy')
                    ->orWhere('Actions', 'rent')
                    ->where('PropToRange', '<', 30000)
                    ->get();
                $query7 = RentCondo::where('Actions', 'rent')
                    ->where('PropToRange', '<', 30000)
                    ->get();
                $query8 = RentHouseLot::where('Actions', 'rent')
                    ->where('PropToRange', '<', 30000)
                    ->get();

                $mergedResults = $query1->merge($query2)
                    ->merge($query3)
                    ->merge($query4)
                    ->merge($query5)
                    ->merge($query6)
                    ->merge($query7)
                    ->merge($query8);

                if ($city !== 'null') {
                    $mergedResults = $mergedResults->where('PropCity', $city);
                }

                if ($sortBy !== 'null') {
                    $mergedResults = $mergedResults->sortBy(function ($item) use ($requestData) {
                        return $item->created_at;
                    });

                    // Reverse the sorting order if necessary
                    if ($requestData['sortBy'] === 'desc') {
                        $mergedResults = $mergedResults->reverse();
                    }
                }

                $perPage = 8;
                $currentPage = LengthAwarePaginator::resolveCurrentPage();
                $pagedData = $mergedResults->slice(($currentPage - 1) * $perPage, $perPage)->all();
                $paginatedResults = new LengthAwarePaginator($pagedData, count($mergedResults), $perPage, $currentPage);

                return LeadsResource::collection($paginatedResults);

                break;

            default:
                return response()->json(['error' => $subscriptionType], 400);
        }

    }

    public function getUserLead(Request $request)
    {
        $requestData = $request->all();

        switch ($requestData['propType']) {
            case 'BuyCondo':
                if ($requestData['action'] === 'buy') {
                    $listing = BuyCondo::where('id', $requestData['id'])->first();
                    return new userLeadsResource($listing);
                }
                break;
            case 'BuyHouseLot':
                if ($requestData['action'] === 'buy') {
                    $listing = BuyHouseLot::where('id', $requestData['id'])->first();
                    return new houseLotLeadsResource($listing);
                }
                break;
            case 'BuyLot':

                $listing = BuyLot::where('id', $requestData['id'])->first();
                return new lotLeadsResource($listing);

                break;
            case 'BuyWareHouse':

                $listing = BuyWareHouse::where('id', $requestData['id'])->first();
                return new warehouseLeadsResource($listing);

                break;
            case 'BuyCommSpace':

                $listing = BuyCommSpace::where('id', $requestData['id'])->first();
                return new commSpaceLeadsResource($listing);

                break;
            case 'BuyOffice':

                $listing = BuyOffice::where('id', $requestData['id'])->first();
                return new commSpaceLeadsResource($listing);

                break;
            case 'RentCondo':
                if ($requestData['action'] === 'rent') {
                    $listing = RentCondo::where('id', $requestData['id'])->first();
                    return new CondoRentLeadResource($listing);
                }
                break;
            case 'RentHouseLot':
                if ($requestData['action'] === 'rent') {
                    $listing = RentHouseLot::where('id', $requestData['id'])->first();
                    return new houseLotRentLeadsResource($listing);
                }
                break;

            default:
                return response()->json(['error' => 'Listing not found'], 404);
                break;
        }

    }

}
