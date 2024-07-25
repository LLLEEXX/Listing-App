<?php

namespace App\Http\Controllers;

use App\Http\Resources\PropertyCountResource;
use App\Http\Resources\subscription;
use App\Models\PostCommSpace;
use App\Models\PostHouseLot;
use App\Models\PostLot;
use App\Models\PostOffice;
use App\Models\PostWareHouse;
use App\Models\PropertyServices;
use App\Models\Rent_Condo;
use App\Models\SaleCommSpace;
use App\Models\SaleCondo;
use App\Models\SaleHouseLot;
use App\Models\SaleLot;
use App\Models\SaleOffice;
use App\Models\SaleWareHouse;
use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

//IMPORT RESOURCE
use Illuminate\Support\Str;

class UserSecController extends Controller
{
    public function getUserSec()
    {
        $user = auth()->user();
        if ($user) {
            $fullName = $user->fullname;
            return response()->json(['full_name' => $fullName, 'message'], 200);
        } else {
            return response()->json([
                'message' => 'You are not authenticated',
            ], 401);
        }

    }

    public function getCountAllProp()
    {
        // Fetch counts from each model
        $countForRent = Rent_Condo::where('listing_status', 'For Rent')->count();
        $houseLotCount = PostHouseLot::where('listing_status', 'For Rent')->count();
        $lotCount = PostLot::where('listing_status', 'For Rent')->count();
        $wareHouseCount = PostWareHouse::where('listing_status', 'For Rent')->count();
        $commSpaceCount = PostCommSpace::where('listing_status', 'For Rent')->count();
        $officeCount = PostOffice::where('listing_status', 'For Rent')->count();

        $totalRent = $countForRent + $houseLotCount + $lotCount + $wareHouseCount + $commSpaceCount + $officeCount;

        $condoSaleCount = SaleCondo::where('listing_status', 'For Sale')->count();
        $houseLotSaleCount = SaleHouseLot::where('listing_status', 'For Sale')->count();
        $lotSaleCount = SaleLot::where('listing_status', 'For Sale')->count();
        $wareHouseSaleCount = SaleWareHouse::where('listing_status', 'For Sale')->count();
        $commSpaceSaleCount = SaleCommSpace::where('listing_status', 'For Sale')->count();
        $officeSaleCount = SaleOffice::where('listing_status', 'For Sale')->count();

        $totalSale = $condoSaleCount + $houseLotSaleCount + $lotSaleCount + $wareHouseSaleCount + $commSpaceSaleCount + $officeSaleCount;

        $overallTotal = $totalRent + $totalSale;

        // Return the counts using the API resource
        return response()->json(['countForRent' => $totalRent, 'countForSale' => $totalSale, 'countForOverAll' => $overallTotal]);
    }

    public function storePropServices(Request $req)
    {
        $servicesValidator = Validator::make($req->all(), [
            'comp_Name' => 'required|unique:property_services',
            'address' => 'required',
            'city' => 'required',
            'email' => 'required|email|unique:property_services',
            'contact_Num' => 'required|unique:property_services|regex:/^[0-9]+$/',
            'service' => 'required|string',
            'image' => 'required|file|mimes:jpg,jpeg,png',
        ], [
            'comp_Name.unique' => 'The company name is already in use.',
            'contact_Num.unique' => 'Mobile number is already in use.',
            'contact_Num.regex' => 'Mobile number is invalid',
        ]);

        if ($servicesValidator->fails()) {
            return response()->json([
                'validation_errs' => $servicesValidator->messages(),
            ]);
        } else {

            if ($image = $req->file('image')) {
                $fileName = Str::uuid() . '.' . $image->extension();
                $path = Storage::disk('public')->putFileAs('services', $image, $fileName);

                $storeServices = new PropertyServices;
                $storeServices->comp_Name = $req->comp_Name;
                $storeServices->address = $req->address;
                $storeServices->city = $req->city;
                $storeServices->email = $req->email;
                $storeServices->contact_Num = $req->contact_Num;
                $storeServices->service = $req->service;
                $storeServices->image = $path;
                $storeServices->save();

                return response()->json([
                    'status' => 200,
                ]);
            } else {
                return response()->json([
                    'message' => 'something went wrong',
                ], 400);
            }

        }
    }

    public function fetchPropertyListing(Request $request)
    {
        // Calculate the start and end dates for the current week
        $startDate = date('Y-m-d', strtotime('monday this week'));
        $endDate = date('Y-m-d', strtotime('sunday this week'));

        // Define an array to hold all fetched properties
        $properties = [];

        // Define an array of table names to loop through
        $tables = [
            Rent_Condo::class,
            PostHouseLot::class,
            PostLot::class,
            PostWareHouse::class,
            PostCommSpace::class,
            PostOffice::class,
        ];

        // Iterate through each table and fetch properties posted within the current week
        foreach ($tables as $table) {
            $tableProperties = $table::whereBetween('created_at', [$startDate, $endDate])->get();
            $properties = array_merge($properties, $tableProperties->all());
        }

        $transformedProperties = PropertyCountResource::collection($properties);

        // Return the transformed properties as JSON response
        return response()->json($transformedProperties);
    }

    public function fetchMonthlyPropertyListing(Request $request)
    {
        // Calculate the start and end dates for the current month
        $startDate = date('Y-m-01'); // First day of the current month
        $endDate = date('Y-m-t'); // Last day of the current month

        // Define an array to hold all fetched properties
        $properties = [];

        // Define an array of table names to loop through
        $tables = [
            Rent_Condo::class,
            PostHouseLot::class,
            PostLot::class,
            PostWareHouse::class,
            PostCommSpace::class,
            PostOffice::class,
        ];

        // Iterate through each table and fetch properties posted within the current month
        foreach ($tables as $table) {
            $tableProperties = $table::whereBetween('created_at', [$startDate, $endDate])->get();
            $properties = array_merge($properties, $tableProperties->all());
        }

        $transformedProperties = PropertyCountResource::collection($properties);

        // Return the transformed properties as JSON response
        return response()->json($transformedProperties);
    }

    public function getSubscriptions()
    {
        $prices = SubscriptionPlan::where('subscription_type', '!=', 'FREE')->get();

        return subscription::collection($prices);

    }

    public function updateSubscription(Request $request)
    {
        $requestData = $request->all();
        $validatedData = $request->validate([
            'price' => 'nullable|numeric',
        ]);

        if (isset($requestData['AnnuallyBasic'])) {
            $newPrice = $requestData['AnnuallyBasic'];
            $existingPrice = SubscriptionPlan::where('subscription_type', 'Annually(Basic)')->value('price');
            if ($existingPrice !== $newPrice) {
                SubscriptionPlan::where('subscription_type', 'Annually(Basic)')->update(['price' => $newPrice]);
            }
        }
        if (isset($requestData['AnnuallyStandard'])) {
            $newPrice = $requestData['AnnuallyStandard'];
            $existingPrice = SubscriptionPlan::where('subscription_type', 'Annually(Standard)')->value('price');
            if ($existingPrice !== $newPrice) {
                SubscriptionPlan::where('subscription_type', 'Annually(Standard)')->update(['price' => $newPrice]);
            }
        }
        if (isset($requestData['AnnuallyPro'])) {
            $newPrice = $requestData['AnnuallyPro'];
            $existingPrice = SubscriptionPlan::where('subscription_type', 'Annually(pro)')->value('price');
            if ($existingPrice !== $newPrice) {
                SubscriptionPlan::where('subscription_type', 'Annually(pro)')->update(['price' => $newPrice]);
            }
        }
        if (isset($requestData['AnnuallyMaster'])) {
            $newPrice = $requestData['AnnuallyMaster'];
            $existingPrice = SubscriptionPlan::where('subscription_type', 'Annually(Master)')->value('price');
            if ($existingPrice !== $newPrice) {
                SubscriptionPlan::where('subscription_type', 'Annually(Master)')->update(['price' => $newPrice]);
            }
        }

        if (isset($requestData['SemiAnnuallyBasic'])) {
            $newPrice = $requestData['SemiAnnuallyBasic'];
            $existingPrice = SubscriptionPlan::where('subscription_type', 'Semi-Annual(Basic)')->value('price');
            if ($existingPrice !== $newPrice) {
                SubscriptionPlan::where('subscription_type', 'Semi-Annual(Basic)')->update(['price' => $newPrice]);
            }
        }
        if (isset($requestData['SemiAnnuallyStandard'])) {
            $newPrice = $requestData['SemiAnnuallyStandard'];
            $existingPrice = SubscriptionPlan::where('subscription_type', 'Semi-Annual(Standard)')->value('price');
            if ($existingPrice !== $newPrice) {
                SubscriptionPlan::where('subscription_type', 'Semi-Annual(Standard)')->update(['price' => $newPrice]);
            }
        }
        if (isset($requestData['SemiAnnuallyPro'])) {
            $newPrice = $requestData['SemiAnnuallyPro'];
            $existingPrice = SubscriptionPlan::where('subscription_type', 'Semi-Annual(pro)')->value('price');
            if ($existingPrice !== $newPrice) {
                SubscriptionPlan::where('subscription_type', 'Semi-Annual(pro)')->update(['price' => $newPrice]);
            }
        }
        if (isset($requestData['SemiAnnuallyMaster'])) {
            $newPrice = $requestData['SemiAnnuallyMaster'];
            $existingPrice = SubscriptionPlan::where('subscription_type', 'Semi-Annual(Master)')->value('price');
            if ($existingPrice !== $newPrice) {
                SubscriptionPlan::where('subscription_type', 'Semi-Annual(Master)')->update(['price' => $newPrice]);
            }
        }

        if (isset($requestData['QuarterlyBasic'])) {
            $newPrice = $requestData['QuarterlyBasic'];
            $existingPrice = SubscriptionPlan::where('subscription_type', 'Quarterly(Basic)')->value('price');
            if ($existingPrice !== $newPrice) {
                SubscriptionPlan::where('subscription_type', 'Quarterly(Basic)')->update(['price' => $newPrice]);
            }
        }
        if (isset($requestData['QuarterlyStandard'])) {
            $newPrice = $requestData['QuarterlyStandard'];
            $existingPrice = SubscriptionPlan::where('subscription_type', 'Quarterly(Standard)')->value('price');
            if ($existingPrice !== $newPrice) {
                SubscriptionPlan::where('subscription_type', 'Quarterly(Standard)')->update(['price' => $newPrice]);
            }
        }
        if (isset($requestData['QuarterlyPro'])) {
            $newPrice = $requestData['QuarterlyPro'];
            $existingPrice = SubscriptionPlan::where('subscription_type', 'Quarterly(pro)')->value('price');
            if ($existingPrice !== $newPrice) {
                SubscriptionPlan::where('subscription_type', 'Quarterly(pro)')->update(['price' => $newPrice]);
            }
        }
        if (isset($requestData['QuarterlyMaster'])) {
            $newPrice = $requestData['QuarterlyMaster'];
            $existingPrice = SubscriptionPlan::where('subscription_type', 'Quarterly(Master)')->value('price');
            if ($existingPrice !== $newPrice) {
                SubscriptionPlan::where('subscription_type', 'Quarterly(Master)')->update(['price' => $newPrice]);
            }
        }

        if (isset($requestData['MonthlyBasic'])) {
            $newPrice = $requestData['MonthlyBasic'];
            $existingPrice = SubscriptionPlan::where('subscription_type', 'Monthly(Basic)')->value('price');
            if ($existingPrice !== $newPrice) {
                SubscriptionPlan::where('subscription_type', 'Monthly(Basic)')->update(['price' => $newPrice]);
            }
        }
        if (isset($requestData['MonthlyStandard'])) {
            $newPrice = $requestData['MonthlyStandard'];
            $existingPrice = SubscriptionPlan::where('subscription_type', 'Monthly(Standard)')->value('price');
            if ($existingPrice !== $newPrice) {
                SubscriptionPlan::where('subscription_type', 'Monthly(Standard)')->update(['price' => $newPrice]);
            }
        }
        if (isset($requestData['MonthlyPro'])) {
            $newPrice = $requestData['MonthlyPro'];
            $existingPrice = SubscriptionPlan::where('subscription_type', 'Monthly(pro)')->value('price');
            if ($existingPrice !== $newPrice) {
                SubscriptionPlan::where('subscription_type', 'Monthly(pro)')->update(['price' => $newPrice]);
            }
        }
        if (isset($requestData['MonthlyMaster'])) {
            $newPrice = $requestData['MonthlyMaster'];
            $existingPrice = SubscriptionPlan::where('subscription_type', 'Monthly(Master)')->value('price');
            if ($existingPrice !== $newPrice) {
                SubscriptionPlan::where('subscription_type', 'Monthly(Master)')->update(['price' => $newPrice]);
            }
        }
    }

}
