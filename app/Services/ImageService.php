<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;

class ImageService
{
    /**
     * Guarda una imagen en formato WebP en el disco público.
     *
     * @param UploadedFile $image
     * @param string $folder
     * @return string La ruta de la imagen guardada
     */
    public static function storeWebP(UploadedFile $image, string $folder = 'products'): string
    {
        // Generar un nombre aleatorio para la imagen
        $filename = Str::random(20) . '.webp';
        $path = "$folder/$filename";


        $manager = new ImageManager(new Driver());
        $img = $manager->read($image);
        $encoded = $img->toWebp(60);

        Storage::disk('public')->put($path, $encoded);

        return $path;
    }
}
