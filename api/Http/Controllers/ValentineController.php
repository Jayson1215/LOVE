<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ValentineController extends Controller
{
    /**
     * Handle proposal response
     */
    public function respond(Request $request)
    {
        $validated = $request->validate([
            'answer' => 'required|in:yes,no',
            'name' => 'nullable|string|max:255',
        ]);

        // Store response in database
        \DB::table('proposals')->insert([
            'answer' => $validated['answer'],
            'name' => $validated['name'] ?? null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Response recorded!',
            'data' => $validated,
        ]);
    }

    /**
     * Get all proposal responses
     */
    public function getResponses()
    {
        $responses = \DB::table('proposals')->get();

        return response()->json([
            'success' => true,
            'data' => $responses,
        ]);
    }
}
