<?php

namespace App\Http\Resources\fetchInquireProperty;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BuyWareHouseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'PropTitle' => $this->PropTitle,
            'PropAdd' => $this->PropAdd,
            'PropCity' => $this->PropCity,
            'PropType' => 'Warehouse',
            'status' => $this->Listing_Status,
            'images' => $this->images,
        ];
    }
}
