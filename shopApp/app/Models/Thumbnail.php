<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Thumbnail extends Model
{
    use HasFactory;
    
    protected $table = 'thumbnail';

    public $timestamps = false;
    
    protected $fillable = ['idproduct', 'img'];
    
    
    public function product () {
        return $this->belongsTo('App\Models\Product', 'idproduct');
    }
}
