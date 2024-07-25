<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserInquiryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $createdAt = Carbon::parse($this->created_at);

        return [
            'id' => $this->id,
            'name' => $this->fullname,
            'email' => $this->email,
            'created_year' => $createdAt->year,
            'profile_picture' => optional($this->profile_image)->file_image,
        ];
    }
}
