<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\GalleryMediaItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class GalleryController extends Controller
{
    public function index(): JsonResponse
    {
        $galleries = Gallery::query()
            ->with(['mediaItems' => fn ($query) => $query->orderBy('order')])
            ->orderBy('order')
            ->get();

        return response()->json($galleries);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validatedData($request, false);

        $gallery = DB::transaction(function () use ($data) {
            $mediaItems = $data['media_items'] ?? [];
            unset($data['media_items']);

            $gallery = Gallery::create($data);

            if (!empty($mediaItems)) {
                $gallery->mediaItems()->createMany($mediaItems);
            }

            return $gallery->load(['mediaItems' => fn ($query) => $query->orderBy('order')]);
        });

        return response()->json($gallery, Response::HTTP_CREATED);
    }

    public function show(Gallery $gallery): JsonResponse
    {
        $gallery->load(['mediaItems' => fn ($query) => $query->orderBy('order')]);

        return response()->json($gallery);
    }

    public function update(Request $request, Gallery $gallery): JsonResponse
    {
        $data = $this->validatedData($request, true);

        $gallery = DB::transaction(function () use ($gallery, $data) {
            $mediaItems = $data['media_items'] ?? null;
            unset($data['media_items']);

            if (!empty($data)) {
                $gallery->update($data);
            }

            if (is_array($mediaItems)) {
                $gallery->mediaItems()->delete();
                if (!empty($mediaItems)) {
                    $gallery->mediaItems()->createMany($mediaItems);
                }
            }

            return $gallery->load(['mediaItems' => fn ($query) => $query->orderBy('order')]);
        });

        return response()->json($gallery);
    }

    public function destroy(Gallery $gallery): JsonResponse
    {
        $gallery->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    private function validatedData(Request $request, bool $partial): array
    {
        $required = $partial ? 'sometimes' : 'required';

        return $request->validate([
            'image' => [$partial ? 'sometimes' : 'nullable', 'nullable', 'string', 'max:255'],
            'video' => [$partial ? 'sometimes' : 'nullable', 'nullable', 'string', 'max:255'],
            'file_path' => [$partial ? 'sometimes' : 'nullable', 'nullable', 'string', 'max:255'],
            'is_published' => [$required, 'boolean'],
            'order' => [$required, 'integer', 'min:0'],
            'media_items' => [$partial ? 'sometimes' : 'nullable', 'array'],
            'media_items.*.media_type' => ['required', Rule::in([GalleryMediaItem::TYPE_IMAGE, GalleryMediaItem::TYPE_VIDEO])],
            'media_items.*.image_path' => ['nullable', 'string', 'max:255'],
            'media_items.*.video_path' => ['nullable', 'string', 'max:255'],
            'media_items.*.is_published' => ['nullable', 'boolean'],
            'media_items.*.order' => ['nullable', 'integer', 'min:0'],
        ]);
    }
}
