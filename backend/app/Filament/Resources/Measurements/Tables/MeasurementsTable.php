<?php

namespace App\Filament\Resources\Measurements\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class MeasurementsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('height_cm')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('weight_kg')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('chest_in')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('waist_in')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('hips_in')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('shoe_size')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('shoe_region')
                    ->searchable(),
                TextColumn::make('suit_size')
                    ->searchable(),
                TextColumn::make('jacket_size')
                    ->searchable(),
                TextColumn::make('eye_color')
                    ->searchable(),
                TextColumn::make('hair_color')
                    ->searchable(),
                TextColumn::make('hair_length')
                    ->searchable(),
                TextColumn::make('skin_tone')
                    ->searchable(),
                TextColumn::make('body_type')
                    ->searchable(),
                TextColumn::make('tattoos')
                    ->searchable(),
                TextColumn::make('piercings')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
