<?php

namespace App\Filament\Resources\Measurements\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class MeasurementForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('height_cm')
                    ->required()
                    ->numeric(),
                TextInput::make('weight_kg')
                    ->numeric(),
                TextInput::make('chest_in')
                    ->required()
                    ->numeric(),
                TextInput::make('waist_in')
                    ->required()
                    ->numeric(),
                TextInput::make('hips_in')
                    ->numeric(),
                TextInput::make('shoe_size')
                    ->required()
                    ->numeric(),
                TextInput::make('shoe_region')
                    ->required()
                    ->default('TR'),
                TextInput::make('suit_size'),
                TextInput::make('jacket_size'),
                TextInput::make('eye_color')
                    ->required()
                    ->default('Kahverengi'),
                TextInput::make('hair_color')
                    ->required()
                    ->default('Koyu Kahverengi'),
                TextInput::make('hair_length')
                    ->required()
                    ->default('Kısa'),
                TextInput::make('skin_tone')
                    ->required()
                    ->default('Buğday'),
                TextInput::make('body_type'),
                TextInput::make('tattoos')
                    ->required()
                    ->default('Yok'),
                TextInput::make('piercings')
                    ->required()
                    ->default('Yok'),
            ]);
    }
}
