<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class PropertyCountResource extends JsonResource
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
            'id' => $this->id,
            'title' => $this->PropTitle,
            'listingStatus' => $this->Listing_Status,
            'users' => $this->users->fullname,
            'modelName' => $modelName,
        ];
    }

}
