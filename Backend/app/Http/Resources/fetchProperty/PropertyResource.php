<?php

namespace App\Http\Resources\fetchProperty;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $createdAt = Carbon::parse($this->users->created_at);
        return [
            'title' => $this->PropTitle,
            'desc' => $this->PropDesc,
            'buildName' => $this->PropBuildingName,
            'baths' => $this->PropBaths,
            'beds' => $this->PropBeds,
            'rate' => $this->PropRate,
            'furnish' => $this->PropFurnish,
            'otherInclu' => $this->otherInclusions,
            'pet' => $this->PropPetAllowed,
            'address' => $this->PropAdd,
            'city' => $this->PropCity,
            'googleLink' => $this->PropGoogleLink,
            'amenities' => $this->selectedAmenities,
            'inclusions' => $this->selectedInclusions,
            'users' => $this->users->fullname,
            'profile' => optional($this->users->profile_image)->file_image,
            'created_year' => $createdAt->year,
            'images' => $this->images,
            'proptype' => 'Condominium',
        ];
    }
}
