<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeadsResource extends JsonResource
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
            'fullname' => $this->users->fullname,
            'city' => $this->PropCity,
            'action' => $this->Actions,
            'propType' => $modelName,
            'budgetFrom' => $this->PropFromRange,
            'budgetTo' => $this->PropToRange,
            'created_at' => $this->created_at,
        ];
    }
}
