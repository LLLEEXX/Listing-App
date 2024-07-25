<?php

use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\fetchProperty;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\servicesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserSecController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\LeadsController;
use App\Http\Controllers\InquiryController;
use Illuminate\Support\Facades\Route;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

//Open Routes
Route::post('add-user', [UserController::class, 'store']);
Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verify'])->name('verification.verify');

//fetch featured Props
Route::get('latest-property-listings', [fetchProperty::class, 'getLatestPropertyListings']);
Route::get('get-all-properties', [fetchProperty::class, 'getAllProperties']);

//fetch Properties


Route::post('login', [UserController::class, 'login']);
Route::post('forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);

Route::get('service-needed', [servicesController::class, 'getUnitCleaning']);

Route::get('fetch-banner', [servicesController::class, 'fetchBanner']);

//FETCH INQUIRIES
Route::get('inq-condo', [fetchProperty::class, 'getBuyCondo']);
Route::get('inq-houselot', [fetchProperty::class, 'getBuyHouseLot']);
Route::get('inq-lot', [fetchProperty::class, 'getBuyLot']);
Route::get('inq-warehouse', [fetchProperty::class, 'getBuyWareHouse']);
Route::get('inq-commspace', [fetchProperty::class, 'getBuyCommSpace']);
Route::get('inq-office', [fetchProperty::class, 'getBuyOffice']);

Route::get('inq-rent-condo', [fetchProperty::class, 'getRentCondo']);
Route::get('inq-rent-houselot', [fetchProperty::class, 'getRentHouseLot']);
Route::get('inq-rent-lot', [fetchProperty::class, 'getRentLot']);
Route::get('inq-rent-warehouse', [fetchProperty::class, 'getRentWareHouse']);
Route::get('inq-rent-commspace', [fetchProperty::class, 'getRentCommSpace']);
Route::get('inq-rent-office', [fetchProperty::class, 'getRentOffice']);

Route::get('quick-search', [fetchProperty::class, 'getQuickSearch']);

Route::get('fetch-price', [UserSecController::class, 'getSubscriptions']);

Route::post('reset-password', [ResetPasswordController::class, 'reset']);

//Protected Routes
Route::group(["middleware" => ['auth:sanctum', 'abilities:create_post,edit_post,delete_post'],
], function () {
    Route::post('logout', [UserController::class, 'logout']);
    Route::get('user-info', [UserController::class, 'getUser']);
    Route::get('account-settings', [UserController::class, 'getUserInfoSetting']);
    Route::post('update-account', [UserController::class, 'updateUserInfoSetting']);
    Route::get('fetch-profile-image', [UserController::class, 'getProfileImage']);
    Route::post('update-profile-image', [UserController::class, 'updateUserProfileImage']);
    Route::get('fetch-OneProp', [fetchProperty::class, 'getOneProperty']);
    Route::post('insert-favorite', [FavoriteController::class, 'store']);

    //GET LEADS
    Route::get('fetch-leads', [LeadsController::class, 'getLeads']);
    Route::get('fetch-userLead', [LeadsController::class, 'getUserLead']);

    //INQUIRY
    Route::get('fetch-UserProfile', [InquiryController::class, 'userInquire']);
    Route::post('send-inquiry', [InquiryController::class, 'userMail']);

    //UserProfile
    Route::get('user-Listing', [fetchProperty::class, 'getUserPosting']);
    Route::get('user-Favorite', [fetchProperty::class, 'getFavoritePosting']);
    Route::delete('user-revListing', [fetchProperty::class, 'revUserListing']);
    Route::delete('user-revFave', [fetchProperty::class, 'revFavorite']);

    //Post Rent
    Route::get('neighborhoods', [UserController::class, 'getAllNeighborhoods']);
    Route::post('post-condo', [UserController::class, 'StoreCondoInfo']);
    Route::post('post-houseLot', [UserController::class, 'StoreHouseLotInfo']);
    Route::post('post-lot', [UserController::class, 'StoreLotInfo']);
    Route::post('post-office', [UserController::class, 'StoreOfficeInfo']);
    Route::post('post-warehouse', [UserController::class, 'StoreWareHouseInfo']);
    Route::post('post-commspace', [UserController::class, 'StoreCommSpaceInfo']);

    //Post Sale
    Route::post('sale-condo', [UserController::class, 'StoreSaleCondoInfo']);
    Route::post('sale-houseLot', [UserController::class, 'StoreSaleHouseLotInfo']);
    Route::post('sale-lot', [UserController::class, 'StoreSaleLotInfo']);
    Route::post('sale-warehouse', [UserController::class, 'StoreSaleWareHouseInfo']);
    Route::post('sale-commspace', [UserController::class, 'StoreSaleCommSpaceInfo']);
    Route::post('sale-office', [UserController::class, 'StoreSaleOfficeInfo']);

    //BUY PROPS
    Route::post('buy-condo', [UserController::class, 'StoreBuyCondo']);
    Route::post('buy-houselot', [UserController::class, 'StoreBuyHouseLot']);
    Route::post('buy-lot', [UserController::class, 'StoreBuyLot']);
    Route::post('buy-warehouse', [UserController::class, 'StoreBuyWareHouse']);
    Route::post('buy-commspace', [UserController::class, 'StoreBuyCommSpace']);
    Route::post('buy-office', [UserController::class, 'StoreBuyOffice']);

    //RENT PROPS
    Route::post('rent-condo', [UserController::class, 'StoreRentCondo']);
    Route::post('rent-houselot', [UserController::class, 'StoreRentHouseLot']);
});

Route::group(["middleware" => ['auth:sanctum', 'abilities:*', 'admin'],
], function () {
    Route::get('user-InforSec', [UserSecController::class, 'getUserSec']);
    Route::get('prop-count', [UserSecController::class, 'getCountAllProp']);
    Route::get('prop-listing', [UserSecController::class, 'fetchPropertyListing']);
    Route::get('prop-listing-Monthly', [UserSecController::class, 'fetchMonthlyPropertyListing']);

    //Subscriptions
    Route::get('fetch-subscription', [UserSecController::class, 'getSubscriptions']);
    Route::put('update-price', [UserSecController::class, 'updateSubscription']);

    Route::post('post-services', [UserSecController::class, 'storePropServices']);
    Route::get('fetch-Services', [servicesController::class, 'getServices']);
    Route::post('display-banner', [servicesController::class, 'displayBanner']);
    Route::post('remove-banner', [servicesController::class, 'removeBanner']);
});
