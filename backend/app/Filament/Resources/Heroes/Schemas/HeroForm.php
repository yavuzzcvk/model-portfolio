<?php

namespace App\Filament\Resources\Heroes\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\FileUpload;

class HeroForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                FileUpload::make('image')
                    ->label('Hero Image')
                    ->disk('public')
                    ->directory('hero-images')
                    ->required()
                    ->image(),
            ]);
    }
}
