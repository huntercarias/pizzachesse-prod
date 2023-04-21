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

## creacion de variables de entorno
npm install env-cmd
npm run local