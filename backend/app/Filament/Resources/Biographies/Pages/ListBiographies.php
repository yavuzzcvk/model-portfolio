<?php

namespace App\Filament\Resources\Biographies\Pages;

use App\Filament\Resources\Biographies\BiographyResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListBiographies extends ListRecords
{
    protected static string $resource = BiographyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
