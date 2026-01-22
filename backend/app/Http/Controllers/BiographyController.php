<?php

namespace App\Http\Controllers;

use App\Models\Biography;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class BiographyController extends Controller
{
    public function index(): JsonResponse
    {
        $biographies = Biography::query()->latest()->get();

        // image_url ile birlikte döndür
        $biographies->each(function ($bio) {
            $bio->makeHidden('image');
        });
        return response()->json($biographies);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validatedData($request, false);
        $biography = Biography::create($data);
        $biography->refresh();
        // image_url ile birlikte döndür
        $biography->makeHidden('image');
        return response()->json($biography, Response::HTTP_CREATED);
    }

    public function show(Biography $biography): JsonResponse
    {
        $biography->refresh();
        // image_url ile birlikte döndür
        $biography->makeHidden('image');
        return response()->json($biography);
    }

    public function update(Request $request, Biography $biography): JsonResponse
    {
        $data = $this->validatedData($request, true);
        $biography->update($data);

        // image_url ile birlikte döndür
        $biography->makeHidden('image');
        return response()->json($biography);
    }

    public function destroy(Biography $biography): JsonResponse
    {
        $biography->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    private function validatedData(Request $request, bool $partial): array
    {
        $required = $partial ? 'sometimes' : 'required';

        return $request->validate([
            'content' => [$required, 'string'],
            'experience' => [$required, 'array'],
            'experience.*.title' => ['nullable', 'string'],
            'image' => [$required, 'string', 'max:255'],
        ]);
    }
}
