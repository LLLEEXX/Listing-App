<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Http\Resources\UserSettings;
use App\Models\BuyRentModel\BuyCommSpace;
use App\Models\BuyRentModel\BuyCondo;
use App\Models\BuyRentModel\BuyHouseLot;
use App\Models\BuyRentModel\BuyLot;
use App\Models\BuyRentModel\BuyOffice;
use App\Models\BuyRentModel\BuyWareHouse;
use App\Models\BuyRentModel\RentCondo;
use App\Models\BuyRentModel\RentHouseLot;
use App\Models\Images;
use App\Models\PostCommSpace;
use App\Models\PostHouseLot;
use App\Models\PostLot;
use App\Models\PostOffice;
use App\Models\PostWareHouse;
use App\Models\profile_image;
use App\Models\Rent_Condo;
use App\Models\SaleCommSpace;
use App\Models\SaleCondo;
use App\Models\SaleHouseLot;
use App\Models\SaleLot;
use App\Models\SaleOffice;
use App\Models\SaleWareHouse;
use App\Models\SubscriptionPlan;
use App\Models\User;
use App\Providers\UserSignedUp;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function getUserLog()
    {
        $user = auth()->user();
        if ($user) {
            return response()->json(['status' => 200], 200);
        } else {
            return response()->json([
                'message' => 'Please log in to continue',
            ], 401);
        }

    }

    public function store(Request $req)
    {
        $userValidator = Validator::make($req->all(), [
            'fullname' => 'required|regex:/^[a-zA-Z\s]+$/|min:3',
            'password' => 'required|confirmed',
            'nationality' => 'required|regex:/^[a-zA-Z\s]+$/',
            'username' => 'required|unique:users|min:3',
            'mobileNum' => 'required|unique:users|regex:/^[0-9]+$/',
            'email' => 'required|email|unique:users',
            'gender' => 'required',
            'recieveUpdate' => 'required|boolean',
            'termsandCon' => 'required|boolean',
        ], [
            'nationality.regex' => 'Nationality must only contain letters',
            'username.unique' => 'The username is already in use',
            'mobileNum.unique' => 'The mobile number is already in use',
            'mobileNum.regex' => 'Mobile Number must only contain numbers',
            'email.unique' => 'The email is already in use',
            'fullname.regex' => 'Fullname must only contain letters',
            'password.confirmed' => 'The passwords does not match',
        ]);

        if ($userValidator->fails()) {
            return response()->json([
                'validation_errs' => $userValidator->messages(),
            ]);
        } else {
            $registerUser = new User;
            $registerUser->fullname = $req->fullname;
            $registerUser->password = $req->password;
            $registerUser->nationality = $req->nationality;
            $registerUser->username = $req->username;
            $registerUser->mobileNum = $req->mobileNum;
            $registerUser->email = $req->email;
            $registerUser->gender = $req->gender;
            $registerUser->recieveUpdate = $req->recieveUpdate;
            $registerUser->termsandCon = $req->termsandCon;
            $registerUser->save();

            $userId = $registerUser->id;

            event(new Registered($registerUser));
            event(new UserSignedUp($registerUser));

            return response()->json([
                'status' => 200,
            ]);
        }
    }

    public function StoreCondoInfo(Request $req)
    {
        $userId = Auth::id();

        $images = $req->file('images');
        if (!$images) {
            return response()->json(['error' => 'No images uploaded.'], 400);
        }

        $validatedData = Validator::make($req->all(), [
            'PropBuildingName' => 'required|string',
            'PropTitle' => 'required|string',
            'PropDesc' => 'required|string',
            'PropBaths' => 'required|regex:/^[0-9]*$/',
            'PropBeds' => 'required|regex:/^[0-9]*$/',
            'PropRate' => 'required|regex:/^[\d,]+$/',
            'PropFurnish' => 'required|string',
            'PropPetAllowed' => 'required|string',
            'PropAdd' => 'required|string',
            'PropCity' => 'required|string',
            'PropNeighborhood' => 'required|string',
            'PropGoogleLink' => 'string',
            'selectedAmenities' => 'nullable',
            'selectedAmenities.*' => 'string',
            'selectedInclusions' => 'nullable',
            'selectedInclusions.*' => 'string',
        ], [
            'PropRate.regex' => 'Invalid value.',
            'PropBaths.regex' => 'Invalid value',
            'PropBeds.regex' => 'Invalid value',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'condo_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $validatedImage = $this->validateImages($req);
            $condoInfoStore = new Rent_Condo();
            $condoInfoStore->user_id = $userId;
            $condoInfoStore->Listing_Status = 'For Rent';
            $condoInfoStore->fill($validatedData);
            $condoInfoStore->save();

            $imagePaths = $this->storeImagesInStorage($validatedImage);

            $this->saveImageInfoToDatabase($imagePaths, $condoInfoStore);

            return response()->json(['message' => 'Condo info stored successfully'], 201);
        }
    }

    public function StoreHouseLotInfo(Request $req)
    {
        $userId = Auth::id();

        $images = $req->file('images');
        if (!$images) {
            return response()->json(['error' => 'No images uploaded.'], 400);
        }

        $validatedData = Validator::make($req->all(), [
            'PropTitle' => 'required|string',
            'PropDesc' => 'required|string',
            'PropCommVill' => 'required|string',
            'PropHouseLotType' => 'required|string',
            'PropSize' => 'required|regex:/^[0-9]*$/',
            'PropLotArea' => 'required|regex:/^[0-9]*$/',
            'PropFloorArea' => 'required|regex:/^[0-9]*$/',
            'PropRate' => 'required|regex:/^[\d,]+$/',
            'PropFurnish' => 'required|string',
            'PropPetAllowed' => 'required|string',
            'PropAdd' => 'required|string',
            'PropCity' => 'required|string',
            'PropNeighborhood' => 'required|string',
            'PropGoogleLink' => 'string',
            'selectedAmenities' => 'nullable',
            'selectedAmenities.*' => 'string',
        ], [
            'PropRate.regex' => 'Invalid value',
            'PropSize.regex' => 'Invalid value',
            'PropLotArea.regex' => 'Invalid value',
            'PropFloorArea.regex' => 'Invalid value',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'houseLot_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $validatedImage = $this->validateImages($req);

            $HouseLotInfoStore = new PostHouseLot();
            $HouseLotInfoStore->user_id = $userId;
            $HouseLotInfoStore->Listing_Status = 'For Rent';
            $HouseLotInfoStore->fill($validatedData);
            $HouseLotInfoStore->save();

            $imagePaths = $this->storeImagesInStorage($validatedImage);

            $this->saveImageInfoToDatabase($imagePaths, $HouseLotInfoStore);

            return response()->json(['message' => 'House Lot info stored successfully'], 201);
        }
    }

    public function StoreLotInfo(Request $req)
    {
        $userId = Auth::id();

        $images = $req->file('images');
        if (!$images) {
            return response()->json(['error' => 'No images uploaded.'], 400);
        }

        $validatedData = Validator::make($req->all(), [
            'PropTitle' => 'required|string',
            'PropDesc' => 'required|string',
            'PropCommVill' => 'required|string',
            'PropSize' => 'required|regex:/^[0-9]*$/',
            'PropPurpose' => 'required',
            'PropRate' => 'required|regex:/^[\d,]+$/',
            'PropAdd' => 'required|string',
            'PropCity' => 'required|string',
            'PropNeighborhood' => 'required|string',
            'PropGoogleLink' => 'string',
        ], [
            'PropRate.regex' => 'Invalid value',
            'PropSize.regex' => 'Invalid value',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'lot_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $validatedImage = $this->validateImages($req);

            $LotInfoStore = new PostLot();
            $LotInfoStore->user_id = $userId;
            $LotInfoStore->Listing_Status = 'For Rent';
            $LotInfoStore->fill($validatedData);
            $LotInfoStore->save();

            $imagePaths = $this->storeImagesInStorage($validatedImage);

            $this->saveImageInfoToDatabase($imagePaths, $LotInfoStore);

            return response()->json(['message' => 'Lot info stored successfully'], 201);
        }
    }

    public function StoreWareHouseInfo(Request $req)
    {
        $userId = Auth::id();

        $images = $req->file('images');
        if (!$images) {
            return response()->json(['error' => 'No images uploaded.'], 400);
        }

        $validatedData = Validator::make($req->all(), [
            'PropTitle' => 'required|string',
            'PropDesc' => 'required|string',
            'PropCommVill' => 'required|string',
            'PropSize' => 'required|regex:/^[0-9]*$/',
            'PropPurpose' => 'required',
            'PropRate' => 'required|regex:/^[\d,]+$/',
            'PropAdd' => 'required|string',
            'PropCity' => 'required|string',
            'PropNeighborhood' => 'required|string',
            'PropGoogleLink' => 'string',
        ], [
            'PropRate.regex' => 'Invalid value',
            'PropSize.regex' => 'Invalid value',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'wareHouse_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $validatedImage = $this->validateImages($req);

            $WareHouseInfoStore = new PostWareHouse();
            $WareHouseInfoStore->user_id = $userId;
            $WareHouseInfoStore->Listing_Status = 'For Rent';
            $WareHouseInfoStore->fill($validatedData);
            $WareHouseInfoStore->save();

            $imagePaths = $this->storeImagesInStorage($validatedImage);

            $this->saveImageInfoToDatabase($imagePaths, $WareHouseInfoStore);

            return response()->json(['message' => 'Warehouse info stored successfully'], 201);
        }
    }

    public function StoreCommSpaceInfo(Request $req)
    {
        $userId = Auth::id();

        $images = $req->file('images');
        if (!$images) {
            return response()->json(['error' => 'No images uploaded.'], 400);
        }

        $validatedData = Validator::make($req->all(), [
            'PropTitle' => 'required|string',
            'PropDesc' => 'required|string',
            'PropSize' => 'required|regex:/^[0-9]*$/',
            'PropPurpose' => 'required',
            'PropRate' => 'required|regex:/^[\d,]+$/',
            'PropAdd' => 'required|string',
            'PropCity' => 'required|string',
            'PropNeighborhood' => 'required|string',
            'PropGoogleLink' => 'string',
        ], [
            'PropRate.regex' => 'Invalid value',
            'PropSize.regex' => 'Invalid value',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'commSpace_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $validatedImage = $this->validateImages($req);

            $CommSpaceInfoStore = new PostCommSpace();
            $CommSpaceInfoStore->user_id = $userId;
            $CommSpaceInfoStore->Listing_Status = 'For Rent';
            $CommSpaceInfoStore->fill($validatedData);
            $CommSpaceInfoStore->save();

            $imagePaths = $this->storeImagesInStorage($validatedImage);

            $this->saveImageInfoToDatabase($imagePaths, $CommSpaceInfoStore);

            return response()->json(['message' => 'Warehouse info stored successfully'], 201);
        }
    }

    public function StoreOfficeInfo(Request $req)
    {
        $userId = Auth::id();

        $images = $req->file('images');
        if (!$images) {
            return response()->json(['error' => 'No images uploaded.'], 400);
        }

        $validatedData = Validator::make($req->all(), [
            'PropTitle' => 'required|string',
            'PropDesc' => 'required|string',
            'PropOfficeType' => 'required|string',
            'PropSize' => 'required|regex:/^[0-9]*$/',
            'PropPurpose' => 'required',
            'PropRate' => 'required|regex:/^[\d,]+$/',
            'PropAdd' => 'required|string',
            'PropCity' => 'required|string',
            'PropNeighborhood' => 'required|string',
            'PropGoogleLink' => 'string',
        ], [
            'PropRate.regex' => 'Invalid value',
            'PropSize.regex' => 'Invalid value',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'office_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $validatedImage = $this->validateImages($req);

            $OfficeInfoStore = new PostOffice();
            $OfficeInfoStore->user_id = $userId;
            $OfficeInfoStore->Listing_Status = 'For Rent';
            $OfficeInfoStore->fill($validatedData);
            $OfficeInfoStore->save();

            $imagePaths = $this->storeImagesInStorage($validatedImage);

            $this->saveImageInfoToDatabase($imagePaths, $OfficeInfoStore);

            return response()->json(['message' => 'Office info stored successfully'], 201);
        }
    }

    private function getLockoutTime($email)
    {
        // Get lockout time if user is temporarily locked out
        $key = 'login_attempts_' . $email;
        $attempts = Cache::get($key, 0);
        if ($attempts >= 5) {
            $lockoutExpiry = Cache::get($key . '_expires_at');
            $now = Carbon::now();
            $lockoutTime = $now->diff($lockoutExpiry)->format('%I');
            return $lockoutTime;
        }
        return null;
    }

    public function login(Request $req)
    {
        // Validate user input
        $req->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $lockoutTime = $this->getLockoutTime($req->email);
        if ($lockoutTime) {
            return response()->json([
                'error' => 'Account temporarily locked. Please try again after 10 minutes',
            ], 429);
        }

        if (Auth::attempt(['email' => $req->email, 'password' => $req->password])) {
            // Retrieve the authenticated user
            $user = auth()->user();

            // Check if the user's email is verified
            if ($user->hasVerifiedEmail()) {
                // Define abilities based on user role
                if ($user->isAdmin()) {
                    $abilities = ['*'];
                } else {
                    $abilities = ['create_post', 'edit_post', 'delete_post'];
                }

                // Generate access token for the authenticated user
                $token = $user->createToken('application', $abilities, now()->addDay(1))->plainTextToken;

                $this->clearLoginAttempts($req->email);

                return response()->json([
                    "status" => 200,
                    "message" => "Login successful",
                    "username" => $user->username,
                    "role" => $user->role,
                    "token" => $token,
                ]);
            } else {
                // Email is not verified
                return response()->json([
                    "status" => 403,
                    "message" => 'Email not verified',
                ]);
            }
        }

        $this->incrementFailedAttempts($req->email);

        return response()->json([
            "status" => 401,
            "message" => 'Invalid credentials',
        ]);
    }

    private function incrementFailedAttempts($email)
    {
        // Increment failed login attempts
        $key = 'login_attempts_' . $email;
        $attempts = Cache::get($key, 0);
        Cache::put($key, $attempts + 1, now()->addMinutes(10));
    }

    private function clearLoginAttempts($email)
    {
        Cache::forget('login_attempts_' . $email);
    }

    public function StoreSaleCondoInfo(Request $req)
    {
        $userId = Auth::id();

        $images = $req->file('images');
        if (!$images) {
            return response()->json(['error' => 'No images uploaded.'], 400);
        }

        $validatedData = Validator::make($req->all(), [
            'PropBuildingName' => 'required|string',
            'PropTitle' => 'required|string',
            'PropDesc' => 'required|string',
            'PropBaths' => 'required|regex:/^[0-9]*$/',
            'PropBeds' => 'required|regex:/^[0-9]*$/',
            'PropRate' => 'required|regex:/^[\d,]+$/',
            'PropFurnish' => 'required|string',
            'otherInclusions' => 'nullable|string',
            'PropPetAllowed' => 'required|string',
            'PropAdd' => 'required|string',
            'PropCity' => 'required|string',
            'PropNeighborhood' => 'required|string',
            'PropGoogleLink' => 'string',
            'selectedAmenities' => 'nullable',
            'selectedAmenities.*' => 'string',
            'selectedInclusions' => 'nullable',
            'selectedInclusions.*' => 'string',
        ], [
            'PropRate.regex' => 'Invalid value.',
            'PropBaths.regex' => 'Invalid value.',
            'PropBeds.regex' => 'Invalid value.',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'condo_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $validatedImage = $this->validateImages($req);

            $SaleCondo = new SaleCondo();
            $SaleCondo->user_id = $userId;
            $SaleCondo->Listing_Status = 'For Sale';
            $SaleCondo->fill($validatedData);
            $SaleCondo->save();

            $imagePaths = $this->storeImagesInStorage($validatedImage);

            $this->saveImageInfoToDatabase($imagePaths, $SaleCondo);

            return response()->json(['message' => 'Condo info stored successfully'], 201);
        }
    }

    public function StoreSaleHouseLotInfo(Request $req)
    {
        $userId = Auth::id();

        $images = $req->file('images');
        if (!$images) {
            return response()->json(['error' => 'No images uploaded.'], 400);
        }

        $validatedData = Validator::make($req->all(), [
            'PropTitle' => 'required|string',
            'PropDesc' => 'required|string',
            'PropCommVill' => 'required|string',
            'PropSize' => 'required|regex:/^[0-9]*$/',
            'PropBaths' => 'nullable|regex:/^[0-9]*$/',
            'PropBeds' => 'nullable|regex:/^[0-9]*$/',
            'PropRate' => 'required|regex:/^[\d,]+$/',
            'PropFurnish' => 'required|string',
            'PropPetAllowed' => 'required|string',
            'PropAdd' => 'required|string',
            'PropCity' => 'required|string',
            'PropNeighborhood' => 'required|string',
            'PropGoogleLink' => 'string',
            'selectedAmenities' => 'nullable',
            'selectedAmenities.*' => 'string',
        ], [
            'PropRate.regex' => 'Invalid value.',
            'PropBaths.regex' => 'Invalid value.',
            'PropBeds.regex' => 'Invalid value.',
            'PropSize.regex' => 'Invalid value.',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'houseLot_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $validatedImage = $this->validateImages($req);

            $SaleHouseLot = new SaleHouseLot();
            $SaleHouseLot->user_id = $userId;
            $SaleHouseLot->Listing_Status = 'For Sale';
            $SaleHouseLot->fill($validatedData);
            $SaleHouseLot->save();

            $imagePaths = $this->storeImagesInStorage($validatedImage);

            $this->saveImageInfoToDatabase($imagePaths, $SaleHouseLot);

            return response()->json(['message' => 'House Lot info stored successfully'], 201);
        }
    }

    public function StoreSaleLotInfo(Request $req)
    {
        $userId = Auth::id();

        $images = $req->file('images');
        if (!$images) {
            return response()->json(['error' => 'No images uploaded.'], 400);
        }

        $validatedData = Validator::make($req->all(), [
            'PropTitle' => 'required|string',
            'PropDesc' => 'required|string',
            'PropCommVill' => 'required|string',
            'PropSize' => 'required|regex:/^[0-9]*$/',
            'PropPurpose' => 'nullable|string',
            'PropRate' => 'required|regex:/^[\d,]+$/',
            'PropAdd' => 'required|string',
            'PropCity' => 'required|string',
            'PropNeighborhood' => 'required|string',
            'PropGoogleLink' => 'string',
        ], [
            'PropRate.regex' => 'Invalid value',
            'PropSize.regex' => 'Invalid value',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'lot_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $validatedImage = $this->validateImages($req);

            $SaleLot = new SaleLot();
            $SaleLot->user_id = $userId;
            $SaleLot->Listing_Status = 'For Sale';
            $SaleLot->fill($validatedData);
            $SaleLot->save();

            $imagePaths = $this->storeImagesInStorage($validatedImage);

            $this->saveImageInfoToDatabase($imagePaths, $SaleLot);

            return response()->json(['message' => 'Lot info stored successfully'], 201);
        }
    }

    public function StoreSaleWareHouseInfo(Request $req)
    {
        $userId = Auth::id();

        $images = $req->file('images');
        if (!$images) {
            return response()->json(['error' => 'No images uploaded.'], 400);
        }

        $validatedData = Validator::make($req->all(), [
            'PropTitle' => 'required|string',
            'PropDesc' => 'required|string',
            'PropCommVill' => 'nullable|string',
            'PropSize' => 'required|regex:/^[0-9]*$/',
            'PropPurpose' => 'required',
            'PropRate' => 'required|regex:/^[\d,]+$/',
            'PropAdd' => 'required|string',
            'PropCity' => 'required|string',
            'PropNeighborhood' => 'required|string',
            'PropGoogleLink' => 'string',
        ], [
            'PropRate.regex' => 'Invalid value',
            'PropSize.regex' => 'Invalid value',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'wareHouse_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $validatedImage = $this->validateImages($req);

            $SaleWareHouse = new SaleWareHouse();
            $SaleWareHouse->user_id = $userId;
            $SaleWareHouse->Listing_Status = 'For Sale';
            $SaleWareHouse->fill($validatedData);
            $SaleWareHouse->save();

            $imagePaths = $this->storeImagesInStorage($validatedImage);

            $this->saveImageInfoToDatabase($imagePaths, $SaleWareHouse);

            return response()->json(['message' => 'Warehouse info stored successfully'], 201);
        }
    }

    public function StoreSaleCommSpaceInfo(Request $req)
    {
        $userId = Auth::id();

        $images = $req->file('images');
        if (!$images) {
            return response()->json(['error' => 'No images uploaded.'], 400);
        }

        $validatedData = Validator::make($req->all(), [
            'PropTitle' => 'required|string',
            'PropDesc' => 'required|string',
            'PropSize' => 'required|regex:/^[0-9]*$/',
            'PropPurpose' => 'required',
            'PropRate' => 'required|regex:/^[\d,]+$/',
            'PropAdd' => 'required|string',
            'PropCity' => 'required|string',
            'PropNeighborhood' => 'required|string',
            'PropGoogleLink' => 'string',
        ], [
            'PropRate.regex' => 'Invalid value',
            'PropSize.regex' => 'Invalid value',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'commSpace_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $validatedImage = $this->validateImages($req);

            $SaleCommSpace = new SaleCommSpace();
            $SaleCommSpace->user_id = $userId;
            $SaleCommSpace->Listing_Status = 'For Sale';
            $SaleCommSpace->fill($validatedData);
            $SaleCommSpace->save();

            $imagePaths = $this->storeImagesInStorage($validatedImage);

            $this->saveImageInfoToDatabase($imagePaths, $SaleCommSpace);

            return response()->json(['message' => 'Comm Space info stored successfully'], 201);
        }
    }

    public function StoreSaleOfficeInfo(Request $req)
    {
        $userId = Auth::id();

        $images = $req->file('images');
        if (!$images) {
            return response()->json(['error' => 'No images uploaded.'], 400);
        }

        $validatedData = Validator::make($req->all(), [
            'PropTitle' => 'required|string',
            'PropDesc' => 'required|string',
            'PropOfficeType' => 'nullable|string',
            'PropSize' => 'required|regex:/^[0-9]*$/',
            'PropPurpose' => 'required',
            'PropRate' => 'required|regex:/^[\d,]+$/',
            'PropAdd' => 'required|string',
            'PropCity' => 'required|string',
            'PropNeighborhood' => 'required|string',
            'PropGoogleLink' => 'string',
        ], [
            'PropRate.regex' => 'Invalid value',
            'PropSize.regex' => 'Invalid value',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'office_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $validatedImage = $this->validateImages($req);

            $SaleOffice = new SaleOffice();
            $SaleOffice->user_id = $userId;
            $SaleOffice->Listing_Status = 'For Sale';
            $SaleOffice->fill($validatedData);
            $SaleOffice->save();

            $imagePaths = $this->storeImagesInStorage($validatedImage);

            $this->saveImageInfoToDatabase($imagePaths, $SaleOffice);

            return response()->json(['message' => 'Office info stored successfully'], 201);
        }
    }

    public function logout(Request $req)
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'status' => 200,
            'message' => 'logged out successfully',
        ]);
    }

    //INQUIRE BUY CONDO
    public function StoreBuyCondo(Request $req)
    {
        $userId = Auth::id();

        $validatedData = Validator::make($req->all(), [
            'Actions' => 'required|string',
            'PropBuildingName' => 'required|string',
            'PropBaths' => 'required|integer',
            'PropBeds' => 'required|integer',
            'PropFurnish' => 'required|string',
            'PropBalcony' => 'required|string',
            'PropParking' => 'required|string',
            'PropFromRange' => 'required|integer',
            'PropToRange' => 'required|integer',
            'PropCity' => 'required|string',
            'PropNeigborhood' => 'required|string',
        ], [
            'PropBaths.integer' => 'Invalid value',
            'PropBeds.integer' => 'Invalid value',
            'PropBaths.required' => 'required',
            'PropCity.required' => 'required',
            'PropBuildingName.required' => 'required',
            'PropNeigborhood.required' => 'required',
            'PropBeds.required' => 'required',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'condo_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $condoInfoStore = new BuyCondo();
            $condoInfoStore->user_id = $userId;
            $condoInfoStore->fill($validatedData);
            $condoInfoStore->save();

            return response()->json(['message' => 'Condo info stored successfully'], 201);
        }
    }

    public function StoreBuyHouseLot(Request $req)
    {
        $userId = Auth::id();
        $validatedData = Validator::make($req->all(), [
            'Actions' => 'required|string',
            'PropCommVill' => 'required|string',
            'PropBaths' => 'required|integer',
            'PropBeds' => 'required|integer',
            'PropCarGarage' => 'required|string',
            'PropFromRange' => 'required|integer',
            'PropToRange' => 'required|integer',
            'PropCity' => 'required|string',
            'PropNeigborhood' => 'required|string',
        ], [
            'PropBaths.integer' => 'Invalid value',
            'PropBeds.integer' => 'Invalid value',
            'PropBaths.required' => 'required',
            'PropBeds.required' => 'required',
            'PropCity.required' => 'required',
            'PropNeigborhood.required' => 'required',
            'PropCommVill.required' => 'required',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'houseLot_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $houseLotInfoStore = new BuyHouseLot();
            $houseLotInfoStore->user_id = $userId;
            $houseLotInfoStore->fill($validatedData);
            $houseLotInfoStore->save();

            return response()->json(['message' => 'house lot info stored successfully'], 201);
        }
    }

    public function StoreBuyLot(Request $req)
    {
        $userId = Auth::id();
        $validatedData = Validator::make($req->all(), [
            'Actions' => 'required|string',
            'PropLotPref' => 'required|string',
            'PropLotUse' => 'required|string',
            'PropSize' => 'required|integer',
            'PropFromRange' => 'required|integer',
            'PropToRange' => 'required|integer',
            'PropCity' => 'required|string',
            'PropNeigborhood' => 'required|string',
        ], [
            'PropSize.integer' => 'Invalid value',
            'PropNeigborhood.required' => 'required',
            'PropSize.required' => 'required',
            'PropCity.required' => 'required',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'lot_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $houseLotInfoStore = new BuyLot();
            $houseLotInfoStore->user_id = $userId;
            $houseLotInfoStore->fill($validatedData);
            $houseLotInfoStore->save();

            return response()->json(['message' => 'house lot info stored successfully'], 201);
        }
    }

    public function StoreBuyWareHouse(Request $req)
    {
        $userId = Auth::id();
        $validatedData = Validator::make($req->all(), [
            'Actions' => 'required|string',
            'PropPurpose' => 'required|string',
            'PropSize' => 'required|integer',
            'PropFromRange' => 'required|integer',
            'PropToRange' => 'required|integer',
            'PropCity' => 'required|string',
            'PropNeigborhood' => 'required|string',
        ], [
            'PropSize.integer' => 'Invalid value',
            'PropSize.required' => 'required',
            'PropCity.required' => 'required',
            'PropNeigborhood.required' => 'required',
            'PropPurpose.required' => 'required',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'warehouse_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $warehouseInfoStore = new BuyWareHouse();
            $warehouseInfoStore->user_id = $userId;
            $warehouseInfoStore->fill($validatedData);
            $warehouseInfoStore->save();

            return response()->json(['message' => 'house lot info stored successfully'], 201);
        }
    }

    public function StoreBuyCommSpace(Request $req)
    {
        $userId = Auth::id();
        $validatedData = Validator::make($req->all(), [
            'Actions' => 'required|string',
            'PropPurpose' => 'required|string',
            'PropSize' => 'required|integer',
            'PropFromRange' => 'required|integer',
            'PropToRange' => 'required|integer',
            'PropCity' => 'required|string',
            'PropNeigborhood' => 'required|string',
        ], [
            'PropSize.integer' => 'Invalid value',
            'PropSize.required' => 'required',
            'PropCity.required' => 'required',
            'PropNeigborhood.required' => 'required',
            'PropPurpose.required' => 'required',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'commspace_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $commspaceInfoStore = new BuyCommSpace();
            $commspaceInfoStore->user_id = $userId;
            $commspaceInfoStore->fill($validatedData);
            $commspaceInfoStore->save();

            return response()->json(['message' => 'Comm Space info stored successfully'], 201);
        }
    }
    public function StoreBuyOffice(Request $req)
    {
        $userId = Auth::id();
        $validatedData = Validator::make($req->all(), [
            'Actions' => 'required|string',
            'PropPurpose' => 'required|string',
            'PropSize' => 'required|integer',
            'PropFromRange' => 'required|integer',
            'PropToRange' => 'required|integer',
            'PropCity' => 'required|string',
            'PropNeigborhood' => 'required|string',
        ], [
            'PropSize.integer' => 'Invalid value',
            'PropSize.required' => 'required',
            'PropCity.required' => 'required',
            'PropNeigborhood.required' => 'required',
            'PropPurpose.required' => 'required',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'office_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $officeInfoStore = new BuyOffice();
            $officeInfoStore->user_id = $userId;
            $officeInfoStore->fill($validatedData);
            $officeInfoStore->save();

            return response()->json(['message' => 'Office info stored successfully'], 201);
        }
    }

    //INQUIRE RENT CONDO
    public function StoreRentCondo(Request $req)
    {
        $userId = Auth::id();
        $validatedData = Validator::make($req->all(), [
            'Actions' => 'required|string',
            'PropBuildingName' => 'required|string',
            'PropBaths' => 'required|integer',
            'PropBeds' => 'required|integer',
            'PropFurnish' => 'required|string',
            'PropBalcony' => 'required|string',
            'PropParking' => 'required|string',
            'PropMoveInDate' => 'required|date',
            'LengthOfStay' => 'required|string',
            'Nationality' => 'required|string',
            'Occupants' => 'required|integer',
            'PetTypes' => 'required|string',
            'PropFromRange' => 'required|integer',
            'PropToRange' => 'required|integer',
            'PropCity' => 'required|string',
            'PropNeigborhood' => 'required|string',
        ], [
            'PropBaths.integer' => 'Invalid value',
            'PropBeds.integer' => 'Invalid value',
            'PropBaths.required' => 'required',
            'PropBeds.required' => 'required',
            'PropBuildingName.required' => 'required',
            'Nationality.required' => 'required',
            'Occupants.integer' => 'Invalid value',
            'Occupants.required' => 'required',
            'PropMoveInDate.required' => 'required',
            'PropCity.required' => 'required',
            'PropNeigborhood.required' => 'required',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'condo_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $condoInfoStore = new RentCondo();
            $condoInfoStore->user_id = $userId;
            $condoInfoStore->fill($validatedData);
            $condoInfoStore->save();

            return response()->json(['message' => 'Condo info stored successfully'], 201);
        }
    }

    public function StoreRentHouseLot(Request $req)
    {
        $userId = Auth::id();
        $validatedData = Validator::make($req->all(), [
            'Actions' => 'required|string',
            'PropCommVill' => 'required|string',
            'PropLotArea' => 'required|integer',
            'PropFloorArea' => 'required|integer',
            'PropFurnish' => 'required|string',
            'PropBalcony' => 'required|string',
            'PropCarGarage' => 'required|string',
            'PropMoveInDate' => 'required|date',
            'LengthOfStay' => 'required|string',
            'Nationality' => 'required|string',
            'Occupants' => 'required|integer',
            'PetTypes' => 'required|string',
            'PropFromRange' => 'required|integer',
            'PropToRange' => 'required|integer',
            'PropCity' => 'required|string',
            'PropNeigborhood' => 'required|string',
        ], [
            'PropLotArea.integer' => 'Invalid value',
            'PropLotArea.required' => 'required',
            'PropFloorArea.integer' => 'Invalid value',
            'PropFloorArea.required' => 'required',
            'PropCommVill.required' => 'required',
            'Nationality.required' => 'required',
            'Occupants.integer' => 'Invalid value',
            'Occupants.required' => 'required',
            'PropMoveInDate.required' => 'required',
            'PropCity.required' => 'required',
            'PropNeigborhood.required' => 'required',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'houseLot_errs' => $validatedData->messages(),
            ]);
        } else {
            $validatedData = $validatedData->validated();

            $condoInfoStore = new RentHouseLot();
            $condoInfoStore->user_id = $userId;
            $condoInfoStore->fill($validatedData);
            $condoInfoStore->save();

            return response()->json(['message' => 'houseLot info stored successfully'], 201);
        }
    }

    private function validateImages(Request $request): array
    {
        return $request->validate([
            'images.*' => 'required|file|mimes:jpg,jpeg,png,webp',
        ]);
    }

    private function storeImagesInStorage(array $validatedData): array
    {
        $imagePaths = [];
        foreach ($validatedData['images'] as $image) {
            $fileName = str()->uuid() . '.' . $image->extension();
            $path = Storage::disk('public')->putFileAs('images', $image, $fileName);
            $imagePaths[] = $path;
        }
        return $imagePaths;
    }

    private function saveImageInfoToDatabase(array $imagePaths, $propertyStore)
    {
        foreach ($imagePaths as $path) {
            $image = new Images();
            $image->path = $path;
            $propertyStore->images()->save($image);
        }
    }

    //GET USER INFO
    public function getUser(Request $request)
    {
        $user = Auth::user()->load('subscription');

        // Return the user resource
        return new UserResource($user);
    }

    //GET USER INFO FOR SETTING
    public function getUserInfoSetting(Request $request)
    {
        return new UserSettings(Auth::user());
    }
    //UPDATE USER INFO FOR SETTING
    public function updateUserInfoSetting(Request $request)
    {
        // Step 1: Validation
        $request->validate([
            'fullname' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'mobileNum' => 'required|string|max:15', // Adjust max length as needed
            'email' => 'required|email|max:255',
            'updatesCheck' => 'boolean',
        ]);

        try {
            // Step 2: Update Database
            $user = auth()->user();
            $user->update([
                'fullname' => $request->input('fullname'),
                'username' => $request->input('username'),
                'mobileNum' => $request->input('mobileNum'),
                'email' => $request->input('email'),
                'updatesCheck' => $request->input('updatesCheck', false), // Set to false if not provided
            ]);

            return response()->json(['message' => 'User information updated successfully']);
        } catch (\Exception $e) {
            // Step 3: Response - Handle errors
            // Log the error for debugging purposes
            \Log::error('Error updating user information: ' . $e->getMessage());

            return response()->json(['message' => 'Failed to update user information'], 500);
        }
    }
    //GET USER PROFILE
    public function getProfileImage()
    {
        // Logic to fetch the profile image path from the database
        // For example, if you have a ProfileImage model:
        $profileImage = profile_image::where('user_id', auth()->id())->first(); // Assuming you have a user_id column

        // Check if profile image exists for the user
        if ($profileImage) {
            // Return the profile image path
            return response()->json(['profile_image' => $profileImage->file_image]);
        } else {
            // Return default profile image path if not found
            return response()->json(['profile_image' => '/assets/Profile-Images/default.jpg']);
        }
    }

    // UPDATE USER PROFILE
    public function updateUserProfileImage(Request $request)
    {
        // Step 1: Validation
        $request->validate([
            'profile_image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        try {
            // Step 2: Update Database
            $user = Auth::user();
            if ($image = $request->file('profile_image')) {
                $fileName = Str::uuid() . '.' . $image->extension();
                $path = Storage::disk('public')->putFileAs('profile-images', $image, $fileName);

                // Check if the user already has a profile image
                if ($user->profile_image) {
                    // Delete the existing profile image file
                    if (Storage::disk('public')->exists($user->profile_image->file_image)) {
                        Storage::disk('public')->delete($user->profile_image->file_image);
                    }
                    // Update the file_image column with the new image path
                    $user->profile_image->file_image = $path;
                    $user->profile_image->save();
                } else {
                    // Create a new profile image record
                    $profileImage = new profile_image;
                    $profileImage->file_image = $path;
                    $profileImage->user_id = $user->id;
                    $profileImage->save();
                }
            }

            return response()->json(['message' => 'User profile image updated successfully']);
        } catch (\Exception $e) {
            \Log::error('Error updating user profile image: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to update user profile image'], 500);
        }
    }

    //Neighborhood
    public function getAllNeighborhoods()
    {
        // Retrieve neighborhoods from Model1 and Model2
        $Neigh1 = Rent_Condo::pluck('PropNeighborhood')->toArray();
        $Neigh2 = PostHouseLot::pluck('PropNeighborhood')->toArray();
        $Neigh3 = PostLot::pluck('PropNeighborhood')->toArray();
        $Neigh4 = PostWareHouse::pluck('PropNeighborhood')->toArray();
        $Neigh5 = PostCommSpace::pluck('PropNeighborhood')->toArray();
        $Neigh6 = PostOffice::pluck('PropNeighborhood')->toArray();

        $Neigh7 = SaleCondo::pluck('PropNeighborhood')->toArray();
        $Neigh8 = SaleHouseLot::pluck('PropNeighborhood')->toArray();
        $Neigh9 = SaleLot::pluck('PropNeighborhood')->toArray();
        $Neigh10 = SaleWareHouse::pluck('PropNeighborhood')->toArray();
        $Neigh11 = SaleCommSpace::pluck('PropNeighborhood')->toArray();
        $Neigh12 = SaleOffice::pluck('PropNeighborhood')->toArray();

        // Merge and remove duplicates
        $neighborhoods = array_unique(array_merge($Neigh1, $Neigh2, $Neigh3,
            $Neigh4, $Neigh5, $Neigh6, $Neigh7, $Neigh8, $Neigh9, $Neigh10, $Neigh11, $Neigh12));

        return response()->json($neighborhoods);
    }

    
}
