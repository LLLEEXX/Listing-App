<?php

namespace App\Http\Resources\fetchProperty;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HouseLotResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->PropTitle,
            'desc' => $this->PropDesc,
            'vill' => $this->PropCommVill,
            'houseType' => $this->PropHouseLotType,
            'lotArea' => $this->PropLotArea,
            'floorArea' => $this->PropFloorArea,
            'rate' => $this->PropRate,
            'furnish' => $this->PropFurnish,
            'pet' => $this->PropPetAllowed,
            'address' => $this->PropAdd,
            'city' => $this->PropCity,
            'googleLink' => $this->PropGoogleLink,
            'amenities' => $this->selectedAmenities,
            'users' => $this->users->fullname,
            'images' => $this->images,
            'proptype' => 'House And Lot',
        ];
    }
}
