<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    protected $table = 'product';

    public $timestamps = false;
    
    protected $fillable = ['name', 'idcategory', 'price', 'description', 'specifications', 'cover'];
    
    public function category () {
        return $this->belongsTo('App\Models\Category', 'idcategory');
    }
    
    public function thumbnails () {
        return $this->hasMany('App\Models\Thumbnail', 'idproduct');
    }
}
