<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class tiposproducto extends Model
{
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tiposproductos';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'descripcion',
        'ruta_imagen',
    ];

    /**
     * Obtiene el barrio de la persona
     */
    public function destino()
    {
        return $this->belongsTo(destino::class, 'destino_id', 'id');
    }

    /**
     * Obtiene el barrio de la persona
     */
    public function hotel()
    {
        return $this->belongsTo(hotel::class, 'hotel_id', 'id');
    }
}
