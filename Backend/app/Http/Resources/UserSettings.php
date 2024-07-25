<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserSettings extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'fullname' => $this->fullname,
            'email' => $this->email,
            'mobileNum' => $this->mobileNum,
            'receiveEmail' => $this->recieveUpdate,
            'username' => $this->username
        ];
    }
}
