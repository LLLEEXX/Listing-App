<?php

namespace App\Http\Controllers;

use App\Http\Resources\servicesResource;
use App\Models\PropertyServices;
use Carbon\Carbon;
use Illuminate\Http\Request;

class servicesController extends Controller
{
    public function getUnitCleaning(Request $request)
    {
        $city = $request->query('city');
        $service = $request->query('service');

        $query = PropertyServices::query();

        if ($service) {
            $query->where('service', $service);
        }

        if ($city) {
            $query->where('city', $city);
        }

        $ServiceNeeded = $query->paginate(8);
        return servicesResource::collection($ServiceNeeded);
    }

    public function getServices(Request $request)
    {
        $services = PropertyServices::paginate(8);
        return servicesResource::collection($services);
    }

    public function displayBanner(Request $request)
    {
        $bannerName = $request->input('comp_Name');

        $banner = PropertyServices::where('comp_name', $bannerName)->first();

        if ($banner) {
            $newExpirationDate = Carbon::now()->addDay();

            $banner->expired_at = $newExpirationDate;

            $banner->save();

            return response()->json(['status' => 200]);
        } else {
            return response()->json(['message' => 'Company not found']);
        }
    }

    public function removeBanner(Request $request)
    {
        $bannerName = $request->input('comp_Name');

        $banner = PropertyServices::where('comp_name', $bannerName)->first();

        if ($banner) {
            $banner->expired_at = null;

            $banner->save();

            return response()->json(['status' => 200]);
        } else {
            return response()->json(['message' => 'Company not found']);
        }
    }

    public function fetchBanner(Request $request)
    {
        $query = PropertyServices::query();

        $limit = $request->input('limit', 10);
        $query->limit($limit);

        if ($request->input('expiredAtNotNull')) {
            $query->whereNotNull('expired_at')
                ->where('expired_at', '!=', now());
        }

        // Fetch the image paths or any other relevant data
        $bannerData = $query->pluck('image');

        return response()->json($bannerData, 200);
    }

}
