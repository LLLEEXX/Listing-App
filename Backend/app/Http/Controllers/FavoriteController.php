<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::id();

        $existingFavorite = Favorite::where('user_id', $user)
            ->where('favoritable_id', $request->Prop_id)
            ->where('favoritable_type', 'App\Models\\'.$request->Property)
            ->exists();

        if ($existingFavorite) {
            return response()->json([
                'message' => 'Property already added to favorites',
            ], 422); 
        }

        $favorite = new Favorite();
        $favorite->user_id = $user;
        $favorite->favoritable_id = $request->Prop_id;
        $favorite->favoritable_type = 'App\Models\\'.$request->Property;

        $favorite->save();
    }
}
