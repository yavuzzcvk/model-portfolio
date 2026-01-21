<?php

namespace App\Filament\Resources\Galleries\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class GalleryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Toggle::make('is_published')
                    ->label('Galeri Yayınlansın mı?')
                    ->default(false),
                TextInput::make('order')
                    ->numeric()
                    ->default(0),
                Repeater::make('mediaItems')
                    ->relationship('mediaItems')
                    ->label('Medya Öğeleri')
                    ->minItems(1)
                    ->defaultItems(1)
                    ->columnSpanFull()
                    ->schema([
                        Select::make('media_type')
                            ->label('Medya Tipi')
                            ->options([
                                'image' => 'Fotoğraf',
                                'video' => 'Video',
                            ])
                            ->default('image')
                            ->required()
                            ->reactive(),
                        FileUpload::make('image_path')
                            ->label('Görsel')
                            ->image()
                            ->disk('public')
                            ->directory('gallery-images')
                            ->maxSize(10240)
                            ->required(fn (callable $get) => $get('media_type') === 'image')
                            ->visible(fn (callable $get) => $get('media_type') === 'image'),
                        FileUpload::make('video_path')
                            ->label('Video')
                            ->acceptedFileTypes([
                                'video/mp4',
                                'video/quicktime',
                                'video/x-m4v',
                            ])
                            ->disk('public')
                            ->directory('gallery-videos')
                            ->maxSize(512000)
                            ->required(fn (callable $get) => $get('media_type') === 'video')
                            ->visible(fn (callable $get) => $get('media_type') === 'video'),
                        Toggle::make('is_published')
                            ->label('Bu medya yayınlansın mı?')
                            ->default(true),
                        TextInput::make('order')
                            ->numeric()
                            ->default(0),
                    ])
                    ->addActionLabel('Medya Ekle'),
            ]);
    }
}
