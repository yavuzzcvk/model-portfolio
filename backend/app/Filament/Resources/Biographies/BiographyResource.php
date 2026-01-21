<?php

namespace App\Filament\Resources\Biographies;

use App\Filament\Resources\Biographies\Pages\CreateBiography;
use App\Filament\Resources\Biographies\Pages\EditBiography;
use App\Filament\Resources\Biographies\Pages\ListBiographies;
use App\Filament\Resources\Biographies\Schemas\BiographyForm;
use App\Filament\Resources\Biographies\Tables\BiographiesTable;
use App\Models\Biography;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class BiographyResource extends Resource
{
    protected static ?string $model = Biography::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'Biography';

    public static function form(Schema $schema): Schema
    {
        return BiographyForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return BiographiesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListBiographies::route('/'),
            'create' => CreateBiography::route('/create'),
            'edit' => EditBiography::route('/{record}/edit'),
        ];
    }
}
