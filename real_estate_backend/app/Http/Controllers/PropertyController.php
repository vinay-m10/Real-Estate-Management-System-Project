<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\Property;
use Illuminate\Support\Facades\Storage;

class PropertyController extends Controller
{
    public function index()
    {
        return Property::all();
    }

    public function show($id)
    {
        return Property::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'price' => 'required|integer|min:0',
            // 'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Store image
        // $imagePath = $request->file('image')->store('properties', 'public');
        
        $property = Property::create([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'location' => $validatedData['location'],
            'price' => $validatedData['price'],
            // 'image' => Storage::url($imagePath)  // Store full public URL
        ]);

        return response()->json($property, 201);
    }
}