<?php

namespace App\Filament\Resources\Settings\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class SettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('email')
                    ->label('Email address')
                    ->email(),
                TextInput::make('phone')
                    ->tel(),
                TextInput::make('address'),
                TextInput::make('instagram'),
                TextInput::make('twitter'),
                TextInput::make('facebook'),
                TextInput::make('linkedin'),
                TextInput::make('youtube'),
                TextInput::make('tiktok'),
                TextInput::make('github'),
            ]);
    }
}
