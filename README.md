# pizzachesse-prod
DISEÑO, DESARROLLO E IMPLEMENTACIÓN DE UNA APLICACIÓN WEB  PARA LA ADMINISTRACIÓN Y GESTION DE PEDIDOS DE LAS DISTINTAS  SUCURSALES DE LA EMPRESA “PIZZERÍA CHEESE”



### informacion de creacion de proyecto comandos.
## backend 
composer create-project laravel/laravel appBackend
php artisan migrate

## ELIMINARA Y EJECUTARA LA MIGRACION NUEVAMENTE
php artisan migrate:fresh

## valida estatus de la migracion
php artisan migrate:status

## para configurar los discos para almacenar las imagenes 
php artisan storage:link

## creacion de modelos 
php artisan make:model users -mcr
php artisan make:model AuthControllerr -mcr

##instalacion paquete sanctum para autenticacion
composer require laravel/sanctum

##  instalar Fortify 
composer require laravel/fortify

## creacion de variables de entorno
npm install env-cmd
npm run local

## JWT autenticacion
composer require tymon/jwt-auth
php artisan vendor:publish
- escoger este servicio App\JWTAuth\Providers\LaravelServiceProvider::class,
- despues escoger la opcion 
- Provider: Tymon/JWTAuth/Providers/LaravelServiceProvider
- php artisan jwt.secret
hnc
php artisan jwt:secret

## INSTALACION DE TWILIO PARA ENVIAR MENSAJES DE WHATZAP
composer require twilio/sdk
php artisan make:controller WhatsAppController

##******instalacion de libreria para enviar correos***##
php artisan make:mail sendPost
composer require laravel/pint --dev

##******Crea una carpeta "mail" y un archivo "view.blade.php" ***##
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>MundosPIN.com</title>
</head>

<body>
    <h1>{{ $details['title'] }}</h1>
    <p>{{ $details['body'] }}</p>
    <p>Fue registrado exitosamente</p>
</body>

</html>


