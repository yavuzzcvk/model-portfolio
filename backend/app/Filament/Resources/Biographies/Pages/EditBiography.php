<?php

namespace App\Filament\Resources\Biographies\Pages;

use App\Filament\Resources\Biographies\BiographyResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditBiography extends EditRecord
{
    protected static string $resource = BiographyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
