<?php

namespace App\Http\Controllers;

use App\Models\Hero;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HeroController extends Controller
{
    public function index(): JsonResponse
    {
        $heroes = Hero::query()->latest()->get();

        return response()->json($heroes);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validatedData($request, false);
        $hero = Hero::create($data);

        return response()->json($hero, Response::HTTP_CREATED);
    }

    public function show(Hero $hero): JsonResponse
    {
        return response()->json($hero);
    }

    public function update(Request $request, Hero $hero): JsonResponse
    {
        $data = $this->validatedData($request, true);
        $hero->update($data);

        return response()->json($hero);
    }

    public function destroy(Hero $hero): JsonResponse
    {
        $hero->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    private function validatedData(Request $request, bool $partial): array
    {
        $rule = $partial ? 'sometimes' : 'required';

        return $request->validate([
            'image' => [$rule, 'string', 'max:255'],
        ]);
    }
}
