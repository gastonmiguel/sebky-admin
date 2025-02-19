<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id', 'name', 'description', 'price', 'stock', 'user_id', 'updated_by',
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function images() {
        return $this->hasMany(ProductImage::class);
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function editor() {
        return $this->belongsTo(User::class, 'updated_by');
    }
}

