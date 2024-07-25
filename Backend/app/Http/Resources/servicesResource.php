<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class servicesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'comp_Name' => $this->comp_Name,
            'address' => $this->address,
            'contact_Num' => $this->contact_Num,
            'email' => $this->email,
            'service' => $this->service,
            'image' => $this->image,
            'expired_at' => $this->expired_at,
        ];
    }
}
