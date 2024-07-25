<?php

namespace App\Http\Resources\userLeads;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CondoRentLeadResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $modelName = class_basename($this->resource);
        return [
            'propType' => $modelName,
            'image' => optional($this->users->profile_image)->file_image,
            'fullname' => $this->users->fullname,
            'email' => $this->users->email,
            'number' => $this->users->mobileNum,
            'Building' => $this->PropBuildingName,
            'Baths' => $this->PropBaths,
            'Beds' => $this->PropBeds,
            'Furnish' => $this->PropFurnish,
            'Parking' => $this->PropParking,
            'MoveIn' => $this->PropMoveInDate,
            'stay' => $this->LengthOfStay ,
            'Occupants' => $this->Occupants,
            'PetTypes' => $this->PetTypes,
            'Balcony' => $this->PropBalcony,
            'city' => $this->PropCity,
            'neighbor' => $this->PropNeigborhood,
            'propType' => $modelName,
            'budgetFrom' => $this->PropFromRange,
            'budgetTo' => $this->PropToRange,
            'created_at' => $this->created_at,
        ];
    }
}
