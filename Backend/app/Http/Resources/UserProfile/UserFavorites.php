<?php

namespace App\Http\Resources\UserProfile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserFavorites extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $propertyUser = $this->favoritable->users;
        return [
            'property_id' => $this->favoritable_id,
            'property_type' => class_basename($this->favoritable_type),
            'property_title' => $this->favoritable->PropTitle,
            'property_status' => $this->favoritable->Listing_Status,
            'user_full_name' => $propertyUser->fullname,
        ];
    }
}
