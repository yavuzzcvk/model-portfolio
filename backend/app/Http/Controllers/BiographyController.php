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

        return response()->json($biographies);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validatedData($request, false);
        $biography = Biography::create($data);

        return response()->json($biography, Response::HTTP_CREATED);
    }

    public function show(Biography $biography): JsonResponse
    {
        return response()->json($biography);
    }

    public function update(Request $request, Biography $biography): JsonResponse
    {
        $data = $this->validatedData($request, true);
        $biography->update($data);

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
