<?php

namespace App\Filament\Resources\Biographies\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Forms\Components\TextArea;

class BiographyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextArea::make('content')
                    ->required(),
                FileUpload::make('image')
                    ->image()
                    ->maxSize(10240)
                    ->required()
                    ->disk('public'),
                Repeater::make('experience')
                    ->schema([
                        TextInput::make('title')
                            ->label('Deneyim')
                            ->required(),
                    ])
                    ->addActionLabel('Deneyim Ekle')
                    ->minItems(1)
                    ->required()
                    ->columnSpanFull(),
            ]);
    }
}
