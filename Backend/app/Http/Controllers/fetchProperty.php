<?php

namespace App\Http\Controllers;

use App\Http\Resources\fetchInquireProperty\BuyCommSpace;
use App\Http\Resources\fetchInquireProperty\BuyCondoResource;
use App\Http\Resources\fetchInquireProperty\BuyHouseLotResource;
use App\Http\Resources\fetchInquireProperty\BuyLotResource;
use App\Http\Resources\fetchInquireProperty\BuyOfficeResource;
use App\Http\Resources\fetchInquireProperty\BuyWareHouseResource;
use App\Http\Resources\fetchProperty\CommSpaceResource;
use App\Http\Resources\fetchProperty\HouseLotResource;
use App\Http\Resources\fetchProperty\LotResource;
use App\Http\Resources\fetchProperty\OfficeResource;
use App\Http\Resources\fetchProperty\PropertyResource;
use App\Http\Resources\fetchProperty\WareHouseResource;
use App\Http\Resources\PropertyListingResource;
use App\Http\Resources\UserProfile\UserFavorites;
use App\Http\Resources\UserProfile\UserListingResource;
use App\Models\Favorite;
use App\Models\PostCommSpace;
use App\Models\PostHouseLot;
use App\Models\PostLot;
use App\Models\PostOffice;
use App\Models\PostWareHouse;
use App\Models\Rent_Condo;
use App\Models\SaleCommSpace;
use App\Models\SaleCondo;
use App\Models\SaleHouseLot;
use App\Models\SaleLot;
use App\Models\SaleOffice;
use App\Models\SaleWareHouse;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Log;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class fetchProperty extends Controller
{
    public function getLatestPropertyListings()
    {
        $condos = Rent_Condo::where('Listing_Status', 'For Rent')->latest()->get();
        $houseLots = PostHouseLot::where('Listing_Status', 'For Rent')->latest()->get();
        $lots = PostLot::where('Listing_Status', 'For Rent')->latest()->get();
        $warehouses = PostWareHouse::where('Listing_Status', 'For Rent')->latest()->get();
        $commSpaces = PostCommSpace::where('Listing_Status', 'For Rent')->latest()->get();
        $offices = PostOffice::where('Listing_Status', 'For Rent')->latest()->get();

        $salecondos = SaleCondo::where('Listing_Status', 'For Sale')->latest()->get();
        $salehouseLots = SaleHouseLot::where('Listing_Status', 'For Sale')->latest()->get();
        $salelots = SaleLot::where('Listing_Status', 'For Sale')->latest()->get();
        $salewarehouses = SaleWareHouse::where('Listing_Status', 'For Sale')->latest()->get();
        $salecommSpaces = SaleCommSpace::where('Listing_Status', 'For Sale')->latest()->get();
        $saleoffices = SaleOffice::where('Listing_Status', 'For Sale')->latest()->get();

        $combinedListings = $condos
            ->concat($houseLots)
            ->concat($lots)
            ->concat($warehouses)
            ->concat($commSpaces)
            ->concat($offices)
            ->concat($salecondos)
            ->concat($salehouseLots)
            ->concat($salelots)
            ->concat($salewarehouses)
            ->concat($salecommSpaces)
            ->concat($saleoffices);

        $sortedListings = $combinedListings->sortByDesc('created_at');

        $latestListings = $sortedListings->take(8);

        return PropertyListingResource::collection($latestListings);
    }
    public function getAllProperties(Request $request)
    {
        // Initialize an empty collection to store properties
        $properties = collect();
        $listingStatus = $request->all();

        // Fetch properties based on listing status
        switch ($listingStatus['listingStatus']) {
            case 'For Rent':
                // Fetch properties with Listing_Status = 'For Rent' from each table
                $properties = $properties
                    ->concat(Rent_Condo::where('Listing_Status', 'For Rent')->latest()->get())
                    ->concat(PostHouseLot::where('Listing_Status', 'For Rent')->latest()->get())
                    ->concat(PostLot::where('Listing_Status', 'For Rent')->latest()->get())
                    ->concat(PostWareHouse::where('Listing_Status', 'For Rent')->latest()->get())
                    ->concat(PostCommSpace::where('Listing_Status', 'For Rent')->latest()->get())
                    ->concat(PostOffice::where('Listing_Status', 'For Rent')->latest()->get());
                break;
            case 'For Sale':
                // Fetch properties with Listing_Status = 'For Sale' from each table
                $properties = $properties
                    ->concat(SaleCondo::where('Listing_Status', 'For Sale')->latest()->get())
                    ->concat(SaleHouseLot::where('Listing_Status', 'For Sale')->latest()->get())
                    ->concat(SaleLot::where('Listing_Status', 'For Sale')->latest()->get())
                    ->concat(SaleWareHouse::where('Listing_Status', 'For Sale')->latest()->get())
                    ->concat(SaleCommSpace::where('Listing_Status', 'For Sale')->latest()->get())
                    ->concat(SaleOffice::where('Listing_Status', 'For Sale')->latest()->get());
                break;
        }
        // Get the total count of properties
        $resultCount = $properties->count();

        // Sort the properties by 'created_at' in descending order
        $sortedProperties = $properties->sortByDesc('created_at');

        // Set the limit of properties per page
        $limit = $request->input('limit', 10);

        // Paginate the sorted properties
        $page = $request->input('page', 1);
        $paginatedProperties = $sortedProperties->forPage($page, $limit);

        // Return the paginated properties
        return [
            'total_pages' => ceil($sortedProperties->count() / $limit),
            'result_count' => $resultCount,
            'properties' => PropertyListingResource::collection($paginatedProperties),
        ];
    }

    public function getBuyCondo(Request $request)
    {
        // Get all request data
        $requestData = $request->all();
        // Log::debug('Request Data:', $requestData);

        // Define the conditions using the when method
        $condosQuery = SaleCondo::query()

            ->where('PropBuildingName', $requestData['PropBuildingName'])
            ->where('PropBaths', $requestData['PropBaths'])
            ->where('PropBeds', $requestData['PropBeds'])
            ->where('PropFurnish', $requestData['PropFurnish'])
            ->whereBetween('PropRate', [$requestData['PropFromRange'], $requestData['PropToRange']])
            ->where('PropCity', $requestData['PropCity'])
            ->where('Listing_status', 'For Sale')
            ->where(function ($query) use ($requestData) {
                $query->whereJsonContains('selectedAmenities', $requestData['PropBalcony'])
                    ->orWhereJsonContains('selectedAmenities', $requestData['PropParking']);
            });
        $condos = $condosQuery->paginate(8);

        // Return the paginated results using a CondoResource
        return BuyCondoResource::collection($condos);
    }

    public function getBuyHouseLot(Request $request)
    {
        $requestData = $request->all();

        // Start with the base query
        $condosQuery = SaleHouseLot::query();

        // Define the conditions using the when method
        $condosQuery
            ->where(function ($query) use ($requestData) {
                if (isset($requestData['PropCarGarage']) && $requestData['PropCarGarage'] !== 'NoGarage') {
                    $query->whereJsonContains('selectedAmenities', $requestData['PropCarGarage']);
                } else {
                    $query->whereJsonDoesntContain('selectedAmenities', $requestData['PropCarGarage']);
                }
            })
            ->whereBetween('PropRate', [$requestData['PropFromRange'], $requestData['PropToRange']])
            ->where('Listing_status', 'For Sale')
            ->where('PropBaths', $requestData['PropBaths'])
            ->where('PropBeds', $requestData['PropBeds'])
            ->where('PropCommVill', $requestData['PropCommVill'])
            ->where('PropCity', $requestData['PropCity']);

        // Apply pagination
        $condos = $condosQuery->paginate(8);

        // Return the paginated results using a CondoResource
        return BuyHouseLotResource::collection($condos);
    }

    public function getBuyLot(Request $request)
    {
        $requestData = $request->all();
        // Start with the base query
        $lotQuery = SaleLot::query();

        // Define the conditions using the when method
        $lotQuery
            ->where('PropSize', $requestData['PropSize'])
            ->whereBetween('PropRate', [$requestData['PropFromRange'], $requestData['PropToRange']])
            ->where('PropCity', $requestData['PropCity'])
            ->where('Listing_status', 'For Sale');

        // Apply pagination
        $lots = $lotQuery->paginate(8);

        return BuyLotResource::collection($lots);
    }

    public function getBuyWareHouse(Request $request)
    {
        $requestData = $request->all();

        $warehouseQuery = SaleWareHouse::query();

        $warehouseQuery
            ->where('PropSize', $requestData['PropSize'])
            ->where('PropPurpose', $requestData['PropPurpose'])
            ->whereBetween('PropRate', [$requestData['PropFromRange'], $requestData['PropToRange']])
            ->where('PropCity', $requestData['PropCity'])
            ->where('Listing_status', 'For Sale');

        $warehouse = $warehouseQuery->paginate(8);

        return BuyWareHouseResource::collection($warehouse);
    }

    public function getBuyCommSpace(Request $request)
    {
        $requestData = $request->all();

        $commSpaceQuery = SaleCommSpace::query();

        $commSpaceQuery
            ->where('PropSize', $requestData['PropSize'])
            ->where('PropPurpose', $requestData['PropPurpose'])
            ->whereBetween('PropRate', [$requestData['PropFromRange'], $requestData['PropToRange']])
            ->where('PropCity', $requestData['PropCity'])
            ->where('Listing_status', 'For Sale');

        $commSpace = $commSpaceQuery->paginate(8);

        return BuyCommSpace::collection($commSpace);
    }

    public function getBuyOffice(Request $request)
    {
        $requestData = $request->all();

        $officeQuery = SaleOffice::query();

        $officeQuery
            ->where('PropSize', $requestData['PropSize'])
            ->where('PropPurpose', $requestData['PropPurpose'])
            ->whereBetween('PropRate', [$requestData['PropFromRange'], $requestData['PropToRange']])
            ->where('PropCity', $requestData['PropCity'])
            ->where('Listing_status', 'For Sale');

        $office = $officeQuery->paginate(8);

        return BuyOfficeResource::collection($office);
    }

    public function getRentCondo(Request $request)
    {
        // Get all request data
        $requestData = $request->all();
        // Log::debug('Request Data:', $requestData);

        // Define the conditions using the when method
        $condosQuery = Rent_Condo::query()

            ->where('PropBuildingName', $requestData['PropBuildingName'])
            ->where('PropBaths', $requestData['PropBaths'])
            ->where('PropBeds', $requestData['PropBeds'])
            ->where('PropFurnish', $requestData['PropFurnish'])
            ->whereBetween('PropRate', [$requestData['PropFromRange'], $requestData['PropToRange']])
            ->where('PropCity', $requestData['PropCity'])
            ->where('Listing_status', 'For Rent')
            ->where(function ($query) use ($requestData) {
                $query->whereJsonContains('selectedAmenities', $requestData['PropBalcony'])
                    ->orWhereJsonContains('selectedAmenities', $requestData['PropParking']);
            });
        $condos = $condosQuery->paginate(8);

        // Return the paginated results using a CondoResource
        return BuyCondoResource::collection($condos);
    }

    public function getRentHouseLot(Request $request)
    {
        $requestData = $request->all();

        // Start with the base query
        $condosQuery = PostHouseLot::query();

        // Define the conditions using the when method
        $condosQuery
            ->where(function ($query) use ($requestData) {
                if (isset($requestData['PropCarGarage']) && $requestData['PropCarGarage'] !== 'NoGarage') {
                    $query->whereJsonContains('selectedAmenities', $requestData['PropCarGarage']);
                } else {
                    $query->whereJsonDoesntContain('selectedAmenities', 'Garage');
                }
            })
            ->whereBetween('PropRate', [$requestData['PropFromRange'], $requestData['PropToRange']])
            ->where('Listing_status', 'For Rent')
            ->where('PropLotArea', $requestData['PropLotArea'])
            ->where('PropFloorArea', $requestData['PropFloorArea'])
            ->where('PropCommVill', $requestData['PropCommVill'])
            ->where('PropCity', $requestData['PropCity']);

        // Apply pagination
        $condos = $condosQuery->paginate(8);

        // Return the paginated results using a CondoResource
        return BuyHouseLotResource::collection($condos);
    }

    public function getRentLot(Request $request)
    {
        $requestData = $request->all();
        // Start with the base query
        $lotQuery = PostLot::query();

        // Define the conditions using the when method
        $lotQuery
            ->where('PropSize', $requestData['PropSize'])
            ->whereBetween('PropRate', [$requestData['PropFromRange'], $requestData['PropToRange']])
            ->where('PropCity', $requestData['PropCity'])
            ->where('Listing_status', 'For Rent');

        // Apply pagination
        $lots = $lotQuery->paginate(8);

        return BuyLotResource::collection($lots);
    }

    public function getRentWareHouse(Request $request)
    {
        $requestData = $request->all();

        $warehouseQuery = PostWareHouse::query();

        $warehouseQuery
            ->where('PropSize', $requestData['PropSize'])
            ->where('PropPurpose', $requestData['PropPurpose'])
            ->whereBetween('PropRate', [$requestData['PropFromRange'], $requestData['PropToRange']])
            ->where('PropCity', $requestData['PropCity'])
            ->where('Listing_status', 'For Rent');

        $warehouse = $warehouseQuery->paginate(8);

        return BuyWareHouseResource::collection($warehouse);
    }

    public function getRentCommSpace(Request $request)
    {
        $requestData = $request->all();

        $commSpaceQuery = PostCommSpace::query();

        $commSpaceQuery
            ->where('PropSize', $requestData['PropSize'])
            ->where('PropPurpose', $requestData['PropPurpose'])
            ->whereBetween('PropRate', [$requestData['PropFromRange'], $requestData['PropToRange']])
            ->where('PropCity', $requestData['PropCity'])
            ->where('Listing_status', 'For Rent');

        $commSpace = $commSpaceQuery->paginate(8);

        return BuyCommSpace::collection($commSpace);
    }

    public function getRentOffice(Request $request)
    {
        $requestData = $request->all();

        $officeQuery = PostOffice::query();

        $officeQuery
            ->where('PropSize', $requestData['PropSize'])
            ->where('PropPurpose', $requestData['PropPurpose'])
            ->whereBetween('PropRate', [$requestData['PropFromRange'], $requestData['PropToRange']])
            ->where('PropCity', $requestData['PropCity'])
            ->where('Listing_status', 'For Rent');

        $office = $officeQuery->paginate(8);

        return BuyOfficeResource::collection($office);
    }

    public function getOneProperty(Request $request)
    {
        // Validate and typecast the UUID
        $id = $request->input('id');
        if (!Str::isUuid($id)) {
            return Response::json(['error' => 'Invalid UUID'], 400);
        }

        // Validate property type
        $property = $request->input('property');
        $validPropertyTypes = [
            'Rent_Condo',
            'PostHouseLot',
            'PostLot',
            'PostWareHouse',
            'PostCommSpace',
            'PostOffice',
            'SaleCondo',
            'SaleCommSpace',
            'SaleHouseLot',
            'SaleLot',
            'SaleOffice',
            'SaleWareHouse',
        ];

        // Find the property based on the type
        $data = null;
        switch ($property) {
            case 'Rent_Condo':
                $data = Rent_Condo::find($id);

                if (!$data) {
                    return response()->json(['error' => 'Property not found'], 404);
                }

                $dataResource = new PropertyResource($data);
                return response()->json($dataResource, 200);
            case 'PostHouseLot':
                $data = PostHouseLot::find($id);

                if (!$data) {
                    return response()->json(['error' => 'Property not found'], 404);
                }

                $dataResource = new HouseLotResource($data);
                return response()->json($dataResource, 200);
                break;
            case 'PostLot':
                $data = PostLot::find($id);

                if (!$data) {
                    return response()->json(['error' => 'Property not found'], 404);
                }

                $dataResource = new LotResource($data);
                return response()->json($dataResource, 200);
                break;
            case 'PostWareHouse':
                $data = PostWareHouse::find($id);
                if (!$data) {
                    return response()->json(['error' => 'Property not found'], 404);
                }

                $dataResource = new WareHouseResource($data);
                return response()->json($dataResource, 200);
                break;
            case 'PostCommSpace':
                $data = PostCommSpace::find($id);

                if (!$data) {
                    return response()->json(['error' => 'Property not found'], 404);
                }

                $dataResource = new CommSpaceResource($data);
                return response()->json($dataResource, 200);
                break;
            case 'PostOffice':
                $data = PostOffice::find($id);

                if (!$data) {
                    return response()->json(['error' => 'Property not found'], 404);
                }

                $dataResource = new OfficeResource($data);
                return response()->json($dataResource, 200);
                break;
            case 'SaleCondo':
                $data = SaleCondo::find($id);

                if (!$data) {
                    return response()->json(['error' => 'Property not found'], 404);
                }

                $dataResource = new PropertyResource($data);
                return response()->json($dataResource, 200);
                break;
            case 'SaleHouseLot':
                $data = SaleHouseLot::find($id);

                if (!$data) {
                    return response()->json(['error' => 'Property not found'], 404);
                }

                $dataResource = new HouseLotResource($data);
                return response()->json($dataResource, 200);
                break;
            case 'SaleLot':
                $data = SaleLot::find($id);

                if (!$data) {
                    return response()->json(['error' => 'Property not found'], 404);
                }

                $dataResource = new LotResource($data);
                return response()->json($dataResource, 200);
                break;
            case 'SaleCommSpace':
                $data = SaleCommSpace::find($id);

                if (!$data) {
                    return response()->json(['error' => 'Property not found'], 404);
                }

                $dataResource = new CommSpaceResource($data);
                return response()->json($dataResource, 200);
                break;
            case 'SaleWareHouse':
                $data = SaleWareHouse::find($id);

                if (!$data) {
                    return response()->json(['error' => 'Property not found'], 404);
                }

                $dataResource = new WareHouseResource($data);
                return response()->json($dataResource, 200);
                break;
            case 'SaleOffice':
                $data = SaleOffice::find($id);

                if (!$data) {
                    return response()->json(['error' => 'Property not found'], 404);
                }

                $dataResource = new OfficeResource($data);
                return response()->json($dataResource, 200);
                break;
        }

    }

    public function getUserPosting()
    {
        $user = Auth::user();

        $condos = Rent_Condo::where('Listing_Status', 'For Rent')->where('user_id', $user->id)->latest()->get();
        $houseLots = PostHouseLot::where('Listing_Status', 'For Rent')->where('user_id', $user->id)->latest()->get();
        $lots = PostLot::where('Listing_Status', 'For Rent')->where('user_id', $user->id)->latest()->get();
        $warehouses = PostWareHouse::where('Listing_Status', 'For Rent')->where('user_id', $user->id)->latest()->get();
        $commSpaces = PostCommSpace::where('Listing_Status', 'For Rent')->where('user_id', $user->id)->latest()->get();
        $offices = PostOffice::where('Listing_Status', 'For Rent')->where('user_id', $user->id)->latest()->get();

        $salecondos = SaleCondo::where('Listing_Status', 'For Sale')->where('user_id', $user->id)->latest()->get();
        $salehouseLots = SaleHouseLot::where('Listing_Status', 'For Sale')->where('user_id', $user->id)->latest()->get();
        $salelots = SaleLot::where('Listing_Status', 'For Sale')->where('user_id', $user->id)->latest()->get();
        $salewarehouses = SaleWareHouse::where('Listing_Status', 'For Sale')->where('user_id', $user->id)->latest()->get();
        $salecommSpaces = SaleCommSpace::where('Listing_Status', 'For Sale')->where('user_id', $user->id)->latest()->get();
        $saleoffices = SaleOffice::where('Listing_Status', 'For Sale')->where('user_id', $user->id)->latest()->get();

        $mergedListings = $condos
            ->merge($houseLots)
            ->merge($lots)
            ->merge($warehouses)
            ->merge($commSpaces)
            ->merge($offices)
            ->merge($salecondos)
            ->merge($salehouseLots)
            ->merge($salelots)
            ->merge($salewarehouses)
            ->merge($salecommSpaces)
            ->merge($saleoffices);

        $perPage = 8;
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $pagedData = $mergedListings->slice(($currentPage - 1) * $perPage, $perPage)->all();
        $paginatedListings = new LengthAwarePaginator($pagedData, count($mergedListings), $perPage, $currentPage);

        // Convert paginated listings to UserListingResource
        $userListingResource = UserListingResource::collection($paginatedListings);

        return $userListingResource;
    }

    public function getFavoritePosting(Request $request)
    {
        $user = auth()->user(); // Assuming you are using authentication

        $favorites = $user->favorites()->with('favoritable')->paginate(8);

        return UserFavorites::collection($favorites);
    }

    public function revFavorite(Request $request)
    {
        $user = auth()->user();
        $requestData = $request->all();

        $favorite = Favorite::where('favoritable_id', $requestData['id'])
            ->where('user_id', $user->id)
            ->firstOrFail();

        // Delete the favorite
        $favorite->delete();

        return response()->json(['message' => 'Favorite deleted successfully']);
    }

    public function revUserListing(Request $request)
    {
        $requestData = $request->all();

        switch ($requestData['property']) {
            case 'Rent_Condo':
                $rentCondo = Rent_Condo::findOrFail($requestData['id']);
                $images = $rentCondo->images;

                foreach ($images as $image) {
                    Storage::disk('public')->delete($image->path);
                }

                $rentCondo->delete();
                return response()->json(['message' => 'record deleted successfully']);
            case 'PostHouseLot':
                $rentHouseLot = PostHouseLot::findOrFail($requestData['id']);

                $images = $rentHouseLot->images;

                foreach ($images as $image) {
                    Storage::disk('public')->delete($image->path);
                }

                $rentHouseLot->delete();
                return response()->json(['message' => 'record deleted successfully']);

                break;

            case 'PostLot':
                $rentLot = PostLot::findOrFail($requestData['id']);
                $images = $rentLot->images;
                foreach ($images as $image) {
                    Storage::disk('public')->delete($image->path);
                }
                $rentLot->delete();
                return response()->json(['message' => 'record deleted successfully']);
                break;

            case 'PostWareHouse':

                $rentWareHouse = PostWareHouse::findOrFail($requestData['id']);

                $images = $rentWareHouse->images;

                foreach ($images as $image) {
                    Storage::disk('public')->delete($image->path);
                }

                $rentWareHouse->delete();
                return response()->json(['message' => 'record deleted successfully']);

                break;
            case 'PostCommSpace':

                $rentCommSpace = PostCommSpace::findOrFail($requestData['id']);

                $images = $rentCommSpace->images;

                foreach ($images as $image) {
                    Storage::disk('public')->delete($image->path);
                }

                $rentCommSpace->delete();
                return response()->json(['message' => 'record deleted successfully']);

                break;
            case 'PostOffice':

                $rentOffice = PostOffice::findOrFail($requestData['id']);

                $images = $rentOffice->images;

                foreach ($images as $image) {
                    Storage::disk('public')->delete($image->path);
                }

                $rentOffice->delete();
                return response()->json(['message' => 'record deleted successfully']);

                break;
            case 'SaleCondo':

                $buyCondo = SaleCondo::findOrFail($requestData['id']);

                $images = $buyCondo->images;

                foreach ($images as $image) {
                    Storage::disk('public')->delete($image->path);
                }

                $buyCondo->delete();
                return response()->json(['message' => 'record deleted successfully']);

                break;
            case 'SaleHouseLot':

                $buyHouseLot = SaleHouseLot::findOrFail($requestData['id']);

                $images = $buyHouseLot->images;

                foreach ($images as $image) {
                    Storage::disk('public')->delete($image->path);
                }

                $buyHouseLot->delete();
                return response()->json(['message' => 'record deleted successfully']);

                break;
            case 'SaleLot':

                $buyLot = SaleLot::findOrFail($requestData['id']);

                $images = $buyLot->images;

                foreach ($images as $image) {
                    Storage::disk('public')->delete($image->path);
                }

                $buyLot->delete();
                return response()->json(['message' => 'record deleted successfully']);

                break;
            case 'SaleWareHouse':

                $buyWareHouse = SaleWareHouse::findOrFail($requestData['id']);

                $images = $buyWareHouse->images;

                foreach ($images as $image) {
                    Storage::disk('public')->delete($image->path);
                }

                $buyWareHouse->delete();
                return response()->json(['message' => 'record deleted successfully']);

                break;
            case 'SaleCommSpace':

                $buyCommSpace = SaleCommSpace::findOrFail($requestData['id']);

                $images = $buyCommSpace->images;

                foreach ($images as $image) {
                    Storage::disk('public')->delete($image->path);
                }

                $buyCommSpace->delete();
                return response()->json(['message' => 'record deleted successfully']);

                break;
            case 'SaleOffice':

                $buyOffice = SaleOffice::findOrFail($requestData['id']);

                $images = $buyOffice->images;

                foreach ($images as $image) {
                    Storage::disk('public')->delete($image->path);
                }

                $buyOffice->delete();
                return response()->json(['message' => 'record deleted successfully']);

                break;

            default:
                return response()->json(['message' => 'No Record found'], 400);
                break;
        }
    }

    //Quick Search for SearchTab Component

    public function getQuickSearch(Request $request)
    {
        $requestData = $request->all();

        switch ($requestData['status'] . '_' . $requestData['propertyType']) {
            case 'rent_condominium':
                $query = Rent_Condo::where('Listing_Status', 'For Rent');
                break;
            case 'rent_houseandlot':
                $query = PostHouseLot::where('Listing_Status', 'For Rent');
                break;
            case 'rent_lot':
                $query = PostLot::where('Listing_Status', 'For Rent');
                break;
            case 'rent_warehouse':
                $query = PostWareHouse::where('Listing_Status', 'For Rent');
                break;
            case 'rent_commercialspace':
                $query = PostCommSpace::where('Listing_Status', 'For Rent');
                break;
            case 'rent_Office':
                $query = PostOffice::where('Listing_Status', 'For Rent');
                break;
            case 'buy_condominium':
                $query = SaleCondo::where('Listing_Status', 'For Sale');
                break;
            case 'buy_houseandlot':
                $query = SaleHouseLot::where('Listing_Status', 'For Sale');
                break;
            case 'buy_lot':
                $query = SaleLot::where('Listing_Status', 'For Sale');
                break;
            case 'buy_warehouse':
                $query = SaleWareHouse::where('Listing_Status', 'For Sale');
                break;
            case 'buy_commercialspace':
                $query = SaleCommSpace::where('Listing_Status', 'For Sale');
                break;
            case 'buy_Office':
                $query = SaleOffice::where('Listing_Status', 'For Sale');
                break;

            default:
                // Handle cases where status or property type is invalid
                return response()->json(['error' => 'Invalid status or property type'], 400);
        }

        if (isset($requestData['city']) && $requestData['city'] !== 'undefined') {
            $query->where('PropCity', $requestData['city']);
        }

        $properties = $query->paginate(8);

        return PropertyListingResource::collection($properties);
    }

}
