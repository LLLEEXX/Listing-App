<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\LengthAwarePaginator;

class PropertyListingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        $modelName = class_basename($this->resource);

        // Initialize default pagination metadata
        $pagination = [
            'total' => 0,
            'perPage' => 0,
            'currentPage' => 1,
            'lastPage' => 1,
        ];

        // Check if the resource is a LengthAwarePaginator
        if ($this->resource instanceof LengthAwarePaginator) {
            // Set pagination metadata from the paginator
            $pagination = [
                'total' => $this->resource->total(),
                'perPage' => $this->resource->perPage(),
                'currentPage' => $this->resource->currentPage(),
                'lastPage' => $this->resource->lastPage(),
            ];
        }

        return [
            'id' => $this->id,
            'title' => $this->PropTitle,
            'address' => $this->PropAdd,
            'City' => $this->PropCity,
            'images' => $this->images,
            'pagination' => $pagination,
            'status' => $this->Listing_Status,
            'modelName' => $modelName
        ];
    }
}
