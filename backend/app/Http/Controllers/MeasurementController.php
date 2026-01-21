<?php

namespace App\Http\Controllers;

use App\Models\Measurement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MeasurementController extends Controller
{
    public function index(): JsonResponse
    {
        $measurements = Measurement::query()->latest()->get();

        return response()->json($measurements);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validatedData($request, false);
        $measurement = Measurement::create($data);

        return response()->json($measurement, Response::HTTP_CREATED);
    }

    public function show(Measurement $measurement): JsonResponse
    {
        return response()->json($measurement);
    }

    public function update(Request $request, Measurement $measurement): JsonResponse
    {
        $data = $this->validatedData($request, true);
        $measurement->update($data);

        return response()->json($measurement);
    }

    public function destroy(Measurement $measurement): JsonResponse
    {
        $measurement->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    private function validatedData(Request $request, bool $partial): array
    {
        $required = $partial ? 'sometimes' : 'required';
        $rules = [
            'height_cm' => [$required, 'integer', 'min:0'],
            'weight_kg' => [$partial ? 'sometimes' : 'nullable', 'nullable', 'integer', 'min:0'],
            'chest_in' => [$required, 'integer', 'min:0'],
            'waist_in' => [$required, 'integer', 'min:0'],
            'hips_in' => [$partial ? 'sometimes' : 'nullable', 'nullable', 'integer', 'min:0'],
            'shoe_size' => [$required, 'numeric', 'min:0'],
            'shoe_region' => [$required, 'string', 'max:10'],
            'suit_size' => [$partial ? 'sometimes' : 'nullable', 'nullable', 'string', 'max:50'],
            'jacket_size' => [$partial ? 'sometimes' : 'nullable', 'nullable', 'string', 'max:50'],
            'eye_color' => [$required, 'string', 'max:50'],
            'hair_color' => [$required, 'string', 'max:50'],
            'hair_length' => [$required, 'string', 'max:50'],
            'skin_tone' => [$required, 'string', 'max:50'],
            'body_type' => [$partial ? 'sometimes' : 'nullable', 'nullable', 'string', 'max:50'],
            'tattoos' => [$required, 'string', 'max:100'],
            'piercings' => [$required, 'string', 'max:100'],
        ];

        return $request->validate($rules);
    }
}
