<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SettingController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Setting::all());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validatedData($request, false);
        $setting = Setting::create($data);

        return response()->json($setting, Response::HTTP_CREATED);
    }

    public function show(Setting $setting): JsonResponse
    {
        return response()->json($setting);
    }

    public function update(Request $request, Setting $setting): JsonResponse
    {
        $data = $this->validatedData($request, true);
        $setting->update($data);

        return response()->json($setting);
    }

    public function destroy(Setting $setting): JsonResponse
    {
        $setting->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    private function validatedData(Request $request, bool $partial): array
    {
        $rule = $partial ? 'sometimes' : 'nullable';

        return $request->validate([
            'email' => [$rule, 'nullable', 'email', 'max:255'],
            'phone' => [$rule, 'nullable', 'string', 'max:50'],
            'address' => [$rule, 'nullable', 'string', 'max:255'],
            'instagram' => [$rule, 'nullable', 'string', 'max:255'],
            'twitter' => [$rule, 'nullable', 'string', 'max:255'],
            'facebook' => [$rule, 'nullable', 'string', 'max:255'],
            'linkedin' => [$rule, 'nullable', 'string', 'max:255'],
            'youtube' => [$rule, 'nullable', 'string', 'max:255'],
            'tiktok' => [$rule, 'nullable', 'string', 'max:255'],
            'github' => [$rule, 'nullable', 'string', 'max:255'],
        ]);
    }
}
