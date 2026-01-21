<?php

namespace App\Filament\Resources\Biographies\Pages;

use App\Filament\Resources\Biographies\BiographyResource;
use Filament\Resources\Pages\CreateRecord;

class CreateBiography extends CreateRecord
{
    protected static string $resource = BiographyResource::class;
}
