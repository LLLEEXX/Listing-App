<?php

namespace App\Http\Resources\fetchProperty;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfficeResource extends JsonResource
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
            'rate' => $this->PropRate,
            'officeType' => $this->PropOfficeType,
            'purpose' => $this->PropPurpose,
            'size' => $this->PropSize,
            'address' => $this->PropAdd,
            'city' => $this->PropCity,
            'googleLink' => $this->PropGoogleLink,
            'users' => $this->users->fullname,
            'images' => $this->images,
            'proptype' => 'Office',
        ];
    }
}
