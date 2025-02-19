<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Services\ImageService;

class ProductController extends Controller
{
    public function index(Request $request) {
        $search = $request->query('search', '');
        $products = Product::with('category', 'images')
            ->where('name', 'like', "%$search%")
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'filters' => ['search' => $search],
        ]);
    }

    public function create() {
        return Inertia::render('Products/Edit', [
            'categories' => Category::all(),
            'images' => [],
        ]);
    }

    public function edit(Product $product) {
        return Inertia::render('Products/Edit', [
            'product' => $product->load('category', 'images'),
            'categories' => Category::all()
        ]);
    }

    public function destroy(Product $product) {
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->image_path);
            $image->delete();
        }

        $product->delete();

        return redirect()->route('products.index');
    }

    public function store(Request $request) {

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'images.*' => 'image|max:2048',
        ]);

        $product = Product::create([
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'user_id' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = ImageService::storeWebP($image);
                if ($path) {
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_path' => $path,
                    ]);

                }
            }
        }

        return redirect()->route('products.index');
    }

    public function update(Request $request, Product $product) {

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'images.*' => 'image|max:2048',
        ]);

        // Actualizar los datos del producto
        $product->update([
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'updated_by' => Auth::id(),
        ]);


        if ($request->hasFile('images')) {

            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image->image_path);
                $image->delete();
            }

            foreach ($request->file('images') as $image) {
                $path = ImageService::storeWebP($image);
                if ($path) {
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_path' => $path,
                    ]);
                }
            }
        }

        return redirect()->route('products.index');
    }

}

