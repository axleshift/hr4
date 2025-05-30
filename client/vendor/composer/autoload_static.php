<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit41e130bc51e0a1748b128ba1bc1ed8c1
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PhpOffice\\PhpWord\\' => 18,
            'PhpOffice\\Math\\' => 15,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PhpOffice\\PhpWord\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpoffice/phpword/src/PhpWord',
        ),
        'PhpOffice\\Math\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpoffice/math/src/Math',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit41e130bc51e0a1748b128ba1bc1ed8c1::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit41e130bc51e0a1748b128ba1bc1ed8c1::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit41e130bc51e0a1748b128ba1bc1ed8c1::$classMap;

        }, null, ClassLoader::class);
    }
}
